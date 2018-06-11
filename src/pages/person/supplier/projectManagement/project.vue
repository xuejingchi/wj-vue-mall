<template>
  <div class="project-management">
    <div class="requirement-title">
      <el-menu :default-active="activeIndex" class="requisition-nav" mode="horizontal" @select="handleSelect">
        <template v-for="item in navList">
          <el-menu-item :index="item.index">{{ item.name }}<span></span></el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="search-title clearfix">
      <div class="search-txt f-l">
        <span>关键字：</span>
        <input type="text" v-model="params.keyword" placeholder="派发单号/需求品类">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">提交日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="params.dispatchStartDate"
            type="date"
            placeholder="开始时间"
            class="start-input"
            :picker-options="time.startPickerOptions"
          >
          </el-date-picker>
        </div>
        <i class="f-l line">-</i>
        <div class="f-l end-time">
          <el-date-picker
            v-model="params.dispatchEndDate"
            type="date"
            placeholder="结束时间"
            :picker-options="time.endPickerOptions"
            class="end-input">
          </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="search">搜索</button>
    </div>
    <div class="project-box">
      <ul class="label">
        <li class="label-1">派发单号</li>
        <li class="label-2">派发日期</li>
        <li class="label-3">需求品类</li>
        <li class="label-4">招采经理</li>
        <li class="label-5">联系方式</li>
        <li class="label-6">状态</li>
        <li class="label-7">方案附件</li>
        <li class="label-8">交易操作</li>
      </ul>
      <ul class="content" v-for="item in dispatchList">
        <li class="label-1">
          <span class="link" @click="uploadProject(item.solutionSupplierId,item.solutionId,0)">{{item.solutionCode}}</span>
        </li>
        <li class="label-2">{{item.dispatchDate | timeFormat('YYYY-MM-DD')}}</li>
        <li class="label-3" :title="item.demandCategory">{{item.demandCategory}}</li>
        <li class="label-4">{{item.purchaser}}</li>
        <li class="label-5">{{item.contactPhone}}</li>
        <li class="label-6">
          <span v-if="item.status === '10'">待上传方案</span>
          <span v-if="item.status === '20'">方案提交待审核</span>
          <span v-if="item.status === '25'">驳回待上传方案</span>
          <span v-if="item.status === '30'" class="iconfont icon-icon-test1">  审核通过</span>
          <span v-if="item.status === '00'" class="iconfont icon-icon-test">  审核未通过</span>
        </li>
        <li class="label-7">
          <a @click="DownloadFile(item.attachmentPath,item.attachmentName)">
            <i v-if="item.attachmentName" class="iconfont icon-fujian"></i>
            {{item.attachmentName}}
          </a>
        </li>
        <li class="label-8">
          <button v-if="item.status === '10' || item.status === '25'" @click="uploadProject(item.solutionSupplierId,item.solutionId,1)">上传方案</button>
        </li>
      </ul>
    </div>
    <div v-if="!totalSize" class="no-data">
      <p class="img"></p>
      <p class="des">找不到相关数据</p>
    </div>
    <div v-if="totalSize" class="project-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="params.pageSize"
        :current-page="params.pageNo"
        @current-change="pageChange"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as funSets from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  export default {
    data () {
      return {
        navList: [
          {
            name: '所有派发单',
            index: '1'
          },
          {
            name: '待上传方案',
            index: '2'
          },
          {
            name: '方案待审核',
            index: '3'
          },
          {
            name: '审核通过',
            index: '4'
          },
          {
            name: '审核未通过',
            index: '5'
          }
        ],
        activeIndex: '1',
        // 筛选参数
        params: {
          userId: getUserInfo().userId,
          keyword: '', // 搜索关键字
          dispatchStartDate: '',
          dispatchEndDate: '',
          status: '', // 派发单状态
          pageNo: 1, // 当前页码
          supplierId: getUserInfo().supplierId, // 企业ID
          pageSize: 15
        },
        // 日期校验
        time: {
          startPickerOptions: {
            disabledDate: (val) => {
              if (this.params.dispatchEndDate !== null && this.params.dispatchEndDate !== '' && this.params.dispatchEndDate !== undefined) {
                return val.getTime() > this.params.dispatchEndDate
              }
            }
          },
          endPickerOptions: {
            disabledDate: (val) => {
              if (this.params.dispatchStartDate !== null) {
                return val.getTime() > new Date() || val.getTime() < this.params.dispatchStartDate
              }
            }
          }
        },
        // 派发单列表
        dispatchList: [
        ],
        totalSize: 0, // 总条数
      }
    },
    created () {
    },
    beforeMount () {
    },
    mounted () {
      this.findSolutionList()
    },
    computed: {
    },
    methods: {
      // 切换方案状态时函数
      handleSelect (key) {
        // console.log(key, keyPath)
        this.params.pageNo = 1
        switch (key) {
          case '1':
            this.params.status = ''
            break
          case '2':
            this.params.status = '10'
            break
          case '3':
            this.params.status = '20'
            break
          case '4':
            this.params.status = '30'
            break
          case '5':
            this.params.status = '00'
            break
          default:
            this.params.status = ''
        }
        this.findSolutionList()
      },
      // 获取供方派发单列表
      findSolutionList(pageChange) {
        if (pageChange !== 1) {
          this.params.pageNo = 1
        }
        let startTime = new Date(this.params.dispatchStartDate).getTime()
        let endTime = new Date(this.params.dispatchEndDate).getTime()
        if (!startTime) {
          startTime = null
        }
        if (!endTime) {
          endTime = null
        }
        this.params.dispatchStartDate = startTime
        this.params.dispatchEndDate = endTime
        funSets.findSolutionList(this.params).then(
          res => {
            let data = res.data.data
            if (data === null) {
              this.dispatchList = null
              this.totalSize = 0
            } else {
              this.dispatchList = data.list
              this.totalSize = data.totalSize
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 点击搜索
      search() {
        this.findSolutionList()
      },
      // 翻页函数
      pageChange(pageNum) {
        this.params.pageNo = pageNum
        this.findSolutionList(1)
      },
      // 上传方案
      uploadProject(solutionSupplierId, solutionId, btn) {
        this.$router.push({
          path: 'projectManagement/uploadProject',
          query: {
            solutionSupplierId: solutionSupplierId,
            solutionId: solutionId,
            btn: btn
          }
        })
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  @import "./project.scss";
</style>
