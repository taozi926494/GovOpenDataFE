<template>
  <div class="listPageContainer">
    <div class="left">
      <div class="left_content">
        <div class="subjectFilterTop">
          <div v-show="filterTab.department">来源部门</div>
          <div v-show="filterTab.subject">数据主题</div>
          <div v-show="filterTab.government">行政区域</div>
        </div>

        <div class="sourceItem" v-show="filterTab.department">
          <div
            v-for="(dep, depIndex) in departments"
            :key="depIndex"
            @click="departChange(dep)"
          >{{ dep }}</div>
        </div>

        <div class="sourceItem" v-show="filterTab.subject">
          <div
            v-for="(sub, subIndex) in subjects"
            :key="subIndex"
            @click="subjectChange(sub)"
          >{{ sub }}</div>
        </div>

        <div class="sourceItem" v-show="filterTab.government">
          <el-tree
            :data="provinceTree"
            :props="{children: 'children', label: 'label'}"
            @node-click="govChange"
          ></el-tree>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="filter-condition">
        <el-tag closable v-show="filterCondition.keyword != null">关键字： {{ filterCondition.keyword }}</el-tag>
        <el-tag closable v-show="filterCondition.government.gov_id != null">区域： {{ filterCondition.keyword }}</el-tag>
        <el-tag closable v-show="filterCondition.keyword != null">部门： {{ filterCondition.keyword }}</el-tag>
        <el-tag closable v-show="filterCondition.subject != null">主题： {{ filterCondition.keyword }}</el-tag>
      </div>

      <div class="loading" v-show="loadStatus === 'loading'">
        <i class="el-icon-loading"></i>
        <br />拼命加载中...
      </div>

      <div class="no_result" v-show="loadStatus === 'noResult'">
        <img src="../assets/no_result.png" />
        <span>对不起，没有找到相关的数据...</span>
        <div class="search">
          <el-input placeholder="请输入关键字，多个关键字用空格隔开" v-model="searchKeyword" class="input_select">
            <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
        <div></div>
      </div>

      <div class="result" v-show="loadStatus === 'hasResult'">
        <div class="tips">
          共
          <span>{{ pagination.total }}</span>
          个数据集
          
        </div>

        <div>
          <div v-for="(dataset, index) in datasetArr" :key="index" class="data-item">
            <div class="data-item-title" @click="jumpToDetailPage(dataset)">{{ dataset.name }}</div>
            <div class="extractInfo">
              来源：
              <span>{{ dataset.department }}</span>
              更新时间：
              <span>{{ dataset.update_date }}</span>
              主题分类：
              <span>信息产业</span>
            </div>
            <div class="abstract">
              资源摘要：
              <span>{{ dataset.abstract }}</span>
            </div>
            <div class="tools">
              <div>
                <i class="el-icon-download" />
                {{ dataset.download_num }}
              </div>
              <div>
                <i class="el-icon-view" />
                {{ dataset.view_num }}
              </div>
            </div>
          </div>
        </div>

        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="pagination.currentPage"
            :page-size.sync="pagination.pageSize"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.listPageContainer {
  background-color: aliceblue;
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  .left {
    display: flex;
    flex-direction: column;
    justify-items: flex-start;

    .left_content {
      display: flex;
      flex-direction: column;
      justify-items: flex-start;
      width: 300px;
      height: 500px;
      margin: 25px 10px 25px 50px;
      background-color: white;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      border: 1px solid rgba(223, 223, 223, 0.31);
      .subjectFilterTop {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        font-size: 16px;
        background-color: #357ed2;
        font-size: 14px;
        color: white;
        font-family: "微软雅黑";
        margin-bottom: 20px;
        div {
          padding: 8px;
          width: 50%;
          cursor: pointer;
        }
        .selectTag {
          background-color: rgb(7, 102, 211);
          font-size: 16px;
        }
      }
      .sourceItem {
        overflow: auto;
        text-align: left;
        font-size: 14px;
        margin-left: 8px;
        margin-bottom: 10px;
        color: #5d7a9e;
        cursor: pointer;
        div {
          margin-bottom: 10px;
        }
        div:hover {
          color: black;
        }
      }
    }
    .left_content:nth-child(2) {
      margin: 0px 50px 20px 50px;
      .subjectFilterTop {
        text-align: left;
        div {
          padding-left: 10px;
          width: 100%;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-items: flex-start;
    text-align: left;
    width: 100%;
    margin: 25px 50px 25px 30px;

    // border: 1px solid rgba(223, 223, 223, 0.31);

    .loading {
      width: 200px;
      height: 50px;
      font-size: 14px;
      text-align: center;
      margin: 30% auto;
    }

    .no_result {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80%;

      img {
        height: 140px;
        margin-top: 40px;
      }
    }

    .result {
      width: 100%;
      background-color: white;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      .tips {
        height: 53px;
        line-height: 53px;
        font-size: 16px;
        color: #45668f;
        background: #fff;
        border-bottom: 1px solid #e4ebf0;
        padding: 0px 0px 0px 30px;
        span {
          font-size: 22px;
          color: #ff7468;
          font-weight: bold;
          padding: 0 10px;
        }
      }
      .data-item {
        margin-bottom: 10px;
        padding: 0px 0px 15px 30px;
        border-bottom: 1px solid #e4ebf0;
        &-title {
          color: #45668f;
          cursor: pointer;
          text-align: left;
          font-weight: 700;
          margin: 10px 0;
        }
        .extractInfo {
          font-size: 14px;
          color: #aab8ca;
          line-height: 15px;
          overflow: hidden;
          margin-bottom: 10px;
          span {
            color: #5d7a9e;
            padding-right: 50px;
          }
        }
        .abstract {
          font-size: 14px;
          color: #aab8ca;
          line-height: 15px;
          overflow: hidden;
          margin-bottom: 10px;
          span {
            color: #5d7a9e;
            padding-right: 50px;
          }
        }
        .tools {
          color: #555;
          font-size: 14px;
          background-color: transparent;
          display: inline-flex;
          div {
            padding-right: 20px;
          }
        }
      }
    }
    .pagination {
      margin: 25px 50px 25px 25px;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
    background-color: rgb(158, 176, 205);
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.1);
    background-color: rgb(213, 217, 222);
  }
}
</style>

<script>
import { getDatasetListApi, getDepartmentsApi } from "../api/ListPageApi.js";
import { getIndexApi } from "../api/IndexPageApi";
export default {
  data() {
    return {
      loading: true,
      filterTab: {
        department: false,
        subject: true,
        government: false
      },
      filterCondition: {
        government: { gov_id: null, region: null },
        subject: null,
        department: null,
        keyword: null
      },
      searchKeyword: "",
      activeName: "first",
      loadStatus: "loading",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      datasetArr: [],
      departments: [],
      provinceTree: [],
      subjects: [
        "综合政务",
        "经济管理",
        "国土资源、能源",
        "工业、交通、邮政",
        "信息产业",
        "城乡建设、环境保护",
        "农业、水利",
        "财政",
        "商业、贸易",
        "旅游、服务业",
        "气象、水文、测绘、地震",
        "对外事务",
        "政法、监察",
        "科技、教育",
        "文化、卫生、体育",
        "军事、国防",
        "劳动、人事",
        "民政、社区",
        "文秘、行政",
        "综合党团"
      ],
      renderData: [],
      tagSourceActive: true,
      tagSubjectActive: false
    };
  },
  watch: {
    $route: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    refreshDataByRouterParams() {
      this.mounted();
    },
    async init() {
      this.loadStatus = "loading";
      if (!this.$route.query.hasOwnProperty("gov_id")) {
        this.filterTab.government = true;
        this.filterTab.department = false;
        const data = await getIndexApi();
        const provinceTree = [];
        for (const province in data.province_dict) {
          const tree = {
            label: province
          };
          const citys = data.province_dict[province];
          if (citys.length > 0) {
            tree.children = [];
            for (const city of citys) {
              tree.children.push({
                label: city.region,
                gov_id: city.id
              });
            }
          }
          provinceTree.push(tree);
        }
        this.provinceTree = provinceTree;
      } else {
        // 请求所有委办局
        this.filterTab.government = false;
        this.filterTab.department = true;
        this.departments = await getDepartmentsApi(this.$route.query.gov_id);
      }
      await this.getDatasetList();
    },

    jumpToDetailPage(dataset) {
      this.$router.push({
        path: `/datasetInfo`,
        query: {
          id: dataset.id
        }
      });
    },
    departChange(item) {
      this.loadStatus = "loading";
      this.$route.query.department = item;
      this.getDatasetList();
    },
    subjectChange(item) {
      this.$route.query.subject = item;
      this.getDatasetList();
    },
    govChange(item) {
      if (item.gov_id != undefined) {
        this.$route.query.gov_id = item.gov_id;
        this.getDatasetList();
      }
    },
    clickRegionTag(id) {
      var params = {
        page: 1,
        num: this.pagination.pageSize
      };
      for (var key in this.$route.query) {
        params[key] = this.$route.query[key];
      }
      params["gov_id"] = id;
      this.$router.push({
        path: `${this.$route.path}`,
        query: params
      });
    },

    // 数据查询翻页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getDatasetList();
    },
    async getDatasetList() {
      try {
        // 构造查询字典
        let params = {
          page: this.pagination.currentPage,
          num: this.pagination.pageSize
        };
        for (var key in this.$route.query) {
          params[key] = this.$route.query[key];
        }

        const res = await getDatasetListApi(params);
        this.datasetArr = res.data;
        this.pagination.total = res.total;
        res.total > 0
          ? (this.loadStatus = "hasResult")
          : (this.loadStatus = "noResult");
      } catch (e) {
        this.$message.error(e);
        this.loadStatus = "noResult";
      }
    },
    search() {
      this.$store.commit("sethistory", this.searchKeyword);
      this.$router.push({
        path: `/datasetList`,
        query: {
          keyword: this.searchKeyword
        }
      });
    }
  }
};
</script>