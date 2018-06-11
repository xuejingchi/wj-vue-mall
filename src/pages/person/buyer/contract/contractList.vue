<template>
  <div class="contract-list">
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
        <input type="text" v-model="params.keyword" placeholder="订单号/订单名称">
      </div>
      <div class="search-time f-l clearfix">
        <span class="f-l txt">订单日期：</span>
        <div class="start-time f-l">
          <el-date-picker
            v-model="params.contractStartDate"
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
            v-model="params.contractEndDate"
            type="date"
            placeholder="结束时间"
            class="end-input"
            :picker-options="time.endPickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <button class="search-btn f-l" @click="search">搜索</button>
    </div>
    <div class="contract-box">
      <ul class="label">
        <li class="label-1">订单名称</li>
        <li class="label-2">订单金额(元)</li>
        <li class="label-3">预交付日期</li>
        <li class="label-4">已付金额</li>
        <li class="label-5">状态</li>
        <li class="label-6">订单操作</li>
        <li class="label-7">发货通知</li>
        <li class="label-8">发货信息</li>
      </ul>
      <div class="content" v-for="(items, index) in contractList">
        <ul class="header">
          <li class="h-code">
            <span>采购订单号：</span>
            <p @click="goReceiptInvoice(items.contractId)">{{items.contractCode}}</p>
          </li>
          <li class="h-name">
            <span>项目名称：</span>
            <p>{{items.projectName}}</p>
          </li>
          <li class="h-date">
            <span>订单日期：</span>
            <p>{{items.contractDate | timeFormat('YYYY-MM-DD')}}</p>
          </li>
        </ul>
        <ul class="body">
          <li class="label-1">{{items.contractName}}</li>
          <li class="label-2">{{items.contractAmount}}</li>
          <li class="label-3">
            <p>{{items.deliveryStartDate | timeFormat('YYYY-MM-DD')}}</p>
            <p>~</p>
            <p>{{items.deliveryEndDate | timeFormat('YYYY-MM-DD')}}</p>
          </li>
          <li class="label-4">{{items.paidAmount}}</li>
          <li class="label-5">
            <p v-if="items.contractStatus === '50'">待确认</p>
            <p v-if="items.contractStatus === '55'">待生效</p>
            <p v-if="parseInt(items.contractStatus, 10) >= 60 && items.paymentStatus === '100'">待付款</p>
            <p v-if="parseInt(items.contractStatus, 10) >= 60 && items.paymentStatus === '101'">付款完成</p>
          </li>
          <li class="label-6">
            <button v-if="parseInt(items.contractStatus, 10) >= 60 && items.paymentStatus === '100'" @click="goContractPayment(items.contractId)">订单付款</button>
            <button v-if="items.contractStatus === '50'" @click="goReceiptInvoice(items.contractId, 1)">确认</button>
          </li>
          <li class="label-7">
            <div v-if="items.deliveryStatus === '40' || items.deliveryStatus === '50'|| items.deliveryStatus === '90'" @click="deliveryNotice(items.contractId,items)" :id="items.contractId+'_notice'">
              <i v-if="items.deliveryNoticeIsRead === '2'" class="iconfont icon-Artboard"></i>
              <p v-if="items.deliveryNoticeIsRead === '2'">未读</p>
              <span>发货通知</span>
              <span class="el-icon-arrow-down"></span>
            </div>
          </li>
          <li class="label-8">
            <div v-if="items.deliveryStatus === '40' || items.deliveryStatus === '50'|| items.deliveryStatus === '90'" @click="deliveryInfo(items.contractId, items)" :id="items.contractId+'_info'">
              <i v-if="items.deliveryInfoIsRead === '2'" class="iconfont icon-Artboard"></i>
              <p v-if="items.deliveryInfoIsRead === '2'">未读</p>
              <span class="">发货信息</span>
              <span class="el-icon-arrow-down"></span>
            </div>
          </li>
        </ul>
        <div :id="items.contractId+'_notice_box'" class="delivery-notice">
          <ul class="notice-header">
            <li class="label-1">通知单号</li>
            <li class="label-2">商品名称</li>
            <li class="label-3">通知日期</li>
            <li class="label-4">预计到货时间</li>
            <li class="label-5">联系人</li>
            <li class="label-6">联系方式</li>
          </ul>
          <ul class="notice-body" v-for="item in items.noticeList">
            <li class="label-1">
              <div>
                <i v-if="item.isRead === '2'" class="iconfont icon-Artboard1"></i>
                <p v-if="item.isRead === '2'">未读</p>
                <span @click="goNoticeDetail(item.id,item.isRead)">{{item.code}}</span>
              </div>
            </li>
            <li class="label-2">{{`${item.itemName}(共${item.goodsNum}种)`}}</li>
            <li class="label-3">{{item.noticeDate | timeFormat('YYYY-MM-DD')}}</li>
            <li class="label-4">{{item.expectedDate | timeFormat('YYYY-MM-DD')}}</li>
            <li class="label-5">{{item.contact}}</li>
            <li class="label-6">{{item.contactPhone}}</li>
          </ul>
        </div>
        <div :id="items.contractId+'_info_box'" class="delivery-info">
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
                <i v-if="item.isRead === '2'" class="iconfont icon-Artboard1"></i>
                <p v-if="item.isRead === '2'">未读</p>
                <span @click="goDeliveryInfoDetail(item.id, 0, item.isRead)">{{item.code}}</span>
              </div>
            </li>
            <li class="label-2">{{item.itemName}}</li>
            <li class="label-3">{{item.deliverTime | timeFormat('YYYY-MM-DD')}}</li>
            <li class="label-4">{{`${item.address}(${item.customerName}) ${item.customerPhone}`}}</li>
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
                <div class="logistics" v-if="logistics.logisticsName != undefined">
                  <div class="title">
                    <span>{{logistics.logisticsName ? logistics.logisticsName : ''}}：{{logistics.logisticsCode}}</span>
                  </div>
                  <div class="list">
                    <ul v-for="obj in curLogisticsList">
                      <li>· {{obj.logisticsInfo}}</li>
                      <li>{{obj.logisticsTime | timeFormat('YYYY-MM-DD  HH:mm:ss')}}</li>
                    </ul>
                  </div>
                  <div class="bottom" v-if="curLogisticsList.length === 2 ">
                    <span>· 以上为最新跟踪信息</span>
                    <p @click="allLogisticsList">查看全部</p>
                  </div>
                </div>
                <p slot="reference" @click="getLogisticsList(item.id)">查看物流</p>
              </el-popover>
              <button v-if="item.status === '50'" @click="goDeliveryInfoDetail(item.id, 1, item.isRead)">签收</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!contractList.length" class="no-data">
        <p class="img"></p>
        <p class="des">您还没有订单哟~</p>
      </div>
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

<script>
  import { getUserInfo } from '@/utils/auth'
  import * as funSets from '@/api/person/buyer/contract'
  export default {
    data () {
      return {
        navList: [
          {
            name: '所有订单',
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
            name: '待付款',
            index: '4'
          },
          {
            name: '已发货',
            index: '5'
          },
          {
            name: '待签收',
            index: '6'
          },
          {
            name: '已签收',
            index: '7'
          }
        ],
        activeIndex: '1',
        // 筛选参数
        params: {
          userId: getUserInfo().userId,
          companyId: getUserInfo().customerId, // 企业id
          keyword: '', // 搜索关键字
          contractStartDate: '',
          contractEndDate: '',
          contractStatus: '', // 订单状态
          paymentStatus: '', // 支付状态（需要付款状态）
          DeliveryStatus: '', // 发货状态(供应商发货及签状态)
          pageNo: 1, // 当前页码
          pageSize: 15
        },
        // 日期校验
        time: {
          startPickerOptions: {
            disabledDate: (val) => {
              if (this.params.contractEndDate !== null && this.params.contractEndDate !== '' && this.params.contractEndDate !== undefined) {
                return val.getTime() > this.params.contractEndDate
              }
            }
          },
          endPickerOptions: {
            disabledDate: (val) => {
              if (this.params.contractStartDate !== null) {
                return val.getTime() < this.params.contractStartDate
              }
            }
          }
        },
        // 派发单列表
        contractList: [
          // {
          //   contractId: '213123dd', // 订单ID
          //   contractCode: 'SE1802060938457689', // 采购订单号
          //   projectName: '杭州商业大厦项目', // 项目名称
          //   contractDate: '2018-01-11', // 订单日期
          //   contractName: '中瑞国际大厦采购21台客厅，可以满足13个人乘坐，载重体重', // 订单名称
          //   contractAmount: '100,000,000.00', // 订单金额
          //   deliveryStartDate: '2018-02-03', // 预交付开始日期
          //   deliveryEndDate: '2018-02-09', // 预交付结束日期
          //   paidAmount: '10000000000', // 已付金额
          //   contractStatus: '50', // 订单状态
          //   paymentStatus: '30', // 支付状态
          //   deliveryStatus: '', // 发货状态
          //   deliveryNoticeIsRead: '1', // 发货通知状态
          //   deliveryInfoIsRead: '0' // 发货信息状态
          // },
          // {
          //   contractId: '2123dd', // 订单ID
          //   contractCode: 'SE1802060938457689', // 采购订单号
          //   projectName: '杭州商业大厦项目', // 项目名称
          //   contractDate: '2018-01-11', // 订单日期
          //   contractName: '中瑞国际大厦采购21台客厅，可以满足13个人乘坐，载重体重', // 订单名称
          //   contractAmount: '100,000,000.00', // 订单金额
          //   deliveryStartDate: '2018-02-03', // 预交付开始日期
          //   deliveryEndDate: '2018-02-09', // 预交付结束日期
          //   paidAmount: '10000000000', // 已付金额
          //   contractStatus: '55', // 订单状态
          //   paymentStatus: '', // 支付状态
          //   deliveryStatus: '', // 发货状态
          //   deliveryNoticeIsRead: '0', // 发货通知状态
          //   deliveryInfoIsRead: '1' // 发货信息状态
          // },
          // {
          //   contractId: '23123dd', // 订单ID
          //   contractCode: 'SE1802060938457689', // 采购订单号
          //   projectName: '杭州商业大厦项目', // 项目名称
          //   contractDate: '2018-01-11', // 订单日期
          //   contractName: '中瑞国际大厦采购21台客厅，可以满足13个人乘坐，载重体重', // 订单名称
          //   contractAmount: '100,000,000.00', // 订单金额
          //   deliveryStartDate: '2018-02-03', // 预交付开始日期
          //   deliveryEndDate: '2018-02-09', // 预交付结束日期
          //   paidAmount: '10000000000', // 已付金额
          //   contractStatus: '60', // 订单状态
          //   paymentStatus: '100', // 支付状态
          //   deliveryStatus: '40', // 发货状态
          //   deliveryNoticeIsRead: '1', // 发货通知状态
          //   deliveryInfoIsRead: '0' // 发货信息状态
          // },
          // {
          //   contractId: '21313dd', // 订单ID
          //   contractCode: 'SE1802060938457689', // 采购订单号
          //   projectName: '杭州商业大厦项目', // 项目名称
          //   contractDate: '2018-01-11', // 订单日期
          //   contractName: '中瑞国际大厦采购21台客厅，可以满足13个人乘坐，载重体重', // 订单名称
          //   contractAmount: '100,000,000.00', // 订单金额
          //   deliveryStartDate: '2018-02-03', // 预交付开始日期
          //   deliveryEndDate: '2018-02-09', // 预交付结束日期
          //   paidAmount: '10000000000', // 已付金额
          //   contractStatus: '20', // 订单状态
          //   paymentStatus: '100', // 支付状态
          //   deliveryStatus: '40', // 发货状态
          //   deliveryNoticeIsRead: '1', // 发货通知状态
          //   deliveryInfoIsRead: '1' // 发货信息状态
          // },
        ],
        totalSize: 0, // 总条数
        // 发货通知单列表
        noticeList: [
          // {
          //   id: '123',
          //   code: '1233212',
          //   itemName: '棺材',
          //   noticeDate: '2018-03-03',
          //   expectedDate: '2018-04-04',
          //   contact: '小泽玛利亚',
          //   contactPhone: '13112344321',
          //   isRead: '1'
          // },
          // {
          //   id: '123',
          //   code: '1233212',
          //   itemName: 'DEVON/大有 18V 锂电冲击起子机 5228-Li-锂电快12V 1.5Ah/ 双电塑盒装(共20种)',
          //   noticeDate: '2018-03-03',
          //   expectedDate: '2018-04-04',
          //   contact: '小泽玛利亚',
          //   contactPhone: '13112344321',
          //   isRead: '0'
          // },
          // {
          //   id: '123',
          //   code: '1233212',
          //   itemName: '棺材',
          //   noticeDate: '2018-03-03',
          //   expectedDate: '2018-04-04',
          //   contact: '小泽玛利亚',
          //   contactPhone: '13112344321',
          //   isRead: '1'
          // }
        ],
        // 发货单信息列表
        infoList: [],
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
    },
    mounted () {
      this.findContractList()
    },
    computed: {
    },
    methods: {
      // 点击搜索
      search() {
        this.params.pageNo = 1
        this.findContractList()
      },
      // 切换方案状态时函数
      handleSelect (key) {
        this.params.pageNo = 1
        switch (key) {
          case '1':
            this.params.contractStatus = ''
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = ''
            break
          case '2':
            this.params.contractStatus = '50'
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = ''
            break
          case '3':
            this.params.contractStatus = '55'
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = ''
            break
          case '4':
            this.params.paymentStatus = '100'
            this.params.contractStatus = '60'
            this.params.DeliveryStatus = ''
            break
          case '5':
            this.params.contractStatus = ''
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = '40'
            break
          case '6':
            this.params.contractStatus = ''
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = '50'
            break
          case '7':
            this.params.contractStatus = ''
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = '90'
            break
          default:
            this.params.contractStatus = ''
            this.params.paymentStatus = ''
            this.params.DeliveryStatus = ''
        }
        this.findContractList()
      },
      // 获取供方派发单列表
      findContractList(pageChange) {
        if (pageChange !== 1) {
          this.params.pageNo = 1
        }
        let startTime = new Date(this.params.contractStartDate).getTime()
        let endTime = new Date(this.params.contractEndDate).getTime()
        if (!startTime) {
          startTime = null
        }
        if (!endTime) {
          endTime = null
        }
        this.params.contractStartDate = startTime
        this.params.contractEndDate = endTime
        funSets.findContractList(this.params).then(
          res => {
            // if (data.code === 200) {
            //   this.contractList = data.data.contractList
            //   this.totalSize = data.data.totalSize
            // }
            let data = res.data
            if (data.code === 200) {
              this.totalSize = data.data.totalSize
              let list = data.data.contractList
              for (let i = 0; i < list.length; i++) {
                list[i].infoList = []
                list[i].noticeList = []
              }
              this.contractList = list
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 翻页函数
      pageChange(pageNum) {
        this.params.pageNo = pageNum
        this.findContractList(1)
      },
      // 查看发货通知信息
      deliveryNotice(id, items) {
        let noticeDiv = document.getElementById(`${id}_notice`)
        let noticeSpan = noticeDiv.lastChild
        let noticeBox = document.getElementById(`${id}_notice_box`)

        let infoDiv = document.getElementById(`${id}_info`)
        let infoSpan = infoDiv.lastChild
        let infoBox = document.getElementById(`${id}_info_box`)

        let params = {
          userId: this.params.userId,
          companyId: this.params.companyId,
          contractId: id
        }
        if (noticeSpan.className === 'el-icon-arrow-down') {
          noticeSpan.className = 'el-icon-arrow-up'
          infoSpan.className = 'el-icon-arrow-down'
          noticeBox.style.display = 'block'
          infoBox.style.display = 'none'
          funSets.findDeliverNoticeList(params).then(
            res => {
              let data = res.data
              if (data.code === 200) {
                items.noticeList = data.data
              }
            }
          ).catch(
            err => {
              this.$message.error(err)
            }
          )
        } else {
          noticeSpan.className = 'el-icon-arrow-down'
          noticeBox.style.display = 'none'
        }
      },
      // 查看发货信息
      deliveryInfo(id, items) {
        let noticeDiv = document.getElementById(`${id}_notice`)
        let noticeSpan = noticeDiv.lastChild
        let noticeBox = document.getElementById(`${id}_notice_box`)

        let infoDiv = document.getElementById(`${id}_info`)
        let infoSpan = infoDiv.lastChild
        let infoBox = document.getElementById(`${id}_info_box`)
        let params = {
          userId: this.params.userId,
          companyId: this.params.companyId,
          contractId: id
        }
        if (infoSpan.className === 'el-icon-arrow-down') {
          infoSpan.className = 'el-icon-arrow-up'
          noticeSpan.className = 'el-icon-arrow-down'
          infoBox.style.display = 'block'
          noticeBox.style.display = 'none'
          funSets.findDeliverInfoList(params).then(
            res => {
              let data = res.data
              if (data.code === 200) {
                items.infoList = data.data
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
      // 获取物流信息列表
      getLogisticsList(deliverInfoId) {
        this.logistics = {}
        let params = {
          userId: this.params.userId,
          deliverInfoId: deliverInfoId // id
        }
        funSets.findLogisticsList(params).then(
          res => {
            let data = res.data
            if (data.code === 200) {
              if (data.data) {
                this.logistics = data.data
              } else {
                return
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
      // 跳转至订单详情
      goReceiptInvoice(contractId, btn) {
        this.$router.push({
          path: 'contract/receiptInvoice',
          query: {
            contractId: contractId,
            btn: btn
          }
        })
      },
      // 跳转至订单付款
      goContractPayment(contractId) {
        this.$router.push({
          path: 'contract/payment',
          query: {
            contractId: contractId,
          }
        })
      },
      // 跳转至发货通知单详情
      goNoticeDetail(deliveryNoticeId, isRead) {
        this.$router.push({
          path: 'contract/noticeOfInvoice',
          query: {
            deliveryNoticeId: deliveryNoticeId,
            isRead: isRead
          }
        })
      },
      // 跳转至发货信息详情
      goDeliveryInfoDetail(id, btn, isRead) {
        this.$router.push({
          path: 'contract/delivery/detail',
          query: {
            deliveryHeadId: id,
            btn: btn,
            isRead: isRead
          }
        })
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  @import "./contractList.scss";
</style>
