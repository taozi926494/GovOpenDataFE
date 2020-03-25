<template>
  <div class="dataset-info">
    <div class="title">
      <h3>{{ dataset.name }}</h3>
      <div class="abstract">{{ dataset.abstract }}</div>
    </div>
    <div class="dataset-info-section">
      <div class="title">资源信息</div>
      <div class="content">
        <MetaItem :data="dataset" />
      </div>
    </div>

    <!-- 字段信息  值为二维数组 -->
    <div class="dataset-info-section" v-if="hasContent(dataset.field_info)">
      <div class="title">字段信息</div>
      <div class="content">
        <FieldTable :data="dataset.field_info" />
      </div>
    </div>

    <!-- 文件下载 -->
    <div class="dataset-info-section">
      <div class="title">数据下载</div>
      <div class="content">
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
                  :href="`http://127.0.0.1:5000/files?dataset_id=${dataset.id}&filepath=${scope.row.file_path_rel}`"
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

<style lang="scss">
@import "./datasetInfo.scss";
</style>

<script>
import { getDatasetDetailApi } from "@/api/DetailPageApi.js";
import { stampToTime } from "@/utils/toolkit";
import FieldTable from "./components/FieldTable";
import MetaItem from "./components/MetaItem";

export default {
  name: "DatasetInfo",
  components: {
    FieldTable,
    MetaItem
  },
  data() {
    return {
      dataset: {
        id: null,
        name: null,
        extra_info: {},
        field_info: {},
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
      data.field_info = JSON.parse(data.field_info);
      const newFiles = [];
      for (const file of data.files) {
        if (
          ["baseinfo.json", "datafield.json", "extrainfo.json"].indexOf(
            file.name
          ) == -1
        ) {
          newFiles.push(file);
        }
      }
      data.files = newFiles;
      this.dataset = data;
      this.pagination.total = this.dataset.files.length;
      this.pageChange(1);
    },
    // 数据查询翻页
    pageChange(page) {
      const filtedFiles = this.dataset.files.slice(
        (page - 1) * this.pagination.pageSize,
        page * this.pagination.pageSize
      );
      this.filtedFiles.splice(0);
      for (const file of filtedFiles) {
        if (typeof file.create_time == "number") {
          file.create_time = stampToTime(file.create_time * 1000);
        }
        this.filtedFiles.push(file);
      }
    },
    sizeChange() {
      this.pageChange(1);
    }
  }
};
</script>