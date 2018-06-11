<template>
  <section class="identify-check-page">
    <header class="identify-check-header">
      <h3 class="check-header-title">
        供方入驻信息登记
      </h3>
      <p class="check-header-text">
        提醒：填写过程请勿关闭浏览器或刷新页面，避免填写信息或上传附件丢失
      </p>
    </header>
    <!--<el-form class="check-form-list" :rules="rules" ref="form" :model="temp" label-width="130px">-->
      <!--<el-form-item class="check-form-item" :label="'企业名称：'" prop="companyName">-->
        <!--<el-input v-model.trim="temp.companyName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'企业类别：'" prop="companyType">-->
        <!--&lt;!&ndash;<el-input v-model.trim="temp.companyType"></el-input>&ndash;&gt;-->
        <!--<el-select class="filter-item" v-model.trim="temp.companyType" placeholder="Please select">-->
          <!--<el-option v-if="companyTypeList.length" v-for="item in companyTypeList" :key="item.id" :label="item.name" :value="item.name">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'企业联系人：'" prop="contacts">-->
        <!--<el-input v-model.trim="temp.contacts"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'联系人职务：'" prop="position">-->
        <!--<el-input v-model.trim="temp.position"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'企业联系人电话：'" prop="contacts">-->
        <!--<el-input v-model.trim="temp.contactNumber"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'经营区域：'" prop="businessArea">-->
        <!--<el-input v-model.trim="temp.businessArea"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'经营品类：'" prop="businessCategory">-->
        <!--<el-input v-model.trim="temp.businessCategory"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'主营产品：'" prop="mainProduct">-->
        <!--<el-input v-model.trim="temp.mainProduct"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'品牌：'" prop="brand">-->
        <!--<el-input v-model.trim="temp.brand"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'企业联系人电话：'" prop="contacts">-->
        <!--<el-input v-model.trim="temp.contactNumber"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item class="check-form-item" :label="'企业联系人电话：'" prop="contacts">-->
        <!--<el-input v-model.trim="temp.contactNumber"></el-input>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <ul class="check-form-list undeline">
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text">企业名称：</span>
        </div>
        <input class="form-item-input" type="text" placeholder="请输入企业名称" >
        <span class="form-item-warn">请输入企业名称</span>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text">企业类别：</span>
        </div>
        <select class="form-item-input form-item-select">
          <option v-for="type in companyTypeList" :value="type.id">{{ type.name }}</option>
        </select>
        <span class="form-item-warn">请输入企业类别</span>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 企业联系人：</span>
        </div>
        <input class="form-item-input" type="text" placeholder="请输入姓名" >
        <span class="form-item-warn">请输入企业类别</span>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 联系人职务：</span>
        </div>
        <input class="form-item-input" type="text" placeholder="请输入联系人职务" >
        <span class="form-item-warn">请输入企业类别</span>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 企业联系人电话：</span>
        </div>
        <input class="form-item-input" type="text" placeholder="手机／固定电话" >
        <span class="form-item-warn">请输入企业类别</span>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 主营产品：</span>
        </div>
        <textarea class="form-item-input form-item-textarea" name="" id="" cols="30" rows="10" placeholder="公司主营产品信息，多个产品，逗号分隔填写"></textarea>
        <span class="form-item-warn">请输入企业类别</span>
      </li>
    </ul>
    <ul class="check-form-list">
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 企业联系人：</span>
        </div>
        <ul class="form-card-list">
          <li class="form-card-item left" :class="{ active: type === 0 }" @click="changeType(0)">多证合一</li>
          <li class="form-card-item right" :class="{ active: type === 1 }" @click="changeType(1)">营业执照+税务登记证+组织机构代码证</li>
        </ul>
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text">  统一社会信用代码：</span>
        </div>
        <input class="form-item-input" type="text" placeholder="输入18位统一社会信用代码" >
      </li>
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text">营业执照：</span>
        </div>
        <div class="form-item-file" @click="uploadFile()">上传附件</div>
        <span class="form-file-desc">*支持：pdf，.png，.jpg，.jpeg，仅支持上传一个文件，最大上传空间10M</span>
        <input ref="fileUpload" type="file" style="display: none;" @change="fileChanged($event)">
      </li>
      <li class="check-form-item">
        <div class="form-left-label"></div>
        <div class="form-progress-block">
          <div class="progress-top-part">
            <p class="progress-file-name">bt143ddkac1938452332452.png</p>
            <p class="progress-percent-num">{{ percentage }}%</p>
          </div>
          <div class="progress-line-part">
            <span class="progress-active-line" :style="{ width: percentage + '%' }"></span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 提交按钮 -->
    <div class="form-submit-btn" @click="changeRoute('result')">提交</div>
  </section>
</template>

<script>
  import { getCompanyTypeList } from '@/api/person/identification'
  import Axios from 'axios'
  export default {
    name: 'indenficationIntro',
    data () {
      return {
        type: 0,
        percentage: 33,
        // 提交的form对象
        temp: {
          companyName: '', // 企业名称
          companyType: '', // 企业类型
          contacts: '', // 联系人
          position: '', // 联系人职务
          contactNumber: '', // 联系电话
          businessArea: '', // 经营区域
          businessCategory: '', // 经营品类
          mainProduct: '', // 主营产品
          brand: '', // 品牌
        },
        // 用户类型
        customerType: 'A44',
        // 公司类型列表
        companyTypeList: [],
        // 表单规则
        rules: {
          companyName: [{
            required: true,
            message: '请输入企业名称',
            trigger: 'change'
          }],
          companyType: [{
            required: true,
            message: '请选择企业类型',
            trigger: 'change'
          }],
          contacts: [{
            required: true,
            message: '请输入企业联系人',
            trigger: 'change'
          }],
          position: [{
            required: true,
            message: '请输入联系人职务',
            trigger: 'change'
          }],
          contactNumber: [{
            required: true,
            message: '请输入联系电话',
            trigger: 'change'
          }]
        }
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      /*
      * 加载数据
      * */
      loadData () {
        getCompanyTypeList({
          customerType: this.customerType
        }).then(res => {
          this.companyTypeList = res.data.data
        }, err => {
          console.log('err', err)
        })
      },
      /*
      * 切換证件类型
      * */
      changeType (type) {
        this.type = type
      },
      /*
      * 上传附件
      * */
      uploadFile () {
        this.$refs.fileUpload.click()
      },
      /*
      * 切换路由
      * */
      changeRoute (path) {
        this.$router.push({
          path: path
        })
      },
      /*
      * 文件上传完毕
      * */
      fileChanged (event) {
        let file = event.target.files[0]
        let formData = new window.FormData()
        formData.append('file', file, file.name)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        Axios.post(this.FileUploadUrl ,formData, config).then(res => {
        }, err => {
          console.log('err', err)
        })
      }
    }
  }
</script>

<style lang="sass">
  @import "./index"
</style>
