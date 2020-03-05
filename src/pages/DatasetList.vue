<template>
<div class="listPageContainer" >
    <div class="left" v-show="leftFilterVisibleFlag">
        <div class="left_content">
          <div class="subjectFilterTop">
            <div @click="selectTagSource" :class="[tagSourceActive?'selectTag':'']">来源部门</div>
            <div @click="selectTagSubject" :class="[tagSubjectActive?'selectTag':'']">数据主题</div>
          </div>
          <div class="sourceItem">
            <div v-for="(item, index) in renderData" :key="'source'+index" @click="clickSourceOrSubjectTag(item)">{{item}}</div>
          </div>
        </div>
    </div>
    <div class="right" :style="htmlHeight">
      <div class="result">
        <div class="tips">
          共 <span>{{ pagination.total }}</span> 个数据集
        </div>
        <div v-if="items.length > 0">
          <div v-for="(item, index) in items" :key="index" class="dataItem">
            <p class="title" @click="jumpToDetailPage(item)">{{ item.name }}</p>
            <div class="extractInfo">
              来源：<span>{{ item.department }}</span>
              更新时间：<span>{{ item.update_date }}</span>
              主题分类：<span> 信息产业</span>
            </div>
            <div class="abstract">
              资源摘要：
              <span>{{ item.abstract }}</span>
            </div>
            <div class="tools">
              <div>
                <i class="el-icon-download" />
                {{ item.download_num }}
              </div>
              <div>
                <i class="el-icon-view" />
                {{ item.view_num }}
              </div>         
            </div>
          </div>
        </div>
        <div class="no_result" v-else>
          <div><img style="width:300px; height:auto;" src="../assets/no_result.jpg"></div>
          
        </div>
       
      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="pagination.currentPage"
          :page-size.sync="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
 </div>
</div>
</template>

<style lang="scss">
.listPageContainer{
  background-color: aliceblue;
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  .left{
    display: flex;
    flex-direction:column;
    justify-items: flex-start;

    .left_content{
      display: flex;
      flex-direction:column;
      justify-items: flex-start;
      width: 300px;
      height: 500px;
      margin: 25px 10px 25px 50px;
      background-color: white;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      border: 1px solid rgba(223, 223, 223, 0.31);
      .subjectFilterTop{
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        font-size: 16px;
        background-color: #357ed2;
        font-size: 14px;
        color: white;
        font-family: "微软雅黑"; 
        margin-bottom: 20px;
        div{
          padding: 8px;
          width: 50%;
          cursor: pointer;
        }
        .selectTag{
          background-color: rgb(7, 102, 211);
          font-size: 16px;
        }
      }
      .sourceItem{
        overflow: auto;
        text-align: left;
        font-size: 14px;
        margin-left: 8px;
        margin-bottom: 10px;
        color: #5d7a9e;
        cursor: pointer;
        div{
          margin-bottom: 10px;
        }
        div:hover{
          color: black;
        }
      }
    }
    .left_content:nth-child(2){
      margin: 0px 50px 20px 50px;
      .subjectFilterTop{
        text-align: left;
        div{
          padding-left: 10px;
          width: 100%;
        }
      }
    }
  }
  .right{
    display: flex;
    flex-direction: row;
    justify-items: flex-start;
    text-align: left;
    width: 100%;
    margin: 25px 50px 25px 30px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(223, 223, 223, 0.31);
    .result{
      width: 100%;
      background-color: white;
      .tips{
        height: 53px;
        line-height: 53px;
        font-size: 16px;
        color: #45668f;
        background: #fff;
        border-bottom: 1px solid #e4ebf0;
        padding: 0px 0px 0px 30px;
        span{
          font-size: 22px;
          color: #ff7468;
          font-weight: bold;
          padding: 0 10px;
        }
      }
      .dataItem{
        margin-bottom: 10px;
        padding: 0px 0px 15px 30px;
        border-bottom: 1px solid #e4ebf0;
       .title {
          color: #45668f;
          cursor: pointer;
        }
        .extractInfo{
          font-size: 14px;
          color: #aab8ca;
          line-height: 15px;
          overflow: hidden;
          margin-bottom: 10px; 
          span{
            color: #5d7a9e;
            padding-right: 50px;}
        }
        .abstract{
          font-size: 14px;
          color: #aab8ca;
          line-height: 15px;
          overflow: hidden;
          margin-bottom: 10px; 
          span{
            color: #5d7a9e;
            padding-right: 50px;
          }
        }
        .tools {
          color: #555;
          font-size: 14px;
          background-color: transparent;
          display: inline-flex;
          div{
            padding-right: 20px;
          }

        }
      }
      .no_result{
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        height: 80%;
        div{
          display: flex;
          justify-content: center;
          justify-items: center;
        }
      }
    }
    .pagination{
      margin: 25px 50px 25px 25px;
    }
  }
  ::-webkit-scrollbar{
    width: 5px;    
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
    background-color: rgb(158, 176, 205);
  }
  ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 2px;
    background: rgba(0,0,0,0.1);
    background-color: rgb(213, 217, 222);
  }
}
</style>

<script>
import { getDatasetListApi } from '../api/ListPageApi.js';
export default {
  data() {
    return {
      activeName: 'first',
      htmlHeight: "min-height: 735px;",
      leftFilterVisibleFlag: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      items: [],
      source: ['统计局', '交通委', '场监督管理局', '自然资源和规划局', '教育局', 
               '生态环境局', '应急管理局', '人社局', '公安交管局', '文化和旅游局', '商务局', 
              '卫生健康局', '农业农村局', '民政局', '发改委', '水务局', '财政局', '体育局', 
              '林业局', '住建局', '司法局', '档案局', '公共资源交易中心', '医疗保障局', '科技局',
              '工信委', '金融办', '国资委', '综合行政执法局', '公积金管理中心', '粮食局', '公安局',
              '国税局', '地志办', '民宗委', '投促局', '气象局', '审计局', '供销社', '移民局', '人防办',
              '外事办', '大数据局', '信访局', '政务服务中心', '仲裁委', '城镇集体工业联社'
      ],
      subject: [
        '综合政务', '经济管理', '国土资源、能源', '工业、交通、邮政', '信息产业', '城乡建设、环境保护',
        '农业、水利', '财政', '商业、贸易', '旅游、服务业', '气象、水文、测绘、地震', '对外事务', '政法、监察',
        '科技、教育', '文化、卫生、体育', '军事、国防', '劳动、人事', '民政、社区', '文秘、行政', '综合党团'
      ],
      renderData: [],
      tagSourceActive: true,
      tagSubjectActive: false,
    }
  },
  watch:{
    '$route':'refreshDataByRouterParams'
  },
  created(){
    this.renderData = this.source
    this.getDatasetList()
    if(this.$route.query.hasOwnProperty("keyword")){
      this.leftFilterVisibleFlag = false
    }
  },
  methods: {
    refreshDataByRouterParams(){

      this.renderData = this.source
      this.getDatasetList()
    },
    jumpToDetailPage(dataset) {
      this.$router.push({
        path: `/dataset_info`,
        query: {
          id: dataset.id,
        }
      })
    },
    selectTagSource() {
      this.tagSourceActive = true
      this.tagSubjectActive = false 
      if(this.tagSourceActive){
        this.renderData = this.source
      }else{
        this.renderData = this.subject
      }
    },
    selectTagSubject() {
      this.tagSourceActive = false
      this.tagSubjectActive = true 
      if(this.tagSubjectActive){
        this.renderData = this.subject
      }else{
        this.renderData = this.source
      }
    },
    clickSourceOrSubjectTag(name){
      var params = {
        page: 1,
        num: this.pagination.pageSize,
      }
      for(var key in this.$route.query){
        params[key] = this.$route.query[key]
      }
      if (this.tagSourceActive) {
        params["department"] = name
      } else {
        params["subject"] = name
      }
      this.$router.push({
        path: `${this.$route.path}`,
        query: params
      })
    },
    clickRegionTag(id){
      var params = {
        page: 1,
        num: this.pagination.pageSize,
      }
      for(var key in this.$route.query){
        params[key] = this.$route.query[key]
      }
      params["gov_id"] = id
      this.$router.push({
        path: `${this.$route.path}`,
        query: params
      })
    },

    // 数据查询翻页
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getDatasetList()
    },
    async getDatasetList(){
      try{
        var res = {}
        var params = {
          page: this.pagination.currentPage,
          num: this.pagination.pageSize,
        }
        for(var key in this.$route.query){
          params[key] = this.$route.query[key]
        }
        res = await getDatasetListApi(params)
        this.items = res.data
        this.pagination.total = res.total
        
      }catch(e) {
        this.$message.error(e)
      }
    },
  }
}
</script>