<template>
  <div class="list-page">
    <div class="filter-section">
      <el-input
        placeholder="请输入关键字，多个关键字用空格隔开"
        @keyup.enter.native="params.keyword = searchKeyword; getDatasetList();"
        v-model="searchKeyword"
        class="input_select"
      >
        <el-button
          type="primary"
          slot="append"
          icon="el-icon-search"
          @click="params.keyword = searchKeyword; getDatasetList();"
        >搜索</el-button>
      </el-input>

      <div class="type-filter">
        <div class="type-filter-title-box">
          <div
            class="type-filter-title"
            v-show="filterTab.government.show"
            :class="{active: filterTab.government.active}"
            @click="showFilterTab('government')"
          >行政区域</div>
          <div
            class="type-filter-title"
            v-show="filterTab.department.show"
            :class="{active: filterTab.department.active}"
            @click="showFilterTab('department')"
          >来源部门</div>
          <div
            class="type-filter-title"
            v-show="filterTab.subject.show"
            :class="{active: filterTab.subject.active}"
            @click="showFilterTab('subject')"
          >数据主题</div>
        </div>

        <!-- 行政区域 -->
        <div class="type-filter-box" v-show="filterTab.government.active">
          <div
            class="word-filter"
            v-for="(gov, govIndex) in governments"
            :key="govIndex"
            @click="govChange(gov)"
            :class="{active: params.government.gov_id == gov.gov_id}"
          >
            {{ gov.region }}
            <span class="province-tip">{{ gov.province }}</span>
          </div>
        </div>

        <!-- 来源部门 -->
        <div class="type-filter-box" v-show="filterTab.department.active">
          <div
            class="word-filter"
            v-for="(dep, depIndex) in departments"
            :key="depIndex"
            @click="departChange(dep)"
            :class="{active: params.department == dep}"
          >{{ dep }}</div>
        </div>

        <!-- 数据主题 -->
        <div class="type-filter-box" v-show="filterTab.subject.active">
          <div
            class="word-filter"
            v-for="(sub, subIndex) in subjects"
            :key="subIndex"
            @click="subjectChange(sub)"
            :class="{active: params.subject == sub}"
          >{{ sub }}</div>
        </div>
      </div>
    </div>
    <div class="dataset-section">
      <div class="filter-tags" :class="{show: filterTagsShow}">
        <el-tag
          closable
          @close="closeFilterTag('keyword')"
          v-show="validVal(params.keyword)"
        >关键字： {{ params.keyword }}</el-tag>
        <el-tag
          closable
          @close="closeFilterTag('government')"
          v-show="validVal(params.government.gov_id)"
        >区域： {{ params.government.region }}</el-tag>
        <el-tag
          @close="closeFilterTag('department')"
          closable
          v-show="validVal(params.department)"
        >部门： {{ params.department }}</el-tag>
        <el-tag
          @close="closeFilterTag('subject')"
          closable
          v-show="validVal(params.subject)"
        >主题： {{ params.subject }}</el-tag>
      </div>

      <div class="loading" v-show="loadStatus === 'loading'">
        <i class="el-icon-loading"></i>
        <br />拼命加载中...
      </div>

      <div class="no_result" v-show="loadStatus === 'noResult'">
        <img src="@/assets/no_result.png" />
        <span>对不起，没有找到数据...</span>
      </div>

      <div class="result">
        <DatasetItem
          v-for="dataset in datasetArr"
          :key="dataset.id"
          :dataset="dataset"
          @click.native="goDetailPage(dataset.id)"
        />
      </div>

      <div class="pagination" v-show="loadStatus == 'hasResult'">
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
</template>

<style lang="scss">
@import "./datasetlist.scss";
</style>

<script>
import { getDatasetListApi, getDepartmentsApi } from "@/api/ListPageApi.js";
import { getIndexApi } from "@/api/IndexPageApi";
import { validVal } from "@/utils/toolkit";
import DatasetItem from "./components/DatasetItem";

export default {
  name: "DatasetList",
  components: {
    DatasetItem
  },
  data() {
    return {
      loading: true,
      filterTab: {
        department: {
          show: false,
          active: false
        },
        subject: {
          show: true,
          active: false
        },
        government: {
          show: false,
          active: false
        }
      },
      params: {
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
      governments: [],
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
    this.routeToParams();
    this.init();
  },
  computed: {
    filterTagsShow() {
      return (
        validVal(this.params.government.gov_id) ||
        validVal(this.params.region) ||
        validVal(this.params.subject) ||
        validVal(this.params.keyword)
      );
    }
  },
  methods: {
    async init() {
      this.loadStatus = "loading";

      // 无论如何先请求全部行政区域数据
      const data = await getIndexApi();
      for (const province in data.province_dict) {
        const citys = data.province_dict[province];
        for (const city of citys) {
          this.governments.push({
            province: province,
            region: city.region,
            gov_id: city.gov_id
          });
        }
      }
      if (!validVal(this.params.government.gov_id)) {
        // 如果没有带行政区划，请求所有行政区划
        this.filterTab.government.show = true;
        if (validVal(this.params.subject)) {
          this.filterTab.subject.active = true;
        } else {
          this.filterTab.government.active = true;
        }
      } else {
        // 请求所有委办局
        this.filterTab.government.show = false;
        this.filterTab.department.show = true;

        if (validVal(this.params.subject)) {
          this.filterTab.subject.active = true;
        } else {
          this.filterTab.department.active = true;
        }

        this.departments = await getDepartmentsApi(
          this.params.government.gov_id
        );
      }
      await this.getDatasetList();
    },
    goDetailPage(id) {
      this.$router.push({
        path: `/datasetInfo`,
        query: {
          id
        }
      });
    },
    showFilterTab(title) {
      for (const key in this.filterTab) {
        if (key == title) {
          this.filterTab[key].active = true;
        } else {
          this.filterTab[key].active = false;
        }
      }
    },
    departChange(item) {
      this.params.department = item;
      this.pagination.currentPage = 1;
      this.getDatasetList();
    },
    subjectChange(item) {
      this.params.subject = item;
      this.pagination.currentPage = 1;
      this.getDatasetList();
    },
    async govChange(item) {
      this.params.government.gov_id = item.gov_id;
      this.params.government.region = item.region;
      this.pagination.currentPage = 1;
      this.getDatasetList();

      // 显示部门
      this.filterTab.department.show = true;
      this.filterTab.department.active = true;
      this.filterTab.government.show = false;
      this.filterTab.government.active = false;
      this.departments = [];
      this.departments = await getDepartmentsApi(this.params.government.gov_id);
    },
    closeFilterTag(tag) {
      // 关闭区域tag
      if (tag == "government") {
        this.params.government.gov_id = null;
        this.params.government.region = null;

        this.filterTab.department.show = false;
        this.filterTab.department.active = false;
        this.params.department = null;

        this.filterTab.government.show = true;
        this.filterTab.government.active = this.filterTab.subject.active
          ? false
          : true;
      } else {
        this.params[tag] = null;
      }
      this.getDatasetList();
    },
    // 数据查询翻页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getDatasetList();
    },
    validVal(val) {
      return validVal(val);
    },
    paramsToPost() {
      const params = this.params;
      const dict = {};
      if (validVal(params.government.gov_id))
        dict.gov_id = params.government.gov_id;
      if (validVal(params.keyword)) dict.keyword = params.keyword;
      if (validVal(params.department)) dict.department = params.department;
      if (validVal(params.subject)) dict.subject = params.subject;
      return dict;
    },
    routeToParams() {
      const routeParams = this.$route.params;
      if (validVal(routeParams.government)) {
        this.params.government.region = routeParams.government.region;
        this.params.government.gov_id = routeParams.government.gov_id;
      }
      this.params.keyword = routeParams.keyword;
      this.params.subject = routeParams.subject;
    },
    async getDatasetList() {
      try {
        this.datasetArr = []
        this.loadStatus = "loading";
        let params = this.paramsToPost();
        params.page = this.pagination.currentPage;
        params.num = this.pagination.pageSize;

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
    }
  }
};
</script>