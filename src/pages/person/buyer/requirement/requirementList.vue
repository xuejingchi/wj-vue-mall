<template>
  <div class="requirement-body">
    <div class="requirement-title">
      <el-menu :default-active="activeIndexAll" class="requisition-nav" mode="horizontal" @select="handleSelect">
        <template v-for="item in navList">
          <el-menu-item :index="item.index">{{ item.name }}<span></span></el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="search-title clearfix">
      <div class="search-txt f-l">
        <span>关键字：</span>
        <input type="text" v-model="search.txt" placeholder="需求单号/采购简述">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">提交日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="search.startTime"
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
          v-model="search.endTime"
          type="date"
          placeholder="结束时间"
          :picker-options="time.endPickerOptions"
          class="end-input">
        </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="searchList()">搜索</button>
    </div>
    <div class="requirement-content">
      <div class="list-title clearfix">
        <div class="purchase">采购简述</div>
        <div class="expectation-date">期望交期</div>
        <div class="list-title-status">状态</div>
        <div class="list-title-operation">操作</div>
      </div>
      <div class="list-content list-show" v-for="(item, index) in tableList">
        <div class="list-infomation clearfix">
          <div class="demand-odd f-l">
            需求单号：<router-link class="demand-router" :to="{path:'/setting/buyer/requirement/detail', query:{demandId: item.demandId}}">{{ item.demandCode }}</router-link>
          </div>
          <div class="man-info f-l">
            销售经理：{{ item.seller }}
          </div>
          <div class="submit-date f-r">
            提交日期: {{ item.createTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}
          </div>
        </div>
        <!--<div class="list-txt" v-for="(item, index) in list">-->
        <div class="list-txt" key="index">
          <table class="list-table">
            <tr >
              <td class="entity">
                {{item.demandResume}}
              </td>
              <td class="date">
                {{ item.submitStartTime | timeFormat('YYYY-MM-DD') }} ~ {{ item.submitEndTime | timeFormat('YYYY-MM-DD') }}
              </td>
              <td class="status">
                {{ item.status | filterStatus }}
              </td>
              <td style="cursor: pointer;" class="operation">
                <span v-if="item.status >= '35'">
                    确认方案 <i class="el-icon-arrow-down" :class="item.show ? 'el-icon-arrow-up' : ''"  @click="addShowDetai(item, tableList, index)"></i>
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div class="show follow-me" v-show="item.show" >
          <el-table
            :data="item.accessoryList"
            style="width: 100%">
            <el-table-column
              label="方案分类"
              width="188"
            >
              <template slot-scope="scope">
                <span class="icon iconfont green" v-if="scope.row.status === '60'">&#xe624;</span>
                <span class="icon iconfont red" v-if="scope.row.status === '55'">&#xe623;</span>
                {{ scope.row.schemeCategory }}
              </template>
            </el-table-column>
            <el-table-column
              prop="schemeName"
              label="方案名称"
              width="333"
            >
            </el-table-column>
            <el-table-column
              label="方案附件"
              width="172"
            >
              <template slot-scope="scope">
                <a class="link-to-window" @click="DownloadFile(scope.row.schemeAttachment, scope.row.attachmentName)"><i class="iconfont" style="color:rgb(28, 110, 235)">&#xe620;</i>{{ scope.row.attachmentName }}</a>
              </template>
            </el-table-column>
            <el-table-column
              label="上传时间"
              width="140"
            >
              <template slot-scope="scope">
                {{ scope.row.uploadTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="115"
            >
              <template slot-scope="scope">
                <span class="affirm" v-if="scope.row.status === '60'">已确认</span>
                <span class="reject" v-if="scope.row.status === '55'">已驳回</span>
                <span class="prepare" v-if="scope.row.status === '50'">
                  <button class="yes btn"  @click="editorAccessoryStatus(scope, 'affirm')">确认</button>
                  <button class="no btn"  @click="editorAccessoryStatus(scope, 'reject')">驳回</button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="no-data" v-if="!tableList.length"><p class="img"></p> <p class="des">您还没有需求单哟~</p></div>
      <div v-if="page.totalSize" class="project-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :page-size="10"
          @current-change="pageChange"
          :current-page="page.currentPage"
          :total="page.totalSize">
        </el-pagination>
      </div>
    </div>
    <dialog-editor-requirementList ref="editorDialog" @getTempData="getRecordList"></dialog-editor-requirementList>
  </div>
</template>
<script>
import moment from 'moment'
import dialogEditorRequirementList from './dialog-editor-requirementList'
import { getRecordList, getAccessoryList } from '@/api/person/buyer/contract'
import { getUserInfo } from '@/utils/auth'
// import { timeFormat } from '@/filters'
export default {
  name: 'requirementList',
  components: {
    dialogEditorRequirementList
  },
  filters: {
    filterStatus (status) {
      if (status === '10') {
        return '已提交，待受理'
      } else if (status === '20' || status === '30') {
        return '已受理，方案制定中'
      } else if (status === '35') {
        return '方案出具，请确认'
      } else if (status === '40') {
        return '方案已确认'
      }
    },
    timeFormat (value, format) {
      if (value) {
        return moment(value).format(format)
      }
      return ''
    }
  },
  data () {
    return {
      navList: [
        {
          name: '所有需求单',
          index: 'all'
        },
        {
          name: '待受理',
          index: '10'
        },
        {
          name: '方案制定中',
          index: '20'
        },
        {
          name: '方案待确认',
          index: '35'
        },
        {
          name: '方案已确认',
          index: '40'
        }
      ],
      buyer: true,
      data: '',
      activeIndexAll: 'all',
      activeIndex: 'requirement',
      tableList: [],
      search: {
        txt: '',
        startTime: '',
        endTime: ''
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalSize: ''
      },
      userInfo: getUserInfo(),
      time: {
        startPickerOptions: {
          disabledDate: (val) => {
            if (this.search.endTime !== null && this.search.endTime !== '' && this.search.endTime !== undefined) {
              return val.getTime() > this.search.endTime
            }
          }
        },
        endPickerOptions: {
          disabledDate: (val) => {
            if (this.search.startTime !== null) {
              return val.getTime() < this.search.startTime
            }
          }
        }
      },
      all: {
        data: {},
        status: ''
      }
    }
  },
  created () {
  },
  mounted () {
    this.getRecordList()
    this.handleSelect()
  },
  methods: {
    handleSelect (key) {
      console.log(key)
      if (key === undefined) {
        key = 'all'
      }
      this.activeIndexAll = key
      this.getRecordList()
    },
    toLink (data) {
      window.open(data.row.schemeAttachment)
    },
    addShowDetai (item, list, index) {
      let params = {
        demandId: item.demandId,
        userId: this.userInfo.userId || '1e7a3ea4bd635c5e8a88f7f7ddaa36b6',
      }
      let temp = item
      temp.show = !temp.show
      list.splice(index, 1, temp)
      console.log('show: ', item.show)
      if (item.show) {
        getAccessoryList(params).then((response) => {
          if (response.data.code === 200) {
            let temp = item
            temp.accessoryList = response.data.data
            list.splice(index, 1, temp)
          }
        })
      }
    },
    searchList() {
      this.page.currentPage = 1
      this.getRecordList()
      this.pageChange()
    },
    getRecordList () {
      console.log(this.page.currentPage)
      let params = {
        userId: this.userInfo.userId || '1e7a3ea4bd635c5e8a88f7f7ddaa36b6',
        companyId: this.userInfo.customerId || 'TestCompany01',
        demandStatus: this.activeIndexAll,
        keyword: this.search.txt,
        pageNo: this.page.currentPage || 1,
        pageSize: this.page.pageSize,
        submitEndTime: moment(this.search.endTime).valueOf(),
        submitStartTime: moment(this.search.startTime).valueOf()
      }
      // console.log(params)
      getRecordList(params).then((response) => {
        if (response.data.code === 200) {
          let data = response.data.data
          this.tableList = data.demandBillVOList
          this.tableList.forEach(item => {
            item.show = false
            item.accessoryList = []
          })
          this.page.totalSize = parseInt(data.totalSize, 10)
        }
      })
    },
    pageChange (current) {
      this.page.currentPage = current
      this.getRecordList()
    },
    editorAccessoryStatus (data, status) {
      this.$refs.editorDialog.show(data, status)
    }
  }
}
</script>
<style lang="sass">
  @import "./requirementList"
</style>0
