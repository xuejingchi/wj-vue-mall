<template>
  <div class="order-list">
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
        <input type="text" v-model="params.keyword" placeholder="销售订单号/商品名称">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">订单日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="params.startDate"
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
            v-model="params.endDate"
            type="date"
            placeholder="结束时间"
            :picker-options="time.endPickerOptions"
            class="end-input">
          </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="search">搜索</button>
    </div>
    <div class="order-box">
      <ul class="label">
        <li class="label-1">商品名称</li>
        <li class="label-2">订单金额(元)</li>
        <li class="label-3">预计交期</li>
        <li class="label-4">实收金额(元)</li>
        <li class="label-5">状态</li>
        <li class="label-6">订单操作</li>
        <li class="label-7">发货信息</li>
      </ul>
      <div class="content" v-for="items in orderList">
        <ul class="header">
          <li>
            <span>销售订单号：</span>
            <p @click="goOrderDetail(items.orderId, 0)">{{items.orderCode}}</p>
          </li>
          <li>
            <span>项目名称：</span>
            <p>{{items.projectName}}</p>
          </li>
          <li>
            <span>订单日期：</span>
            <p>{{items.createTime | timeFormat('YYYY-MM-DD')}}</p>
          </li>
        </ul>
        <ul class="body">
          <li class="label-1">{{items.itemName}}</li>
          <li class="label-2">{{items.orderAmount}}</li>
          <li class="label-3">
            <p>{{items.minExpectedDelivery | timeFormat('YYYY-MM-DD')}}</p>
            <p>~</p>
            <p>{{items.maxExpectedDelivery | timeFormat('YYYY-MM-DD')}}</p>
          </li>
          <li class="label-4">{{items.receipts ? items.receipts : 0}}</li>
          <li class="label-5">
            <p v-if="items.status === '50'">待确认</p>
            <p v-if="items.status === '55'">待生效</p>
            <p v-if="items.status === '60'">待发货</p>
            <p v-if="items.status === '90'">发货完成</p>
          </li>
          <li class="label-6">
            <button v-if="items.status === '50'" @click="goOrderDetail(items.orderId, 1)">确认</button>
            <button @click="goDeliveryManagement(items.orderCode)" v-if="items.status === '60'">我要发货</button>
          </li>
          <li class="label-7">
            <div v-if="items.isExistDeliveryInfo && items.status >= 60" @click="deliveryInfo(items.orderCode, items.orderId, items)" :id="items.orderId+'_info'">
              <i v-if="items.isRead === '2'" class="iconfont icon-Artboard"></i>
              <p v-if="items.isRead === '2'">未读</p>
              <span class="">发货信息</span>
              <span class="el-icon-arrow-down"></span>
            </div>
          </li>
        </ul>
        <div :id="items.orderId+'_info_box'" class="delivery-info">
          <ul class="info-header">
            <li class="label-1">发货单号</li>
            <li class="label-2">商品名称</li>
            <li class="label-3">发货时间</li>
            <li class="label-4">收货地址</li>
            <li class="label-5">物流状态</li>
            <li class="label-6">操作</li>
          </ul>
          <ul class="info-body" v-if="items.invoiceList !== undefined" v-for="item in items.invoiceList">
            <li class="label-1">
              <div>
                <i v-if="item.isRead === '2'" class="iconfont icon-Artboard1"></i>
                <p v-if="item.isRead === '2'">未读</p>
                <span @click="goDeliveryState(item.deliveryId)">{{item.deliveryCode}}</span>
              </div>
            </li>
            <li class="label-2">{{item.itemName}}</li>
            <li class="label-3">{{item.deliveryDateTime | timeFormat('YYYY-MM-DD')}}</li>
            <li class="label-4">{{item.address}}</li>
            <li class="label-5">
              <p v-if="item.status === '30'">待发货</p>
              <p v-if="item.status === '40'">待签收</p>
              <p v-if="item.status === '90'">发货完成</p>
            </li>
            <li class="label-6">
              <el-popover
                popper-class="my-popover"
                placement="bottom"
                style="height:208px;"
                width="230"
                trigger="click">
                <div class="logistics" >
                  <div class="title">
                    <span>{{logistics.logisticsName}}：</span>
                    <p>{{logistics.logisticsCode}}</p>
                  </div>
                  <div class="list">
                    <ul v-for="item in curLogisticsList">
                      <li>· {{item.logisticsInfo}}</li>
                      <li>{{item.logisticsTime | timeFormat('YYYY-MM-DD  HH:mm:ss')}}</li>
                    </ul>
                  </div>
                  <div class="bottom" v-if="curLogisticsList.length === 2 ">
                    <span>· 以上为最新跟踪信息</span>
                    <p @click="allLogisticsList">查看全部</p>
                  </div>
                </div>
                <p slot="reference" @click="getLogisticsList(item.deliveryId)">查看物流</p>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
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
  import { findLogisticsList } from '@/api/person/buyer/contract'
  export default {
    data () {
      return {
        navList: [
          {
            name: '全部订单',
            index: '1'
          },
          {
            name: '待确认',
            index: '2'
          },
          {
            name: '待生效',
            index: '3'
          },
          {
            name: '待发货',
            index: '4'
          },
          {
            name: '发货完成',
            index: '5'
          }
        ],
        activeIndex: '1',
        // 筛选参数
        params: {
          userId: getUserInfo().userId,
          companyId: getUserInfo().companyId, // 企业id
          supplierId: getUserInfo().supplierId,
          keyword: '', // 搜索关键字
          status: '', // 订单状态
          startTime: '',
          endTime: '',
          pageNo: 1, // 当前页码
          pageSize: 15
        },
        // 日期校验
        time: {
          startPickerOptions: {
            disabledDate: (val) => {
              if (this.params.endTime !== null && this.params.endTime !== '' && this.params.endTime !== undefined) {
                return val.getTime() > this.params.endTime
              }
            }
          },
          endPickerOptions: {
            disabledDate: (val) => {
              if (this.params.startTime !== null) {
                return val.getTime() < this.params.startTime
              }
            }
          }
        },
        totalSize: 0, // 总条数
        // 订单列表
        orderList: [],
        // 发货单物流信息
        invoiceList: [],
        // 当前列表项的物流信息
        logistics: {},
        // 当前显示的物流信息列表
        curLogisticsList: [],
      }
    },
    created () {
    },
    beforeMount () {
    },
    mounted () {
      this.findOrderList()
    },
    computed: {
    },
    methods: {
      // 切换方案状态时函数
      handleSelect (key) {
        this.params.pageNo = 1
        switch (key) {
          case '1':
            this.params.status = ''
            break
          case '2':
            this.params.status = '50'
            break
          case '3':
            this.params.status = '55'
            break
          case '4':
            this.params.status = '60'
            break
          case '5':
            this.params.status = '90'
            break
          default:
            this.params.status = ''
        }
        this.findOrderList()
      },
      // 翻页函数
      pageChange(pageNum) {
        this.params.pageNo = pageNum
        this.findOrderList(1)
      },
      // 获取订单列表
      findOrderList(pageChange) {
        if (pageChange !== 1) {
          this.params.pageNo = 1
        }
        let startTime = new Date(this.params.startTime).getTime()
        let endTime = new Date(this.params.endTime).getTime()
        if (!startTime) {
          startTime = null
        }
        if (!endTime) {
          endTime = null
        }
        this.params.startTime = startTime
        this.params.endTime = endTime
        funSets.findOrderList(this.params).then(
          res => {
            let data = res.data
            if (data.code === 200) {
              this.totalSize = data.data.totalSize
              let list = data.data.list
              if (list != null) {
                for (let i = 0; i < list.length; i++) {
                  list[i].invoiceList = []
                }
              }
              this.orderList = list
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
        this.findOrderList()
      },
      // 查看发货信息
      deliveryInfo(orderCode, id, items) {
        let infoDiv = document.getElementById(`${id}_info`)
        let infoSpan = infoDiv.lastChild
        let infoBox = document.getElementById(`${id}_info_box`)
        let params = {
          userId: this.params.userId,
          purchaseContractHeadId: id
        }
        if (infoSpan.className === 'el-icon-arrow-down') {
          infoSpan.className = 'el-icon-arrow-up'
          infoBox.style.display = 'block'
          items.invoiceList = this.invoiceList
          funSets.findInvoiceList(params).then(
            res => {
              let data = res.data
              if (data.code === 200) {
                items.invoiceList = data.data
              }
            }
          ).catch(
            err => {
              this.$message.error(err)
            }
          )
        } else {
          infoSpan.className = 'el-icon-arrow-down'
          infoBox.style.display = 'none'
        }
      },
      // 我要发货--跳转至发货
      goDeliveryManagement(orderCode) {
        this.$router.push({
          path: 'deliveryManagement',
          query: {
            orderCode: orderCode
          }
        })
      },
      // 跳转至订单详情
      goOrderDetail(orderId, btn) {
        this.$router.push({
          path: 'orderExecute/detail',
          query: {
            orderId: orderId,
            btn: btn
          }
        })
      },
      // 跳转至 发货信息详情
      goDeliveryState(deliveryHeadId) {
        this.$router.push({
          path: 'deliveryManagement/deliveryState',
          query: {
            deliveryHeadId: deliveryHeadId
          }
        })
      },
      // 获取物流信息列表
      getLogisticsList(deliveryId) { // deliverInfoId
        let params = {
          userId: this.params.userId,
          deliverInfoId: deliveryId // id
        }
        findLogisticsList(params).then(
          res => {
            let data = res.data
            if (data.code === 200) {
              if (data.data) {
                this.logistics = data.data
              }
              if (this.logistics.logisticsList.length > 2) {
                let str = JSON.stringify(this.logistics.logisticsList)
                this.curLogisticsList = JSON.parse(str).slice(0, 2)
              }
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 查看全部物流信息
      allLogisticsList() {
        let str = JSON.stringify(this.logistics.logisticsList)
        this.curLogisticsList = JSON.parse(str)
      },
    },
    components: {
    }
  }
</script>
<style lang="scss">
  @import "./order.scss";
</style>
