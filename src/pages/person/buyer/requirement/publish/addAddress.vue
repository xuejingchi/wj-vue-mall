<template>
  <div class="modify-address" v-loading.fullscreen.lock="loading">
    <div class="requirement-dialog-main">
      <el-dialog
        :title="'创建地址'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="address-form">
          <!--<div class="title">新增收货地址</div>-->
          <div class="form clearfix">
            <div class="name"><span>*</span>所在地区：</div>
            <div class="info">
              <el-select v-model="province" @change="provinceChoose(province)" placeholder="省份">
                <el-option
                  v-for="item in provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="city" @change="cityChoose(city)" placeholder="城市" :disabled="cityDisabled">
                <el-option
                  v-for="item in cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="area" @change="areaChoose(area)" placeholder="区域/乡镇" :disabled="areaDisabled">
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form clearfix" v-if="showWarningAddress">
            <div class="name"></div>
            <div class="warning"><i class="iconfont">&#xe724;</i> 请选择收货地址</div>
          </div>
          <div class="form clearfix">
            <div class="name"><span>*</span>详细地址：</div>
            <div class="info">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="建议如实填写收货地址，例如街道名称，门牌号码等信息"
                resize="none"
                :maxlength="50"
                v-model="textarea" @input="textareaChange">
              </el-input>
            </div>
          </div>
          <div class="form clearfix" v-if="showWarningAddressDetail">
            <div class="name"></div>
            <div class="warning"><i class="iconfont">&#xe724;</i> 请填写正确的收货地址</div>
          </div>
          <div class="form clearfix">
            <div class="name"><span>*</span>收货人：</div>
            <div class="info">
              <el-input class="input-normal" :maxlength="20" v-model="contacts" @input="contactsChange" placeholder="请输入收货人姓名"></el-input>
            </div>
          </div>
          <div class="form clearfix" v-if="showWarningContact">
            <div class="name"></div>
            <div class="warning"><i class="iconfont">&#xe724;</i> 请填写正确的收货人姓名</div>
          </div>
          <div class="form clearfix">
            <div class="name"><span>*</span>手机/座机：</div>
            <div class="info">
              <el-input class="input-normal" :maxlength="20" v-model="contactNumber" @input="contactNumberChange" type="number" placeholder="手机号码，电话号码 必填写一项"></el-input>
            </div>
          </div>
          <div class="form clearfix" v-if="showWarningTel">
            <div class="name"></div>
            <div class="warning"><i class="iconfont">&#xe724;</i> 请填写正确的手机/座机</div>
          </div>
          <div class="form clearfix">
            <div class="name"></div>
            <div class="info">
              <el-button type="primary" @click="saveInfo">保存</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    fetchCityList,
    fetchAddressById
  } from '@/api/reception/order/cityList'
  import { fetchModifyAddress } from '@/api/person/address/address'
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'modify-address',
    data() {
      return {
        loading: false,
        userInfo: getUserInfo(),
        dialogVisible: false,
        title: '收货地址',
        provinceList: [],
        cityList: [],
        areaList: [],
        provinceState: 0,
        cityState: 0,
        areaState: 0,
        province: '',
        city: '',
        area: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        addressDetail: '',
        cityDisabled: true,
        areaDisabled: true,
        textarea: '',
        allList: [],
        loadingCity: null,
        contacts: '',
        contactNumber: '',
        postCode: '',
        isDefault: false,
        showWarningAddress: false,
        showWarningAddressDetail: false,
        showWarningContact: false,
        showWarningTel: false
      }
    },
    created() {
      // 获取地址
      fetchCityList({id: '22'}).then((res) => {
        const data = res.data.data
        this.allList = data
        const allList = this.allList
        for (let i = 0; i < allList.length; i++) {
          this.provinceList.push(
            {
              'value': allList[i].id,
              'label': allList[i].name
            }
          )
        }

        // 编辑地址
        const id = this.$route.query.id
        if (id !== undefined) {
          fetchAddressById({userId: this.userInfo.userId, addressId: this.$route.query.id}).then((res) => {
            const data = res.data.data
            this.textarea = data.address
            this.contacts = data.contacts
            this.contactNumber = data.contactNumber
            this.postCode = data.postCode
            data.isDefault === '1' ? this.isDefault = true : this.isDefault = false
            this.provinceChoose(data.provinceCode)
            // this.provinceChoose('14')
            this.cityChoose(data.cityCode)
            // this.cityChoose('1405')
            this.areaChoose(data.areaCode)
            // this.areaChoose('140524')
          })
        }
      })
    },
    methods: {
      provinceChoose(val) {
        this.cityList = []
        if (this.cityDisabled) {
          this.cityDisabled = false
        }
        this.city = ''
        this.area = ''
        for (let i = 0; i < this.allList.length; i++) {
          if (this.allList[i].id === val) {
            this.provinceState = i
            this.province = this.allList[i].name
            this.provinceId = this.allList[i].id
          }
        }
        const allList = this.allList[this.provinceState].cityListEntityList
        for (let i = 0; i < allList.length; i++) {
          this.cityList.push({
            'value': allList[i].id,
            'label': allList[i].name
          })
        }
        if (this.loadingCity !== null) {
          this.cityChoose()
        }
      },
      cityChoose(val) {
        this.areaList = []
        if (this.areaDisabled) {
          this.areaDisabled = false
        }
        this.area = ''
        for (let i = 0; i < this.allList[this.provinceState].cityListEntityList.length; i++) {
          if (this.allList[this.provinceState].cityListEntityList[i].id === val) {
            this.cityState = i
            this.city = this.allList[this.provinceState].cityListEntityList[i].name
            this.cityId = this.allList[this.provinceState].cityListEntityList[i].id
          }
        }
        const allList = this.allList[this.provinceState].cityListEntityList[this.cityState].cityListEntityList
        this.loadingCity = allList
        for (let i = 0; i < allList.length; i++) {
          this.areaList.push({
            'value': allList[i].id,
            'label': allList[i].name
          })
        }
      },
      areaChoose(val) {
        for (let i = 0; i < this.allList[this.provinceState].cityListEntityList[this.cityState].cityListEntityList.length; i++) {
          if (this.allList[this.provinceState].cityListEntityList[this.cityState].cityListEntityList[i].id === val) {
            this.areaState = i
            this.area = this.allList[this.provinceState].cityListEntityList[this.cityState].cityListEntityList[i].name
            this.areaId = this.allList[this.provinceState].cityListEntityList[this.cityState].cityListEntityList[i].id
            this.showWarningAddress = false
            console.log('areaId: ', this.areaId)
          }
        }
      },
      textareaChange () {
        this.$nextTick(() => {
          if (this.textarea) {
            this.showWarningAddressDetail = false
          }
        })
      },
      contactsChange () {
        if (this.contacts) {
          this.showWarningContact = false
        }
      },
      contactNumberChange () {
        if (this.contactNumber && this.contactNumber.length > 10 && this.contactNumber.length < 14) {
          this.showWarningTel = false
        } else {
          this.showWarningTel = true
        }
      },
      saveInfo() {
        if (this.province === '' || this.city === '' || this.area === '') {
          this.showWarningAddress = true
          return
        }
        if (this.textarea === '') {
          this.showWarningAddressDetail = true
          return
        }
        if (this.contacts === '') {
          this.showWarningContact = true
          return
        }
        if (this.contactNumber === '') {
          this.showWarningTel = true
          return
        }
        const param = {
          address: this.textarea,
          addressId: this.$route.query.id,
          provinceCode: this.provinceId,
          cityCode: this.cityId,
          areaCode: this.areaId,
          provinceName: this.province,
          cityName: this.city,
          areaName: this.area,
          companyId: this.userInfo.companyId,
          contacts: this.contacts,
          contactNumber: this.contactNumber,
          isDefault: this.isDefault ? '1' : '0',
          postCode: this.postCode || '000000',
          userId: this.userInfo.userId,
          countryCode: 'CN',
          countryName: '中国'
        }
        this.loading = true
        fetchModifyAddress(param).then((res) => {
          this.loading = false
          if (res.data.code === 200) {
            this.$emit('addAddressSuccess')
          }
        }, () => {
          this.loading = false
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
<style lang="sass">
  @import "addAddress"
</style>
