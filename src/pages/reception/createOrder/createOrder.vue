<template>
  <div class="color-bg">
    <div class="logo-color">
      <div class="seacrh clearfix">
        <div class="log f-l">
          <router-link :to="{path: '/'}"><img src="/static/img/logo2x.86248df.png" alt="" width="100%"></router-link>
        </div>
      </div>
    </div>
    <div class="create-order">

      <div class="nav">
        <img src="./../../../assets/reception/createOrder/step.png" alt="">
      </div>
      <div class="order" v-if="finish===false">
        <div class="data">
          <div class="title">交付说明：</div>
          <div class="info">
            <div class="line">
              <div class="name"><span>*</span>收货地址</div>
              <div>
                <el-select v-model="province" @change="provinceChoose" placeholder="省份">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="city" @change="cityChoose" placeholder="城市" :disabled="cityDisabled">
                  <el-option
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="area" placeholder="区域/乡镇" :disabled="areaDisabled">
                  <el-option
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input class="address" v-model="addressDetail" placeholder="详细地址"></el-input>
              </div>
            </div>
            <div class="line">
              <div class="clearfix">
                <div class="contract"><span>*</span>收货人姓名</div>
                <el-input class="contract-input" v-model="contactName" placeholder="请输入收货人姓名"></el-input>
                <div class="contract"><span>*</span>收货人联系方式</div>
                <el-input class="contract-input" v-model="contactPhone" placeholder="请输入收货人联系方式"></el-input>
                <div class="name"><span>*</span>交付期限截止到</div>
                <el-date-picker
                  class="dead-line"
                  v-model="deadline"
                  :editable="false"
                  :picker-options="time"
                  type="date"
                  placeholder="YYYY-MM-DD">
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div class="data">
          <div class="title">采购信息：</div>
          <div class="data-list" v-for="item in data">
            <div class="order">
              <div class="title">
                <div class="name">{{ item.name }}（商品编码：{{ item.code }}）</div>
                <div class="number">数量：{{ item.number }}</div>
                <div class="price">参考价格：￥{{ item.unitPrice | showPriceToTwoDecimal }} </div>
              </div>
              <div class="tec-data">
                <div class="name">技术参数：</div>
                <div class="tec-detail">
                  <el-table
                    empty-text="暂无技术参数"
                    :data="item.param"
                    style="width: 100%"
                    stripe
                    :show-header="false"
                  >
                    <el-table-column
                      prop="key1"
                      width="99">
                    </el-table-column>
                    <el-table-column
                      prop="value1"
                      width="179">
                    </el-table-column>
                    <el-table-column
                      prop="key2"
                      width="99">
                    </el-table-column>
                    <el-table-column
                      prop="value2"
                      width="179">
                    </el-table-column>
                    <el-table-column
                      prop="key3"
                      width="99">
                    </el-table-column>
                    <el-table-column
                      prop="value3"
                      width="179">
                    </el-table-column>
                    <el-table-column
                      prop="key4"
                      width="99">
                    </el-table-column>
                    <el-table-column
                      prop="value4">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="create" :class="fixFit ? 'fix-fit' : ''" v-loading="loading">
          <div class="tel-info">
            <el-button size="mini">在线咨询</el-button>
            <i class="el-icon-phone"></i>
            <span class="tel">400-826-7880</span>
          </div>
          <div class="amount">数量：<span>{{ totalNum }}</span></div>
          <div class="price">
            <div class="title">总计金额：</div>
            <div class="total-price" v-if="totalPrice === '议价'">￥{{ totalPrice }}</div>
            <div class="total-price" v-else>￥{{ totalPrice | showPriceToTwoDecimal }}</div>
          </div>
          <div class="enter" @click="submitFrom">提交订单</div>
        </div>
      </div>
      <div class="finish" v-if="finish">
        <div class="form-result">
          <div class="title">
            <i class="el-icon-circle-check-outline"></i>
            <span class="name">订单已提交</span>
          </div>
          <div class="contact">万郡绿建会在<span class="hours">24小时内</span>与您确认订单信息，请确保联系人手机畅通</div>
        </div>
        <div class="order-info">
          <div class="order-title">订单号：<span>{{ orderNum }}</span></div>
          <div class="order-detail">订购商品：<span>{{ orderDetail }}</span></div>
          <div v-if="more">......</div>
          <div class="more-order">
            <div class="more" @click="loadMore">查看订单详情</div>
            <div class="contact" @click="loadContact">查看企业联系人信息</div>
          </div>
        </div>
        <div class="number">订单中心客服电话 400-826-7880</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { fetchCityList } from '@/api/reception/order/cityList'
  import { fetchCartList, fetchBatchOrder } from '@/api/reception/cart/cart'
  import { fetchAddOrder } from '@/api/reception/order/order'
  import { getItemBaseInfo, getSkuAttributeList } from '@/api/reception/goodsDetail'
  import { getUserInfo } from '@/utils/auth'
  import { phone } from '@/api/common/checkout'
  import moment from 'moment'
  export default {
    name: 'createOrder',
    data () {
      return {
        time: {
          disabledDate: (val) => {
            return val.getTime() < new Date() - 86400000
          }
        },
        provinceList: [],
        cityList: [],
        areaList: [],
        province: '',
        city: '',
        area: '',
        addressDetail: '',
        deadline: '',
        loadingCity: null,
        fixFit: false,
        data: [
          {
            name: '品牌超高层（>21L）商用楼宇jumplift跃层电梯',
            code: '391926709',
            number: '1',
            subTotal: '99',
            SPEC_CONTENTS: [],
            param: []
          }
        ],
        totalNum: '88',
        totalPrice: '99',
        finish: false,
        orderNum: '1000143435439090045',
        orderDetail: '超高层（>21L）商用楼宇jumplift跃层电梯（商品编码：391926709）',
        more: true,
        cityDisabled: true,
        areaDisabled: true,
        allList: [],
        loading: false,
        areaCode: '',
        contactName: '',
        contactPhone: ''
      }
    },
    created () {
      // 获取地址
      fetchCityList().then((res) => {
        const data = res.data.data
        this.allList = data
        const allList = this.allList
        for (let i = 0; i < allList.length; i++) {
          this.provinceList.push(
            {
              'value': i,
              'id': allList[i].id,
              'label': allList[i].name
            }
          )
        }
      })

      const num = this.$route.query.num
      const itemId = this.$route.query.itemId
      const areaCode = this.$route.query.areaCode
      if (num && itemId && areaCode) {
        // 立即下单
        this.data[0].number = num
        this.totalNum = num
        // 获取商品信息
        getItemBaseInfo({ itemId, areaCode, userId: getUserInfo().userId }).then((res) => {
          const data = res.data.data
          this.data[0].name = data.itemInfo.name
          // 将技术参数加载商品名称后面
          if (data.itemInfo.attributes && data.itemInfo.attributes.length) {
            data.itemInfo.attributes.forEach(attribute => {
              attribute.values.forEach(item => {
                if (item.selected) {
                  this.data[0].name += ` ${item.name}`
                }
              })
            })
          }
          if (data.itemInfo.memberPrice) {
            if (data.itemInfo.memberPrice === -1) {
              this.data[0].unitPrice = '议价'
              this.totalPrice = '议价'
            } else {
              this.data[0].unitPrice = data.itemInfo.memberPrice
              this.totalPrice = num * data.itemInfo.memberPrice
            }
          } else {
            if (data.itemInfo.price === -1) {
              this.data[0].unitPrice = '议价'
              this.totalPrice = '议价'
            } else {
              this.data[0].unitPrice = data.itemInfo.unitPrice
              this.totalPrice = num * data.itemInfo.price
            }
          }
          this.data[0].code = data.itemInfo.itemNum
        })
        // 获取商品参数
        getSkuAttributeList({ itemId }).then((res) => {
          const data = res.data.data
          if (data[0] !== '无商品技术参数') {
            for (let i = 0; i < data.length; i += 4) {
              this.data[0].param.push({
                'key1': data[i] ? data[i].attributeName : '',
                'value1': data[i] ? data[i].attributeValue : '',
                'key2': data[i + 1] ? data[i + 1].attributeName : '',
                'value2': data[i + 1] ? data[i + 1].attributeValue : '',
                'key3': data[i + 2] ? data[i + 2].attributeName : '',
                'value3': data[i + 2] ? data[i + 2].attributeValue : '',
                'key4': data[i + 3] ? data[i + 3].attributeName : '',
                'value4': data[i + 3] ? data[i + 3].attributeValue : ''
              })
            }
          }
        })
      } else {
        // 获取购物车列表
        fetchCartList({ userId: getUserInfo().userId, advanceOrderId: this.$route.query.id }).then((res) => {
          const data = res.data.data
          this.totalNum = data.count
          this.totalPrice = data.totalPrice
          let newData = []
          for (let i = 0; i < data.cartItemLineListDTOList.length; i++) {
            for (let j = 0; j < data.cartItemLineListDTOList[i].items.length; j++) {
              newData.push(data.cartItemLineListDTOList[i].items[j])
            }
          }
          this.data = newData
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].unitPrice === -1) {
              this.data[i].unitPrice = '议价'
              this.totalPrice = '议价'
            }
          }
          // this.data.subTotal === '-1'
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].param = []
          }
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].params !== null) {
              for (let j = 0; j < this.data[i].params.length; j += 4) {
                this.data[i].param.push({
                  'key1': this.data[i].params[j] ? this.data[i].params[j].attributeName : '',
                  'value1': this.data[i].params[j] ? this.data[i].params[j].attributeValue : '',
                  'key2': this.data[i].params[j + 1] ? this.data[i].params[j + 1].attributeName : '',
                  'value2': this.data[i].params[j + 1] ? this.data[i].params[j + 1].attributeValue : '',
                  'key3': this.data[i].params[j + 2] ? this.data[i].params[j + 2].attributeName : '',
                  'value3': this.data[i].params[j + 2] ? this.data[i].params[j + 2].attributeValue : '',
                  'key4': this.data[i].params[j + 3] ? this.data[i].params[j + 3].attributeName : '',
                  'value4': this.data[i].params[j + 3] ? this.data[i].params[j + 3].attributeValue : ''
                })
              }
            }
          }
        })
      }
    },
    methods: {
      submitFrom() {
        this.loading = true
        const { num, itemId, areaCode } = this.$route.query
        const leadTime = moment(this.deadline).valueOf()
        const province = this.province !== '' ? this.provinceList[this.province].label : ''
        const provinceId = this.province !== '' ? this.provinceList[this.province].id : ''
        const city = (this.city !== '') ? this.cityList[this.city].label : ''
        const cityId = (this.city !== '') ? this.cityList[this.city].id : ''
        const area = (this.area !== '') ? this.areaList[this.area].label : ''
        const areaId = (this.area !== '') ? this.areaList[this.area].id : ''
        const address = this.addressDetail
        let contactName = this.contactName
        let contactPhone = this.contactPhone
        if (!this.addressDetail) {
          this.$message.error('详细地址不能为空')
          this.loading = false
          return
        }
        if (contactName === '') {
          this.$message.error('收货人不能为空')
          this.loading = false
          return
        }
        if (contactPhone === '') {
          this.$message.error('收货人联系方式不能为空')
          this.loading = false
          return
        }
        if (phone(contactPhone) !== true) {
          this.$message.error('请输入正确的手机号')
          this.loading = false
          return
        }
        if (this.deadline === '') {
          this.$message.error('交货日期不能为空')
          this.loading = false
          return
        }
        if (area === '' || this.addressDetail === '') {
          this.$message.error('地址不能为空')
          this.loading = false
          return
        }
        if (num && itemId && areaCode) {
          // 立即下单
          fetchAddOrder(
            {
              countryCode: 'CN',
              countryName: '中国',
              provinceName: province,
              cityName: city,
              areaName: area,
              provinceCode: provinceId,
              cityCode: cityId,
              areaId: areaId,
              address,
              postCode: '310000',
              itemId,
              leadTime,
              number: num,
              areaCode,
              userId: getUserInfo().userId,
              userName: getUserInfo().userName,
              customerCode: getUserInfo().companyCode,
              customerName: getUserInfo().companyName,
              contactName,
              contactPhone,
              customerId: getUserInfo().customerId,
              companyId: getUserInfo().companyId
            }
          ).then((res) => {
            this.loading = false
            if (res.data.code === 200) {
              const data = res.data.data
              this.orderNum = data.orderCode
              this.orderDetail = data.itemIdName
              this.more = false
              this.finish = true
            } else {
              this.$message({
                message: '下单失败！',
                type: 'error'
              })
            }
          })
        } else {
          // 批量下单
          fetchBatchOrder(
            {
              countryCode: 'CN',
              countryName: '中国',
              userId: getUserInfo().userId,
              userName: getUserInfo().userName,
              customerCode: getUserInfo().companyCode,
              customerName: getUserInfo().companyName,
              leadTime,
              provinceName: province,
              cityName: city,
              areaName: area,
              provinceCode: provinceId,
              cityCode: cityId,
              areaId,
              address,
              postCode: '310000',
              contactName,
              contactPhone,
              customerId: getUserInfo().customerId,
              companyId: getUserInfo().companyId,
              advanceOrderId: this.$route.query.id
            }).then((res) => {
            this.loading = false
            if (res.data.code === 200) {
              const data = res.data.data
              this.orderNum = data.orderCode
              this.orderDetail = data.itemList[0]
              data.itemList[1] ? this.more = true : this.more = false
              this.finish = true
            } else {
              this.$message({
                message: '下单失败！',
                type: 'error'
              })
            }
          })
        }
      },
      provinceChoose() {
        this.cityList = []
        if (this.cityDisabled) {
          this.cityDisabled = false
        }
        const allList = this.allList[this.province].cityListEntityList
        for (let i = 0; i < allList.length; i++) {
          this.cityList.push({
            'value': i,
            'id': allList[i].id,
            'label': allList[i].name
          })
        }
        if (this.loadingCity === null) {
        } else {
          this.cityChoose()
        }
      },
      cityChoose() {
        this.areaList = []
        if (this.areaDisabled) {
          this.areaDisabled = false
        }
        const allList = this.allList[this.province].cityListEntityList[this.city].cityListEntityList
        this.loadingCity = allList
        for (let i = 0; i < allList.length; i++) {
          this.areaList.push({
            'value': i,
            'id': allList[i].id,
            'label': allList[i].name
          })
        }
      },
      loadMore() {
        this.$router.push('/setting/buyer/requirement')
      },
      loadContact() {
        this.$router.push('/setting/accountSetting/')
      },
      handleScroll() {
        const maxHeight = window.document.body.scrollHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (maxHeight - scrollTop < 1200) {
          // relative
          this.fixFit = true
        } else {
          this.fixFit = false
        }
      }
    },
    mounted () {
      window.scroll(0, 1)
      const maxHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (maxHeight < 900) {
        this.fixFit = true
      }
      window.addEventListener('scroll', this.handleScroll)
    },
  }
</script>
<style lang="sass">
  @import "index"
</style>
