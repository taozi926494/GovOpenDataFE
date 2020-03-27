<template>
  <div class="home">
    <div class="carousel">
      <el-carousel trigger="click" height="350px">
        <el-carousel-item v-for="item in 2" :key="item">
          <img v-bind:src="require(`@/assets/index/carousel_img${item}.jpg`)" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 数据摘要 begin -->
    <div class="abstract">
      <div class="abstract-section">
        <StatisCard
          :iconSrc="require('@/assets/index/icon_dataset.png')"
          title="开放数据集"
          :value="statis.dataSetNum"
          unit="个"
        />
        <StatisCard
          :iconSrc="require('@/assets/index/icon_datasource.png')"
          title="开放数据文件"
          :value="statis.dataFileNum"
          unit="个"
        />
        <StatisCard
          :iconSrc="require('@/assets/index/icon_region.png')"
          title="接入行政区域"
          :value="statis.govNum"
          unit="个"
        />
        <StatisCard
          :iconSrc="require('@/assets/index/icon_resource_scale.png')"
          title="资源规模"
          :value="statis.fileSize"
          unit="GB"
        />
      </div>
    </div>
    <!-- 数据摘要 end -->

    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入关键字，多个关键字用空格隔开" @keyup.enter.native="search"  v-model="searchKeyword" class="input_select">
        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
      </el-input>
    </div>
    <div class="history">历史记录: {{ searchHistory }}</div>

    <!-- 行政区域模块 -->
    <div class="index-section">
      <div class="index-section-title">
        <img src="@/assets/index/region_division.png" />
      </div>
      <div class="index-section-content">
        <ProvinceItem
          class="index-section-item"
          v-for="(govList, province) in provinceDict"
          :key="province"
          :province="province"
          :governments="govList"
          @gov-click="goListPage"
        />
      </div>
    </div>

    <!-- 主题模块 -->
    <div class="index-section">
      <div class="index-section-title">
        <img src="@/assets/index/subject_classification.png" />
      </div>
      <div class="index-section-content">
        <SubjectItem
          class="index-section-item"
          v-for="subject in subjects"
          :key="subject"
          :subject="subject"
          @click.native="goListPage({ subject })"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./home.scss";
</style>

<script>
import { getIndexApi } from "@/api/IndexPageApi.js";
import StatisCard from "./components/StatisCard";
import ProvinceItem from "./components/ProvinceItem";
import SubjectItem from "./components/SubjectItem";

export default {
  name: "home",
  components: {
    StatisCard,
    ProvinceItem,
    SubjectItem
  },
  data() {
    return {
      regionRowVis: -1,
      searchHistory: "",
      searchKeyword: "",
      statis: {
        dataSetNum: 0,
        dataFileNum: 0,
        govNum: 0,
        fileSize: 0
      },
      provinceDict: {},
      regionList: [],
      regionListTemp: [],
      editableTabsValue: "1",
      subjects: [
        "综合政务",
        "经济管理",
        "农业、水利",
        "财政",
        "商业、贸易",
        "对外事务",
        "政法、监察",
        "科技、教育",
        "文化、卫生、体育",
        "军事、国防",
        "劳动、人事",
        "民政、社区",
        "文秘、行政",
        "综合党团",
        "信息产业",
        "国土资源、能源",
        "工业、交通、邮政",
        "城乡建设、环境保护",
        "旅游、服务业",
        "气象、水文、测绘、地震"
      ],
      subRegionChildren: []
    };
  },
  created() {
    // 通过session设置用户的检索历史信息
    this.searchHistory = this.$store.getters.gethistory.join("  ");
    // 获取首页的渲染数据
    this.getData();
  },
  methods: {
    // 获取首页的统计数据
    async getData() {
      const data = await getIndexApi();
      this.statis.dataSetNum = data.dataset_num;
      this.statis.dataFileNum = data.file_num;
      this.statis.govNum = data.gov_num;
      this.statis.fileSize = Math.ceil((data.file_size * 100) / 1024) / 100;

      this.provinceDict = data.province_dict;
    },
    // 点击检索按钮后的逻辑函数
    search() {
      this.$store.commit("sethistory", this.searchKeyword);
      this.goListPage({ keyword: this.searchKeyword });
    },
    goListPage(param) {
      this.$router.push({
        name: `datasetList`,
        params: {
          ...param
        }
      });
    }
  }
};
</script>