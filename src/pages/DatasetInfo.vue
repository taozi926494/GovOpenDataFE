<template>
<div class="detailInfoContainer">
    <div class="title"><span>{{ items.info.path }}</span></div>
    <div class="resourceInfo">
        <div class="tip"><span>资源信息</span></div>
        <div  class="items">
            <div class="item" v-for="(item, key, index) of JSON.parse(items.info.exract_info)" :key="'resourceInfo_'+index">
                <div class="lable"><span>{{ key }}</span></div>
                <div class="value"><span>{{ item }}</span></div>
            </div>
        </div>
    </div>
    <div class="dataInfo">
        <div class="tip"><span>数据信息</span></div>
            <div  class="items">
                <div class="item" v-for="(item, index) of JSON.parse(items.info.field_info)[0]" :key="'dataInfo1_'+index">
                    <div class="lable"><span>{{ item }}</span></div>
                </div>
                <div v-for="(item, index) of JSON.parse(items.info.field_info).slice(1, -1)" :key="'dataInfo2_'+index">
                    <div class="item" v-for="(item, index) of item" :key="'dataInfo3_'+index">
                        <div class="value"><span>{{ item }}</span></div>
                    </div>
                </div>
               
            </div>
    </div>
    <div class="fileDownload">
        <div class="tip"><span>数据下载</span></div>
        <div class="items">
            <div class="fileList">
                <el-table
                    :data="items.attachmentInfoList"
                    style="width: 100%">
                        <el-table-column
                            label="序号"
                            width="100"
                            type="index"
                            :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="文件名"
                            min-width=450>
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="格式"
                            min-width=180>
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="大小"
                            min-width=180>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="180">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="downloadFile(scope.row)">
                                    <a :href="'http://127.0.0.1:5000/download/'+scope.row.path"  class="download">下载</a>
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" >
.detailInfoContainer{
    background-color: #eff3f7;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    .title{
        background-color: white;
        width: 70%;
        height: 80px;
        margin: 15px 0px;
        display: flex;
        align-items: center;        
        justify-content: center;
        padding: 15px 0px;
        span{
            text-align: center;
            font-size: 24px;
            color: #2b72c3;
            font-weight: bold;
        }
       

    }
    .resourceInfo{
        background-color: white;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: 15px;
        .tip{
            width: 10%;
            height: 50px;
            background-color: #2b72c3;
            display: flex;
            flex-direction: column;
            align-items: center;        /* 垂直居中 */
            justify-content: center;    /* 水平居中 */
            margin-bottom: 15px;
            span{
                width: 100%;
                font-size: 18px;
                color: #2b72c3;
                font-weight: bold;
                color: white;
            }
        }
        .items{
            display: flex;
            flex-direction: row;
            justify-content: center;    /* 水平居中 */
            flex-wrap: wrap;
            padding: 0px 20px 20px 20px;
            .item{
                display: inline-flex;
                align-items: center;        /* 垂直居中 */
                justify-content: center;    /* 水平居中 */
                .lable{
                    display: flex;
                    flex-direction: column;
                    align-items: center;        /* 垂直居中 */
                    justify-content: center;    /* 水平居中 */
                    width: 120px;
                    background-color: #F5F9FD;
                    border: 1px solid #a6caf3;
                    white-space: nowrap;
                    margin: 0px 0.5px 0.5px 0.5px;
                    height: 50px;
                    span{
                        width: 100%;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow : ellipsis;
                    }
                }
                .lable span:hover{
                    text-overflow:inherit; 
                    overflow: visible; 
                    white-space: pre-line;
                }
                .value{
                    display: flex;
                    flex-direction: row;
                    align-items: center;        /* 垂直居中 */
                    justify-content: center;    /* 水平居中 */
                    width: 200px;
                    height: 50px;
                    border: 1px solid #a6caf3;
                    margin: 0px 0.5px 0.5px 0.5px;
                    span{
                        width: 100%;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow : ellipsis;
                    }
                }
                .value span:hover{
                    text-overflow:inherit; 
                    overflow: visible; 
                    white-space: pre-line;
                }
            }
        }
        
    }

    .dataInfo{
        background-color: white;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        margin-bottom: 15px;
        .tip{
            width: 10%;
            height: 50px;
            background-color: #2b72c3;
            display: flex;
            flex-direction: column;
            align-items: center;        /* 垂直居中 */
            justify-content: center;    /* 水平居中 */
            margin-bottom: 15px;
            span{
                width: 100%;
                font-size: 18px;
                color: #2b72c3;
                font-weight: bold;
                color: white;
            }
        }
        .items{
            display: flex;
            flex-direction: row;
            justify-content: center;    /* 水平居中 */
            flex-wrap: wrap;
            padding: 0px 20px 20px 20px;
            .item{
                display: inline-flex;
                align-items: center;        /* 垂直居中 */
                justify-content: center;    /* 水平居中 */
                .lable{
                    display: flex;
                    flex-direction: column;
                    align-items: center;        /* 垂直居中 */
                    justify-content: center;    /* 水平居中 */
                    width: 100px;
                    background-color: #F5F9FD;
                    border: 1px solid #a6caf3;
                    white-space: nowrap;
                    margin: 0px 0.5px 0.5px 0.5px;
                    height: 50px;
                    span{
                        width: 100%;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow : ellipsis;
                    }
                }
                .lable span:hover{
                    text-overflow:inherit; 
                    overflow: visible; 
                    white-space: pre-line;
                }
                .value{
                    display: flex;
                    flex-direction: row;
                    align-items: center;        /* 垂直居中 */
                    justify-content: center;    /* 水平居中 */
                    width: 100px;
                    height: 50px;
                    border: 1px solid #a6caf3;
                    margin: 0px 0.5px 0.5px 0.5px;
                    span{
                        width: 100%;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow : ellipsis;
                    }
                }
                .value span:hover{
                    text-overflow:inherit; 
                    overflow: visible; 
                    white-space: pre-line;
                }
            }
        }
        
    }

    .fileDownload{
        background-color: white;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        margin-bottom: 30px;
        .tip{
            width: 10%;
            height: 50px;
            background-color: #2b72c3;
            display: flex;
            flex-direction: column;
            align-items: center;        /* 垂直居中 */
            justify-content: center;    /* 水平居中 */
            margin-bottom: 15px;
            span{
                width: 100%;
                font-size: 18px;
                color: #2b72c3;
                font-weight: bold;
                color: white;
            }
        }
        .items{
            display: flex;
            flex-direction: row;
            align-items: flex-start;        /* 垂直居中 */
            justify-content: flex-start;    /* 水平居中 */
            flex-wrap: wrap;
            padding: 0px 20px 20px 50px;
        }
    }


}

</style>

<script>
import { getDatasetDetailApi } from '../api/DetailPageApi.js';


export default {
    name: 'DetailInfo',
    data() {
        return {
            items: {}
        }
            
    },
    created(){
        this.getDatasetList()
    },
    methods: {
        indexMethod(index) {
            return index + 1;
        },
        async downloadFile(fileInfo){
            try{
                console.log(fileInfo)
                document.querySelector('.download').click()
            } catch(e) {
                this.$message.error(e)
            }
        },
        async getDatasetList(){
            try{
                const path = 'ZheJiangOpendata/files/全省驾驶人体检医院信息'
                const res = await getDatasetDetailApi(path, this.$route.query.id)
                this.items = res.data
            }catch(e) {
                this.$message.error(e)
            }
        }
    }

}
</script>