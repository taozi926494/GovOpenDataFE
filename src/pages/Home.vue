<template>
  <div class="container">
    <div class="carousel">
      <el-carousel trigger="click" height="350px">
        <el-carousel-item v-for="item in 2" :key="item">
          <img v-bind:src="require(`../assets/index/carousel_img${item}.jpg`)" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 数据摘要 begin -->
    <div class="abstract">
      <div class="abstract-section">
        <div class="abstract-item">
          <img src="../assets/index/icon_dataset.png" />
          <div class="info">
            <div class="title">开放数据集</div>
            <div>
              <span class="number">{{ statis.dataSetNum }}</span>个
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_datasource.png" />
          <div class="info">
            <div class="title">开放数据资源</div>
            <div>
              <span class="number">{{ statis.dataFileNum }}</span>条
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_region.png" />
          <div class="info">
            <div class="title">接入行政区域</div>
            <div>
              <span class="number">{{ statis.govNum }}</span>个
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_resource_scale.png" />
          <div class="info">
            <div class="title">资源规模</div>
            <div>
              <span class="number">{{ statis.fileSize }}</span> GB
            </div>
          </div>
        </div>
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
    <!-- 数据分类图标 -->
    <div class="regionTitle">
      <img src="../assets/index/bg_subject.png" />
    </div>
    <!-- 行政区域模块 -->
    <div class="index-section">
      <div class="index-section-title">行政区域</div>
      <div class="index-section-content">
        <div class="index-section-item" v-for="(govList, province) in provinceDict" :key="province">
          <img
            v-bind:src="require(`../assets/index/icons_region/${province}.png`)"
          />
          {{ province }}
        </div>
      </div>
    </div>

    <!-- 主题模块 -->
    <div class="index-section">
      <div class="index-section-title">主题分类</div>
      <div class="index-section-content">
        <div class="index-section-item" v-for=" (item, index) in  subject" :key="index">
          <img
            v-bind:src="require(`../assets/index/icons_subject/${item.image_name}`)"
            class="subject-icon"
          />
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.search {
    width: 60%;
    height: 50px;
    margin-top: 50px;
    .el-input__inner {
      height: 50px;
    }
    .el-input-group__append,
    .el-input-group__prepend {
      background-color: #4698ff;
      color: white;
    }
  }

.index-section {
  width: 1300px;
  margin-bottom: 30px;
  &-title {
    width: 100%;
    text-align: left;
    border-left: 8px solid #4698ff;
    padding-left: 15px;
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 20px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-flow: wrap;
    width: 100%;
  }
  &-item {
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    margin: 30px;
    cursor: pointer;
    img {
      height: 70px;
      margin: 0 auto;
      margin-bottom: 15px;
    }
    .subject-icon {
      height: 40px;
    }
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: auto;
  .carousel {
    width: 100%;
  }
  
  .history {
    width: 60%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 25px;
    text-align: left;
    font-size: 14px;
    color: #888;
  }
  .abstract {
    width: 80%;
    position: relative;
    height: 65px;

    .abstract-section {
      top: -10px;
      z-index: 100;
      display: flex;
      width: 100%;
      align-items: center; /* 垂直居中 */
      justify-content: space-between; /* 水平居中 */
      position: absolute;
    }
  }
  .abstract-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 200px;
    height: 80px;
    background-color: #fff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;

    img {
      margin-right: 20px;
      height: 40%;
    }
    .info {
      font-size: 12px;
      color: #606266;
      text-align: left;
      font-family: "Microsoft YaHei" !important;
      .title {
        letter-spacing: 1px;
        margin-bottom: 8px;
      }
      .number {
        color: #217eff;
        font-size: 20px;
        margin-right: 2px;
      }
    }
  }
  .region {
    .content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-flow: wrap;
      width: 100%;
      .rows {
        width: 100%;
        margin-bottom: 40px;
        .row_visible {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-items: center;
          justify-content: center;
          margin-left: 40px;
          margin-top: 30px;
          .row_visible_center {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            justify-items: center;
            .rowitem {
              display: flex;
              flex-direction: column;
              justify-content: center;
              justify-items: center;
              margin-right: 5%;
              cursor: pointer;
              .imgicon {
                width: 100px;
              }
            }
          }
        }
        .row_hidden {
          width: 100%;
          background-color: white;
          display: flex;
          flex-direction: row;
          flex-flow: wrap;
          justify-content: flex-start;
          margin-top: 15px;
          animation: mymove 1s infinite;
          -webkit-animation: mymove 1.5s infinite;
          .row_hidden_item {
            float: left;
            margin-right: 50px;
            margin-bottom: 20px;
          }
        }
        @keyframes mymove {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @-webkit-keyframes mymove {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }
    }
  }
  .subject {
    display: flex;
    width: 85%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-flow: wrap;
      width: 100%;
      .subjectItem {
        width: 5%;
        margin: 30px 3% 40px 3%;
        cursor: pointer;
        .imgicon {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>

<script>
import { getIndexApi } from "../api/IndexPageApi.js";
export default {
  name: "home",
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
      regionListTemp: [
        [
          {
            id: 1,
            name: "广东省",
            children: [
              {
                id: 1,
                name: "广东省"
              },
              {
                id: 2,
                name: "广州市"
              }
            ]
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          }
        ],
        [
          {
            id: 1,
            name: "广东省",
            children: [
              {
                id: 1,
                name: "广东省"
              },
              {
                id: 2,
                name: "广州市"
              }
            ]
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          },
          {
            id: 3,
            name: "贵州省",
            children: []
          }
        ]
      ],
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
      this.statis.fileSize = (data.file_size / 1024).toFixed(2);

      this.provinceDict = data.province_dict;
    },
    // 点击检索按钮后的逻辑函数
    search() {
      this.$store.commit("sethistory", this.searchKeyword);
      this.$router.push({
        path: `/datasetList`,
        query: {
          keyword: this.searchKeyword
        }
      });
    },
    // 通过点击行政区域进入列表页
    clickRegion(region, rowIndex) {
      if (region.children.length > 0) {
        // 赋值所需显示行参数
        this.regionRowVis = rowIndex;
        // 如果省区域下有子集区域, 则展开显示子集区域
        this.subRegionChildren = region.children;
      } else {
        // 否则直接进入列表页区域
        this.$router.push({
          path: "/datasetList",
          query: {
            gov_id: region.id
          }
        });
      }
    },
    clickSubject(subject) {
      // 否则直接进入列表页区域
      this.$router.push({
        path: "/datasetList",
        query: {
          subject: subject.name
        }
      });
    }
  }
};
</script>
