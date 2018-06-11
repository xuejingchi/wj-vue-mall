<template>
  <div class="notice-list">
    <div class="requirement-title">
      <el-menu :default-active="activeIndex" class="requisition-nav" mode="horizontal">
        <template v-for="item in navList">
          <el-menu-item :index="item.index">{{ item.name }}<span></span></el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="search-title clearfix">
      <div class="search-txt f-l">
        <span>关键字：</span>
        <input type="text" v-model="search.txt" placeholder="锁货单号/商品名称">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">提交日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="search.startTime"
            type="date"
            placeholder="开始时间"
            class="start-input"
          >
          </el-date-picker>
        </div>
        <i class="f-l line">-</i>
        <div class="f-l end-time">
          <el-date-picker
            v-model="search.endTime"
            type="date"
            placeholder="结束时间"
            class="end-input">
          </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="getInformList()">搜索</button>
    </div>
    <div class="list-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="锁货单号"
          width="160"
        >
          <template slot-scope="scope">
            <i class="icon" v-if="!scope.row.isRead">未读</i>
            <router-link class="num" :to="{ path: 'LockGood/lockGoodsDetail', query: { salesReservationId: scope.row.salesReservationId }}">{{ scope.row.salesReservationCode }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="通知日期 ">
          <template slot-scope="scope">
            {{ scope.row.notifyDate | timeFormat('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="purchaser"
          label="招采经理">
        </el-table-column>
        <el-table-column
          prop="contactPhone"
          label="联系方式"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          width="272"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="收货地址"
          width="240"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="no-data" v-if="!tableData.length"><p class="img"></p> <p class="des">您还没有通知哟~</p></div>
    <!--<div v-if="!page.totalSize" class="no-data">-->
      <!--<p class="img"></p>-->
      <!--<p class="des">您还没有订单哟~</p>-->
    <!--</div>-->
    <div v-if="page.totalSize" class="project-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="10"
        @current-change="pageChange"
        :total="page.totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getInformList } from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  import moment from 'moment'
  export default {
    data () {
      return {
        userInfo: getUserInfo(),
        navList: [
          {
            name: '全部通知',
            index: '1'
          }
        ],
        activeIndex: '1',
        search: {
          txt: '',
          startTime: '',
          endTime: ''
        },
        tableData: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          totalSize: 0
        }
      }
    },
    filters: {
      timeFormat (value, format) {
        if (value) {
          return moment(value).format(format)
        }
        return ''
      }
    },
    created () {
    },
    beforeMount () {
    },
    mounted () {
      this.getInformList()
    },
    computed: {
    },
    methods: {
      // 切换方案状态时函数
      // handleSelect (key, keyPath) {
      //   console.log(key, keyPath)
      // },
      pageChange(pageNum) {
        this.page.currentPage = pageNum
        this.getInformList()
      },
      getInformList () {
        let params = {
          supplierId: this.userInfo.supplierId,
          userId: this.userInfo.userId,
          keyword: this.search.txt,
          pageNo: 1,
          pageSize: 10,
          notifyEndTime: moment(this.search.endTime).valueOf(),
          notifyStartTime: moment(this.search.startTime).valueOf()
        }
        getInformList(params).then((response) => {
          if (response.data.code === 200) {
            let data = response.data.data
            this.tableData = data.stockList
            this.page.totalSize = parseInt(data.totalSize, 10)
          }
        })
      },
    },
    components: {
    }
  }
</script>
<style lang="sass">
  @import "./list"
</style>
