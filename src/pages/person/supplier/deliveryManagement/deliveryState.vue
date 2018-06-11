<template>
  <div class="delivery-state">
    <el-steps :active="active" align-center class="up-step">
      <el-step class="step-item" :title="deliveryNoticeDate | timeFormat('YYYY-MM-DD HH:mm')" :class="{ 'step-active': status >= 10 }">
      </el-step>
      <el-step class="step-item" :title="deliveryDate | timeFormat('YYYY-MM-DD HH:mm')" :class="{ 'step-active': status >= 40 }">
      </el-step>
      <el-step class="step-item" :title="arrivalDate | timeFormat('YYYY-MM-DD HH:mm')" :class="{ 'step-active': status >= 50 }">
      </el-step>
      <el-step class="step-item" :title="signingTime | timeFormat('YYYY-MM-DD HH:mm')" :class="{ 'step-active': status >= 90 }">
      </el-step>
    </el-steps>
    <div class="table">
      <!--基础信息-->
      <div class="base-info clearfix">
        <div class="title">基础信息：</div>
        <div class="info">
          <div class="line clearfix">
            <div class="name">发货单号</div>
            <div class="value">{{ deliveryCode }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">发货日期</div>
            <div class="value">{{ deliveryDate | timeFormat('YYYY-MM-DD hh:mm') }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">发货通知号</div>
            <div class="value">{{ deliveryNoticeCode }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">销售订单号</div>
            <div class="value">{{ purchaseHeadId }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">收货地址</div>
            <div class="value">{{ address }}</div>
          </div>
        </div>
      </div>
      <!--物流信息-->
      <div class="base-info top-20 clearfix">
        <div class="title">
          物流信息：
        </div>
        <div class="info">
          <div class="line clearfix" v-if="logisticsType">
            <div class="name">物流公司</div>
            <div class="value">
              {{ logisticsName }}
            </div>
          </div>
          <div class="line clearfix" v-if="logisticsType">
            <div class="name">联系人</div>
            <div class="value">
              {{ contactName }}
            </div>
          </div>
          <div class="line clearfix">
            <div class="name">物流单号</div>
            <div class="value">
              {{ logisticsCode }}
            </div>
          </div>
          <div class="line clearfix">
            <div class="name">车号</div>
            <div class="value">
              {{ plateNumber }}
            </div>
          </div>
          <div class="line clearfix">
            <div class="name">司机/车队负责人</div>
            <div class="value">
              {{ plateContactName }} {{ plateContactTel }}
            </div>
          </div>
          <div class="line clearfix">
            <div class="name">物流跟踪</div>
            <div class="value">
              <div v-for="item in logisticsList">
                {{ item.dateTime | timeFormat('YYYY-MM-DD hh:mm') }}  {{ item.logisticInfo }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--发货信息-->
      <div class="delivery-info clearfix">
        <div class="title">
          发货信息：
        </div>
        <div class="info">
          <el-table
            :data="itemList"
            border
            style="width: 100%">
            <el-table-column
              prop="number"
              label="序号"
              width="45">
            </el-table-column>
            <el-table-column
              prop="itemName"
              label="商品名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌"
              width="60">
            </el-table-column>
            <el-table-column
              prop="parameters"
              label="技术参数"
              width="210">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量"
              width="63">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="58">
            </el-table-column>
            <el-table-column
              v-if="status === 40"
              prop="noticeQuantity"
              label="发运通知量"
              width="90">
            </el-table-column>
            <el-table-column
              prop="historyQuantity"
              label="实发量">
            </el-table-column>
            <el-table-column
              v-if="status >= 50"
              prop="realQuantity"
              label="签收量"
              width="80">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--备注-->
      <div class="remarks-info clearfix" v-if="remark">
        <div class="title">
          备注：
        </div>
        <div class="info">
          {{ remark }}
        </div>
      </div>
      <!--签收信息-->
      <div class="base-info top-20 clearfix" style="border-bottom: 0;" v-if="status === 90">
        <div class="title">
          签收备注：
        </div>
        <div class="info">
          <div class="line clearfix">
            <div class="name">签收时间</div>
            <div class="value">{{ signingTime | timeFormat('YYYY-MM-DD hh:mm') }}</div>
          </div>
          <div class="line clearfix" @click="DownloadFile(data.attachmentPath, data.attachmentName)">
            <div class="value" v-for="data in attachmentList"><span>{{ data.attachmentName }}</span></div>
          </div>
          <div class="line clearfix">
            <div class="value">{{ signingInfo }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getDeliveryInfo } from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  export default {
    data () {
      return {
        active: 0,
        status: 40,
        purchaseHeadId: '',
        deliveryCode: '',
        deliveryNoticeCode: '',
        deliveryDate: '',
        saleHeadId: '',
        address: '',
        logisticsWay: '车队/自有车辆',
        contactName: '',
        logisticsCompany: '',
        logisticsType: 0,
        plateContactName: '',
        plateContactTel: '',
        logisticsCode: '',
        plateNumber: '',
        signingTime: '',
        signingInfo: '',
        logisticsList: [],
        isSend: true,
        itemList: [
        ],
        remark: '',
        attachmentList: [],
        deliveryNoticeDate: '',
        arrivalDate: ''
      }
    },
    beforeMount () {
    },
    created() {
      const params = {
        companyId: getUserInfo().companyId,
        deliveryHeadId: this.$route.query.deliveryHeadId,
        deliveryNoticeId: this.$route.query.deliveryNoticeId,
        userId: getUserInfo().userId,
        companyName: getUserInfo().companyName,
        userName: getUserInfo().userName
      }
      getDeliveryInfo(params).then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data
          const status = parseInt(data.status, 10)
          let quantity = 0
          let noticeQuantity = 0
          let historyQuantity = 0
          let realQuantity = 0
          this.status = status
          this.deliveryNoticeDate = data.deliveryNoticeDate
          this.itemList = data.itemList
          if (status === 40) {
            this.active = 1
            for (let i = 0; i < this.itemList.length; i++) {
              noticeQuantity += this.itemList[i].noticeQuantity
            }
          } else if (status === 50) {
            this.active = 2
            for (let i = 0; i < this.itemList.length; i++) {
              realQuantity += this.itemList[i].realQuantity
            }
          } else {
            this.active = 3
            for (let i = 0; i < this.itemList.length; i++) {
              realQuantity += this.itemList[i].realQuantity
            }
          }
          [ this.purchaseHeadId, this.logisticsList, this.deliveryCode, this.deliveryDate, this.deliveryNoticeCode, this.saleHeadId, this.address, this.logisticsCode, this.plateNumber, this.plateContactTel, this.plateContactName, this.remark, this.signingTime, this.arrivalDate, this.signingInfo ] =
            [ data.purchaseHeadId, data.logisticsList, data.deliveryCode, data.deliveryDate, data.deliveryNoticeCode, data.saleHeadId, data.address, data.logisticsCode, data.plateNumber, data.plateContactTel, data.plateContactName, data.remark, data.signingTime, data.arrivalDate, data.signingInfo ]
          for (let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].number = i + 1
            quantity += this.itemList[i].quantity
            historyQuantity += this.itemList[i].historyQuantity
          }
          this.itemList.push({
            number: '合计',
            itemName: '',
            brandName: '',
            parameters: '',
            quantity,
            unit: '',
            noticeQuantity,
            historyQuantity,
            realQuantity
          })
          if (data.logisticsName === null) {
            this.logisticsType = 0
          } else {
            this.logisticsType = 1
            this.logisticsName = data.logisticsName
            this.contactName = data.contactName
          }
        }
      })
    },
    watch: {
    },
    methods: {
    },
    components: {
    }
  }
</script>
<style lang="sass">
  @import "./state"
</style>
