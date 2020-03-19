<template>
  <div class="container">
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
      <el-input placeholder="请输入关键字，多个关键字用空格隔开" v-model="searchKeyword" class="input_select">
        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
      </el-input>
    </div>
    <div class="history">历史记录: {{ searchHistory }}</div>

    <!-- 行政区域模块 -->
    <div class="index-section">
      <div class="regionTitle">
        <img src="@/assets/index/region_division.png" />
      </div>
      <div class="index-section-content">
        <div class="index-section-item" v-for="(govList, province) in provinceDict" :key="province">
          <ProvinceItem :province="province" :governments="govList" @gov-click="goListPage"  />
        </div>
      </div>
    </div>

    <!-- 主题模块 -->
    <div class="index-section">
      <div class="regionTitle">
        <img src="@/assets/index/subject_classification.png" />
      </div>
      <div class="index-section-content">
        <div
          class="index-section-item"
          v-for=" (item, index) in  subject"
          :key="index"
          @click="goListPage({subject: item.name})"
        >
          <img
            v-bind:src="require(`@/assets/index/icons_subject/${item.image_name}`)"
            class="subject-icon"
          />
          {{ item.name }}
        </div>
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

export default {
  name: "home",
  components: {
    StatisCard,
    ProvinceItem
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
      subject: [
        {
          name: "综合政务",
          image_name: "综合政务.png"
        },
        {
          name: "经济管理",
          image_name: "经济管理.png"
        },
        {
          name: "农业、水利",
          image_name: "农业、水利.png"
        },
        {
          name: "财政",
          image_name: "财政.png"
        },
        {
          name: "商业、贸易",
          image_name: "商业、贸易.png"
        },
        {
          name: "对外事务",
          image_name: "对外事务.png"
        },
        {
          name: "政法、监察",
          image_name: "政法、监察.png"
        },
        {
          name: "科技、教育",
          image_name: "科技、教育.png"
        },
        {
          name: "文化、卫生、体育",
          image_name: "文化、卫生、体育.png"
        },
        {
          name: "军事、国防",
          image_name: "军事、国防.png"
        },
        {
          name: "劳动、人事",
          image_name: "劳动、人事.png"
        },
        {
          name: "民政、社区",
          image_name: "民政、社区.png"
        },
        {
          name: "文秘、行政",
          image_name: "文秘、行政.png"
        },
        {
          name: "综合党团",
          image_name: "综合党团.png"
        },
        {
          name: "信息产业",
          image_name: "信息产业.png"
        },
        {
          name: "国土资源、能源",
          image_name: "国土资源、能源.png"
        },
        {
          name: "工业、交通、邮政",
          image_name: "工业、交通、邮政.png"
        },
        {
          name: "城乡建设、环境保护",
          image_name: "城乡建设、环境保护.png"
        },
        {
          name: "旅游、服务业",
          image_name: "旅游、服务业.png"
        },
        {
          name: "气象、水文、测绘、地震",
          image_name: "气象、水文、测绘、地震.png"
        }
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
      this.statis.fileSize = Math.ceil(data.file_size * 100 / 1024) / 100;

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