<template>
  <div class="delivery-management">
    <div class="management-title">
      <p>发货管理</p>
    </div>
    <div class="search-title clearfix">
      <div class="search-txt f-l">
        <span>关键字：</span>
        <input type="text" v-model="params.keyword" placeholder="通知单号/销售订单号/项目名称">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">派发日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="params.startTime"
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
            v-model="params.endTime"
            type="date"
            placeholder="结束时间"
            :picker-options="time.endPickerOptions"
            class="end-input">
          </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="search">搜索</button>
    </div>
    <div class="delivery-list-box">
      <ul class="top">
        <li class="label-1">通知单号</li>
        <li class="label-2">通知日期</li>
        <li class="label-3">销售订单号</li>
        <li class="label-4">要求到货日期</li>
        <li class="label-5">项目名称</li>
        <li class="label-6">招采经理</li>
        <li class="label-7">联系方式</li>
        <li class="label-8">操作</li>
        <li class="label-9">发货信息</li>
      </ul>
      <div class="body" v-for="items in deliverList">
        <ul class="list">
          <li class="label-1" @click="goDetail(items.deliveryNoticeId)">{{items.deliveryNoticeCode}}</li>
          <li class="label-2">{{items.deliveryNoticeDate | timeFormat('YYYY-MM-DD')}}</li>
          <li class="label-3">{{items.saleContractHeadCode}}</li>
          <li class="label-4">{{items.deliveryDate | timeFormat('YYYY-MM-DD')}}</li>
          <li class="label-5">{{items.projectName}}
            <span v-if="items.itemCount">(共{{ items.itemCount }}种)</span>
          </li>
          <li class="label-6">{{items.staffer}}</li>
          <li class="label-7">{{items.contactTel}}</li>
          <li class="label-8">
            <span v-if="items.status === '90'">已完成</span>
            <button @click="goDeliveryOperate(items.deliveryNoticeId)" v-if="items.status === '30' || items.status === '40'">去发货</button>
          </li>
          <li class="label-9">
            <div v-if="items.deliveryCount" @click="deliveryInfo(items.deliveryNoticeId,items)" :id="items.deliveryNoticeId+'_info'">
              <i v-if="items.isRead === '0'" class="iconfont icon-Artboard"></i>
              <p v-if="items.isRead === '0'">未读</p>
              <span class="">发货信息</span>
              <span class="el-icon-arrow-down"></span>
            </div>
          </li>
        </ul>
        <div :id="items.deliveryNoticeId+'_info_box'" class="delivery-info">
          <ul class="info-header">
            <li class="label-1">发货单号</li>
            <li class="label-2">商品名称</li>
            <li class="label-3">发货时间</li>
            <li class="label-4">收货地址</li>
            <li class="label-5">物流状态</li>
            <li class="label-6">操作</li>
          </ul>
          <ul class="info-body" v-for="item in items.infoList">
            <li class="label-1">
              <div>
                <i v-if="item.isRead === '0'" class="iconfont icon-Artboard1"></i>
                <p v-if="item.isRead === '0'">未读</p>
                <span @click="goDeliveryState(item.deliveryHeadId,items.deliveryNoticeId)">{{item.deliveryCode}}</span>
              </div>
            </li>
            <li class="label-2">{{`${item.itemName}(共${item.itemCount}种)`}}</li>
            <li class="label-3">{{item.deliveryDate | timeFormat('YYYY-MM-DD')}}</li>
            <li class="label-4">{{`${item.address}(${item.contact}收) ${item.contactPhone}`}}</li>
            <li class="label-5">
              <p v-if="item.status === '40'">已发货</p>
              <p v-if="item.status === '50'">待签收</p>
              <p v-if="item.status === '90'">已签收</p>
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
                <p slot="reference" @click="getLogisticsList(item.deliveryHeadId)">查看物流</p>
              </el-popover>
              <!--<button>签收</button>-->
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
  import {findLogisticsList} from '@/api/person/buyer/contract'
  export default {
    data () {
      return {
        // 筛选参数
        params: {
          userId: getUserInfo().userId,
          supplierId: getUserInfo().supplierId, // 供应商id
          keyword: '', // 搜索关键字
          startTime: 0, // 派发单开始日期
          endTime: 0, // 派发单结束日期
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
        totalSize: 0,
        // 发货管理列表
        deliverList: [],
        infoList2: [],
        // 当前列表项的物流信息
        logistics: {
          // logisticsCode: '123321',
          // logisticsList: [
          //   {
          //     logisticsInfo: '实打实大的',
          //     logisticsTime: '1232131'
          //   },
          //   {
          //     logisticsInfo: '实打实大的',
          //     logisticsTime: '1232131'
          //   },
          //   {
          //     logisticsInfo: '实打实大的',
          //     logisticsTime: '1232131'
          //   },
          // ],
          // logisticsName: '德邦物流'
        },
        // 当前显示的物流信息列表
        curLogisticsList: [],
      }
    },
    created () {
    },
    beforeMount () {
      let query = this.$route.query
      if (query.orderCode !== undefined) {
        this.params.keyword = query.orderCode
      }
      this.findDeliveryNoticeList()
      console.log(4654654, getUserInfo())
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      // 点击搜索
      search() {
        this.findDeliveryNoticeList()
      },
      //  获取发货管理 发货通知列表
      findDeliveryNoticeList (pageChange) {
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
        funSets.findDeliveryNoticeList(this.params).then(
          res => {
            let data = res.data
            if (data.code === 200) {
              this.totalSize = data.data.totalSize
              let list = data.data.noticeList
              for (let i = 0; i < list.length; i++) {
                list[i].infoList = []
              }
              this.deliverList = list
            }
          }
        ).catch(
          err => {
            this.$message({
              message: err,
              type: 'error'
            })
          }
        )
      },
      // 翻页函数
      pageChange(pageNum) {
        this.params.pageNo = pageNum
        this.findDeliveryNoticeList(1)
      },
      // 点击查看发货信息 id~发货单id
      deliveryInfo(deliveryNoticeId, items) {
        let div = document.getElementById(`${deliveryNoticeId}_info`)
        let span = div.lastChild

        let divBox = document.getElementById(`${deliveryNoticeId}_info_box`)
        if (span.className === 'el-icon-arrow-down') {
          span.className = 'el-icon-arrow-up'
          divBox.style.display = 'block'
          let params = {
            userId: this.params.userId,
            deliveryNoticeId: deliveryNoticeId
          }
          items.infoList = this.infoList2
          funSets.findDeliveryList(params).then(
            res => {
              let data = res.data
              if (data.code === 200) {
                items.infoList = data.data
              }
            }
          ).catch(
            err => {
              this.$message({
                message: err,
                type: 'error'
              })
            }
          )
        } else {
          span.className = 'el-icon-arrow-down'
          divBox.style.display = 'none'
        }
      },
      // 获取物流信息列表
      getLogisticsList(deliveryHeadId) { // deliverInfoId
        let params = {
          userId: this.params.userId,
          deliverInfoId: deliveryHeadId // id
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
            this.$message({
              message: err,
              type: 'error'
            })
          }
        )
      },
      // 查看全部物流信息
      allLogisticsList() {
        let str = JSON.stringify(this.logistics.logisticsList)
        this.curLogisticsList = JSON.parse(str)
      },
      // 跳转至发货通知单详情
      goDetail(deliveryNoticeId) {
        this.$router.push({
          path: 'deliveryManagement/noticeOfInvoice',
          query: {
            deliveryNoticeId: deliveryNoticeId
          }
        })
      },
      // 跳转至 去发货
      goDeliveryOperate(deliveryNoticeId) {
        this.$router.push({
          path: 'deliveryManagement/DeliveryOperate',
          query: {
            deliveryNoticeId: deliveryNoticeId
          }
        })
      },
      // 跳转至 发货信息详情
      goDeliveryState(deliveryHeadId, deliveryNoticeId) {
        this.$router.push({
          path: 'deliveryManagement/deliveryState',
          query: {
            deliveryHeadId: deliveryHeadId,
            deliveryNoticeId: deliveryNoticeId
          }
        })
      },
    },
    components: {
    },
    watch: {
    }
  }
</script>
<style lang="scss">
  @import "./deliveryManagement.scss";
</style>
