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
              <span class="number">{{ dataSetNum }}</span>个
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_datasource.png" />
          <div class="info">
            <div class="title">开放数据资源</div>
            <div>
              <span class="number">{{ dataFileNum }}</span>条
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_region.png" />
          <div class="info">
            <div class="title">接入行政区域</div>
            <div>
              <span class="number">{{ regionNum }}</span>个
            </div>
          </div>
        </div>
        <div class="abstract-item">
          <img src="../assets/index/icon_resource_scale.png" />
          <div class="info">
            <div class="title">资源规模</div>
            <div>
              <span class="number">{{ file_size }}</span> GB
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 数据摘要 end -->

    <div class="search">
      <el-input placeholder="请输入关键字" v-model="searchKeyword" class="input_select">
        <el-button slot="append" icon="el-icon-search" @click="datasetSearch">搜索</el-button>
      </el-input>
    </div>
    <div class="history">历史记录: {{ searchHistory }}</div>

    <div class="region">
      <div class="regionTitle">
        <img src="../assets/index/bg_subject.png" />
      </div>
      <div class="regionList">
        <el-tabs v-model="editableTabsValue" type="card">
          <el-tab-pane label="行政区域" name="1">
            <div style="width: 100%">
              <img src="../assets/index/region_quyu.png" style="width:100%; height:auto;" />
            </div>
            <div class="regionItems">
              <div
                class="regionItem"
                v-for=" (item, index) in  regionList"
                :key="index"
                @click="jumpToListPage(item)"
              >
                <div class="imgicon">
                  <img v-bind:src="require(`../assets/index/regionicons/${item[0]}.png`)" />
                </div>
                <div class="name">{{ item[0] }}</div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="主题" name="2">
            <div style="width: 100%">
              <img src="../assets/index/region_zhuti.png" style="width:100%; height:auto;" />
            </div>
            <div class="regionItems">
              <div
                class="regionItem"
                v-for="item in  subjectList"
                :key="item"
                @click="jumpToListPage(item)"
              >
                <div class="imgicon">
                  <img v-bind:src="require(`../assets/index/icons_subject/${item}.png`)" />
                </div>
                <span class="name">{{ item }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: auto;
  .carousel {
    width: 100%;
  }
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
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
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
    display: flex;
    flex-direction: column;
    justify-items: center;
    width: 70%;
    margin-top: 10px;
    .el-tabs__header {
      border: none;
    }
    .el-tabs__item {
      font-size: 16px;
      margin-top: 10px;
      width: 80%;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: white;
      background-color: #409eff;
    }
    .el-tabs__content {
      display: flex;
      flex-direction: column;
      .explain {
        margin-bottom: 30px;
      }
      .regionItems {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 50px;
        background-color: white;
        .regionItem {
          width: 20%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 50px 0;
          cursor: pointer;
          .imgicon {
            width: 40px;
            height: 40px;
            margin-left: 40%;
            margin-bottom: 12px;
            img {
              width: 100%;
              height: auto;
            }
          }
        }
        .regionItem:hover {
          .name {
            color: #217eff;
          }
        }
      }
    }
  }
}
</style>

<script>
import { getDataApi } from "../api/IndexPageApi.js";
export default {
  name: "IndexPage",
  data() {
    return {
      searchHistory: "",
      searchKeyword: "",
      dataSetNum: 0,
      dataFileNum: 0,
      regionNum: 0,
      file_size: 0,
      regionList: [],
      editableTabsValue: "1",
      subjectList: [
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
      zhuti: [
        {
          name: "综合政务",
          image_name: "综合政务.png"
        },
        {
          name: "经济管理",
          image_name: "经济管理.png"
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
          name: "信息产业",
          image_name: "信息产业.png"
        },
        {
          name: "城乡建设、环境保护",
          image_name: "城乡建设、环境保护.png"
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
          name: "旅游、服务业",
          image_name: "旅游、服务业.png"
        },
        {
          name: "气象、水文、测绘、地震",
          image_name: "气象、水文、测绘、地震.png"
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
        }
      ]
    };
  },
  created() {
    // 通过session设置用户的检索历史信息
    this.searchHistory = this.$store.getters.gethistory.join("  ");
    // 获取首页的渲染数据
    this.getData();
  },
  methods: {
    // 路由的制定跳转
    jumpToListPage(government) {
      this.$router.push({
        path: `/dataList/${government[0]}`,
        query: {
          id: government[2],
          path: government[1]
        }
      });
    },
    async getData() {
      try {
        const res = await getDataApi();
        this.dataSetNum = res.data.dataset_num;
        this.dataFileNum = res.data.file_num;
        this.regionNum = res.data.governmentList.length;
        this.regionList = res.data.governmentList;
        this.file_size = (res.data.file_size / 1024).toFixed(2);
      } catch (e) {
        this.$message.error(e);
      }
    },
    datasetSearch() {
      this.$store.commit("sethistory", this.searchKeyword);
      this.$router.push({
        path: `/dataList/${this.searchKeyword}`,
        query: {
          searchKeyword: this.searchKeyword
        }
      });
    }
  }
};
</script>
