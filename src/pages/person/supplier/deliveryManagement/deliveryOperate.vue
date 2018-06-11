<template>
  <div class="delivery-state">
    <el-steps :active="active" align-center class="up-step">
      <el-step class="step-item" :title="deliveryNoticeDate | timeFormat('YYYY-MM-DD HH:mm')" :class="{ 'step-active': status >= 10 }">
      </el-step>
      <el-step class="step-item">
      </el-step>
      <el-step class="step-item">
      </el-step>
      <el-step class="step-item">
      </el-step>
    </el-steps>
    <div class="state-now">
      <div class="icon">
        <i class="iconfont warning">&#xe60c;</i>
      </div>
      <div class="detail">
        <div class="state">当前状态：待发货</div>
        <div class="operate">您可以 发货</div>
      </div>
    </div>
    <div class="table">
      <!--基础信息-->
      <div class="base-info clearfix">
        <div class="title">基础信息：</div>
        <div class="info">
          <div class="line clearfix">
            <div class="name">销售订单号</div>
            <div class="value">{{ purchaseHeadId }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">发货通知号</div>
            <div class="value">{{ deliveryNoticeCode }}</div>
          </div>
          <div class="line clearfix">
            <div class="name">收货地址</div>
            <div class="value">{{ address }}</div>
          </div>
        </div>
      </div>
      <!--物流信息-->
      <div class="logistics-info clearfix">
        <div class="title">
          物流信息：
        </div>
        <div class="info">
          <div class="line clearfix">
            <div class="name"><span>*</span>物流类型</div>
            <div class="value">
              <el-select v-model="logisticsWay" @change="chooseLogisticsType" placeholder="请选择">
                <el-option
                  v-for="item in logistics"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line clearfix" v-if="transportType === 2">
            <div class="name"><span>*</span>物流公司</div>
            <div class="value">
              <el-input v-model="transportCompany" placeholder="物流公司"></el-input>
              <span v-if="isTransportCompany">请填写正确的物流公司</span>
            </div>
          </div>
          <div class="line clearfix" v-if="transportType === 2">
            <div class="name"><span>*</span>联系人</div>
            <div class="value">
              <el-input v-model="transportContacts" placeholder="联系人"></el-input>
              <span v-if="isTransportContacts">请填写正确的联系人</span>
            </div>
          </div>
          <div class="line clearfix" v-if="transportType === 2">
            <div class="name"><span>*</span>联系方式</div>
            <div class="value">
              <el-input v-model="transportContactsPhone" placeholder="联系方式"></el-input>
              <span v-if="istTransportContactsPhone">请填写正确的联系方式</span>
            </div>
          </div>
          <div class="line clearfix">
            <div class="name"><span>*</span>物流单号</div>
            <div class="value">
              <el-input v-model="transportCode" placeholder="物流单号"></el-input>
              <span v-if="isTransportCode">请填写正确的物流单号</span>
            </div>
          </div>
          <div class="line clearfix">
            <div class="name"><span>*</span>车号</div>
            <div class="value">
              <el-input v-model="carShipNo" placeholder="车号"></el-input>
              <span v-if="isCarShipNo">请填写正确的车号</span>
            </div>
          </div>
          <div class="line clearfix">
            <div class="name"><span>*</span>司机/车队负责人</div>
            <div class="value">
              <el-input v-model="carContacts" placeholder="司机/车队负责人"></el-input>
              <span v-if="isCarContacts">请填写正确的司机/车队负责人</span>
            </div>
          </div>
          <div class="line clearfix">
            <div class="name"><span>*</span>手机</div>
            <div class="value">
              <el-input v-model="carContactsPhone" placeholder="司机电话"></el-input>
              <span v-if="isCarContactsPhone">请填写正确的司机电话</span>
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
              prop="noticeQuantity"
              label="发运通知量"
              width="90">
            </el-table-column>
            <el-table-column
              prop="historyQuantity"
              label="已发量"
              width="80">
            </el-table-column>
            <el-table-column
              label="实发量">
              <template slot-scope="scope">
                <el-input :disabled="scope.$index === itemList.length - 1" v-model="scope.row.realQuantity" @change="maxSend(scope)"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--备注-->
      <div class="remarks-info clearfix">
        <div class="title">
          备注：
        </div>
        <div class="info">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="deliveryRemark"
            :maxlength="500"
            resize="none">
          </el-input>
          <div class="num">{{ deliveryRemark.length }}/500</div>
        </div>
      </div>
      <!--发货btn-->
      <div class="sure-btn">
        <el-button type="primary" @click="submitDeliveryInfo">确认发货</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getDeliveryItem, submitDeliveryInfo } from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  export default {
    data () {
      return {
        userInfo: getUserInfo(),
        active: 0,
        status: 10,
        purchaseHeadId: '',
        deliveryNoticeCode: '',
        address: '',
        logisticsWay: '车队/自有车辆',
        transportContacts: '',
        logisticsCompany: '',
        transportType: 1,
        transportCompany: '',
        transportContactsPhone: '',
        fromType: '',
        fromCode: '',
        fromId: '',
        logistics: [
          {
            value: 1,
            label: '车队/自有车辆'
          },
          {
            value: 2,
            label: '其他'
          }
        ],
        transportCode: '',
        carShipNo: '',
        carContacts: '',
        carContactsPhone: '',
        isSend: true,
        itemList: [],
        deliveryRemark: '',
        isTransportCompany: false,
        isTransportCode: false,
        isCarShipNo: false,
        isCarContacts: false,
        isCarContactsPhone: false,
        isTransportContacts: false,
        istTransportContactsPhone: false,
        deliveryNoticeDate: '2017-04-18 18:20'
      }
    },
    beforeMount () {
    },
    mounted () {
      const params = {
        supplierId: this.userInfo.supplierId,
        deliveryNoticeId: this.$route.query.deliveryNoticeId,
        userId: this.userInfo.userId
      }
      getDeliveryItem(params).then((res) => {
        const data = res.data.data
        this.deliveryNoticeDate = data.deliveryNoticeDate
        if (res.data.code === 200) {
          [ this.purchaseHeadId, this.deliveryNoticeCode, this.address, this.itemList, this.fromType, this.fromCode, this.fromId ] = [ data.purchaseHeadId, data.deliveryNoticeCode, data.address, data.itemList, data.fromType, data.deliveryNoticeCode, data.deliveryNoticeId ]
          let quantity = 0
          let noticeQuantity = 0
          let historyQuantity = 0
          let realQuantity = 0
          for (let i = 0; i < data.itemList.length; i++) {
            data.itemList[i].historyQuantity = data.itemList[i].historyQuantity ? data.itemList[i].historyQuantity : 0
            data.itemList[i].realQuantity = parseInt(data.itemList[i].noticeQuantity, 10) - parseInt(data.itemList[i].historyQuantity, 10)
            quantity += data.itemList[i].quantity
            noticeQuantity += data.itemList[i].noticeQuantity
            historyQuantity += data.itemList[i].historyQuantity
            realQuantity += data.itemList[i].realQuantity
          }
          // 合计
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
        }
      })
    },
    computed: {
    },
    methods: {
      maxSend(val) {
        if (parseInt(val.row.noticeQuantity, 10) - parseInt(val.row.historyQuantity, 10) < parseInt(val.row.realQuantity, 10)) {
          this.itemList[val.$index].realQuantity = parseInt(val.row.noticeQuantity, 10) - parseInt(val.row.historyQuantity, 10)
        }
        let total = 0
        for (let i = 0; i < this.itemList.length - 1; i++) {
          total += parseInt(this.itemList[i].realQuantity, 10)
        }
        this.itemList[this.itemList.length - 1].realQuantity = total
      },
      chooseLogisticsType(val) {
        // 过滤获取type
        const type = this.logistics.filter(item => item.value === val)[0].value
        // 物流状态 1: 车队/自由车辆 2: 其他
        this.transportType = type
      },
      submitDeliveryInfo() {
        let params
        const type = this.transportType
        this.isTransportCode = false
        this.isTransportCompany = false
        this.isCarShipNo = false
        this.isCarContacts = false
        this.isCarContactsPhone = false
        this.isTransportContacts = false
        this.istTransportContactsPhone = false
        let subList = []
        for (let i = 0; i < this.itemList.length - 1; i++) {
          console.log(this.itemList[i].noticeQuantity)
          if (this.itemList[i].noticeQuantity === 0) {
            this.$message.error('请输入正确的实发量')
            return
          }
          subList.push({
            deliveryQuantity: this.itemList[i].realQuantity,
            fromLineId: this.itemList[i].deliveryNoticeLineId,
            fromLineCode: this.itemList[i].deliveryNoticeLineCode,
            noticeDeliveryQuantity: this.itemList[i].noticeQuantity
          })
        }
        if (this.transportCode === '') {
          this.isTransportCode = true
          return
        } else if (this.carShipNo === '') {
          this.isCarShipNo = true
          return
        } else if (this.carContacts === '') {
          this.isCarContacts = true
          return
        } else if (this.carContactsPhone === '') {
          this.isCarContactsPhone = true
          return
        }
        if (type === 1) {
          params = {
            userId: this.userInfo.userId,
            userName: this.userInfo.userName,
            transportType: this.transportType,
            transportCode: this.transportCode,
            carShipNo: this.carShipNo,
            carContacts: this.carContacts,
            carContactsPhone: this.carContactsPhone,
            deliveryRemark: this.deliveryRemark,
            fromType: this.fromType,
            subList: subList,
            fromCode: this.fromCode,
            fromId: this.fromId,
            transportCompany: this.userInfo.companyName,
            transportContacts: this.userInfo.userName,
            transportContactsPhone: this.userInfo.phoneNumber
          }
        } else if (type === 2) {
          if (this.transportContacts === '') {
            this.isTransportContacts = true
            return
          } else if (this.transportContactsPhone === '') {
            this.istTransportContactsPhone = true
            return
          } else if (this.transportCompany === '') {
            this.isTransportCompany = true
            return
          }
          params = {
            userId: this.userInfo.userId,
            userName: this.userInfo.userName,
            transportType: this.transportType,
            transportContacts: this.transportContacts,
            transportContactsPhone: this.transportContactsPhone,
            transportCompany: this.transportCompany,
            transportCode: this.transportCode,
            carShipNo: this.carShipNo,
            carContacts: this.carContacts,
            carContactsPhone: this.carContactsPhone,
            deliveryRemark: this.deliveryRemark,
            fromType: 'SOMNOTICE',
            subList: subList,
            fromCode: this.fromCode,
            fromId: this.fromId
          }
        }
        submitDeliveryInfo(params).then((res) => {
          if (res.data.code === 200) {
            this.$alert('发货成功', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                // 提交成功
                this.$router.replace({
                  path: '/setting/supplier/deliveryManagement'
                })
              }
            })
          }
        })
      }
    },
    components: {
    }
  }
</script>
<style lang="sass">
  @import "./state"
</style>
