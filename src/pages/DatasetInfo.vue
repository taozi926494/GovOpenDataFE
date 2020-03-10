<template>
  <div class="dataset-info-container">
    <div class="title">
      <span>{{ dataset.name }}</span>
    </div>
    <div class="resource-info" v-if="hasContent(dataset.extra_info)">
      <div class="tip">
        <span>资源信息</span>
      </div>

      <!-- <div class="resource-table">
        <div class="resource-items-center">
          <div class="resource-items">
            <div
              class="resource-item"
              v-for="(val, k) in dataset.extra_info" :key="k"
            >
              <div class="lable">
                <span>{{ k }}</span>
              </div>
              <div class="value">
                <span>{{ val }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    </div>
    <div class="field-info" v-if="hasContent(dataset.field_info)">
      <!-- 数据信息模块为二维数组 -->
      <div class="tip">
        <span>数据信息</span>
      </div>
      <div class="field-table">
        <!-- 表头模块 -->
        <div class="field-table-th">
          <div v-for="(title, titleIndex) in field_info[0]" :key="titleIndex">{{ title }}</div>
        </div>
        <!-- 表身模块 -->
        <div class="field-table-td">
          <div v-for="(fieldRow, fieldRowIndex) in field_info.slice(1, -1)" :key="fieldRowIndex">
            <div v-for="(field, fieldIndex) in fieldRow" :key="fieldIndex">{{ field }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="file-download">
      <div class="tip">
        <span>数据下载</span>
      </div>
      <div class="file-table">
        <el-table :data="filtedFiles">
          <el-table-column label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="文件名" min-width="450"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" min-width="180"></el-table-column>
          <el-table-column prop="size" label="大小" min-width="100"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini">
                <a
                  target="_blank"
                  :href="`http://127.0.0.1:5000/files?dataset_id=${dataset.id}&filename=${scope.row.name}`"
                  class="download"
                >下载</a>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 文件下载分页 -->
      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="pagination.currentPage"
          :page-size.sync="pagination.pageSize"
          :page-sizes="[5, 10, 15, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="pageChange"
          @size-change="sizeChange"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
$width: 70%;
$div-background-color: white;
$content-font-size: 10px;
$block-margin: 15px;
$block-padding-bottom: 40px;
@mixin flex-center(
  $direction: row,
  $justify: center,
  $align: center,
  $flex-wrap: null
) {
  display: flex;
  @if ($flex-wrap != null) {
    flex-wrap: $flex-wrap;
  }
  @if ($direction!=null) {
    flex-direction: $direction;
  }
  @if ($justify!=null) {
    justify-content: $justify;
  }
  @if ($align!=null) {
    align-items: $align;
  }
}

@mixin block-tips() {
  @include flex-center(column, center, center, none);
  width: 10%;
  height: 35px;
  background-color: #2b72c3;
  margin-bottom: 15px;
  span {
    width: 100%;
    font-size: 14px;
    color: #2b72c3;
    font-weight: bold;
    color: white;
  }
}

@mixin table-label() {
  @include flex-center(column, center, center, wrap);
  width: 100px;
  background-color: #f5f9fd;
  border: 1px solid #a6caf3;
  white-space: nowrap;
  margin: 0 0 -1px -1px;
  height: 40px;
  span {
    width: 100%;
    font-size: $content-font-size;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-overflow: inherit;
      overflow: visible;
      white-space: pre-line;
    }
  }
}

@mixin table-value() {
  @include flex-center(row, center, center, wrap);
  width: 200px;
  height: 40px;
  border: 1px solid #a6caf3;
  margin: 0 0 -1px -1px;
  span {
    width: 100%;
    font-size: $content-font-size;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-overflow: inherit;
      overflow: visible;
      white-space: pre-line;
    }
  }
}

@mixin field-table-div() {
  width: 100px;
  height: 40px;
  border: 1px solid #a6caf3;
  white-space: nowrap;
  margin: 0 0 -1px -1px;
  padding: 5px 0px;
  font-size: $content-font-size;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    text-overflow: inherit;
    overflow: visible;
    white-space: pre-line;
  }
}

.dataset-info-container {
  @include flex-center(column, center, center, none);
  background-color: #eff3f7;
  .title {
    @include flex-center(column, center, center, none);
    background-color: $div-background-color;
    width: $width;
    margin-bottom: $block-margin;
    height: 80px;
    padding: 15px 0px;
    span {
      text-align: center;
      font-size: 18px;
      color: #2b72c3;
      font-weight: bold;
    }
  }

  .resource-info {
    @include flex-center(column, center, flex-start, wrap);
    background-color: $div-background-color;
    width: $width;
    margin-bottom: $block-margin;
    padding-bottom: $block-padding-bottom;
    .tip {
      @include block-tips;
    }
    .resource-table {
      @include flex-center(row, flex-start, center, wrap);
      margin-left: 5%;
      .resource-items-center {
        .resource-items {
          @include flex-center(row, flex-start, center, wrap);
          .resource-item {
            @include flex-center(row, flex-start, center, wrap);
            .lable {
              @include table-label;
            }
            .value {
              @include table-value;
            }
          }
        }
      }
    }
  }

  .field-info {
    background-color: $div-background-color;
    width: $width;
    @include flex-center(column, center, flex-start, none);
    margin-bottom: $block-margin;
    padding-bottom: $block-padding-bottom;
    .tip {
      @include block-tips;
    }
    .field-table {
      @include flex-center(column, flex-start, flex-start, wrap);
      margin-left: 5%;
      .field-table-th {
        @include flex-center(row, flex-start, flex-start, wrap);
        div {
          background-color: #f5f9fd;
          @include field-table-div;
        }
      }
      .field-table-td {
        @include flex-center(row, flex-start, flex-start, wrap);
        div {
          @include flex-center(row, center, center, wrap);
          div {
            @include field-table-div;
          }
        }
      }
    }
  }

  .file-download {
    background-color: $div-background-color;
    width: $width;
    margin-bottom: 30px;
    .tip {
      @include block-tips;
    }
    .file-table {
      @include flex-center(row, flex-start, flex-start, wrap);
      padding: 0px 20px 20px 50px;
      .el-table {
        font-size: 12px;
      }
    }
    .pagination {
      .el-pagination span {
        font-size: 12px;
      }
    }
  }
}
</style>

<script>
import { getDatasetDetailApi } from "../api/DetailPageApi.js";
import { stampToTime } from "../utils/toolkit";

export default {
  name: "DatasetInfo",
  data() {
    return {
      // title: "",
      // extra_info: {},
      // field_info: [],
      // attachmentInfoList: [],
      // pagination: {
      //   currentPage: 1,
      //   pageSize: 5,
      //   total: 0
      // },
      // minHeight: 0
      dataset: {
        id: null,
        name: null,
        extra_info: {},
        files: [],
      },
      filtedFiles: [],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    };
  },
  mounted() {
    this.getDatasetList();
  },
  methods: {
    hasContent(obj) {
      for (var n in obj) {
        return true;
      }
      return false;
    },
    indexMethod(index) {
      return index + 1;
    },
    async getDatasetList() {
      const data = await getDatasetDetailApi(this.$route.query.id);
      data.extra_info = JSON.parse(data.extra_info);
      this.dataset = data;
      this.pagination.total = this.dataset.files.length;
      this.pageChange(1);

      // this.title = data.name;
      // // 前端数组截取分页
      // this.attachmentInfoList = res.data.attachmentInfoList.slice(
      //   (this.pagination.currentPage - 1) * this.pagination.pageSize,
      //   this.pagination.currentPage * this.pagination.pageSize
      // );
      // this.extra_info = JSON.parse(res.data.info.extra_info);
      // if (res.data.info.field_info.length > 0) {
      //   this.field_info = eval("(" + res.data.info.field_info + ")");
      // }
      // this.pagination.total = res.data.attachmentInfoList.length;
    },
    // 数据查询翻页
    pageChange(page) {
      const filtedFiles = this.dataset.files.slice(
        (page - 1) * this.pagination.pageSize,
        page * this.pagination.pageSize
      );
      this.filtedFiles.splice(0)
      for (const file of filtedFiles) {
        if (typeof(file.create_time) == 'number') {
          file.create_time = stampToTime(file.create_time * 1000);
        }
        this.filtedFiles.push(file)
      }
    },
    sizeChange() {
      this.pageChange(1)
    }
  }
};
</script>