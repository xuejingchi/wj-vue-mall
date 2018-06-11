<template>
  <section class="identify-check-page" v-loading.fullscreen.lock="loading">
    <header ref="header" class="identify-check-header">
      <h3 class="check-header-title">
        需方会员申请信息登记
      </h3>
      <p class="check-header-text">
        提醒：填写过程请勿关闭浏览器或刷新页面，避免填写信息或上传附件丢失
      </p>
      <img class="top-crown-img" src="./imgs/top_crown_bg@2x.png">
    </header>
    <ul class="check-form-list undeline">
      <li v-for="(item, index) in listItem" v-if="index < listItem.length - 1" class="check-form-item">
        <div class="form-left-label">
          <span v-if="item.required" class="form-label-must">*</span>
          <span class="form-label-text">{{ item.name }}：</span>
        </div>
        <input v-if="item.type === 'input'" v-model="temp[item.key]" class="form-item-input" type="text" :placeholder="item.placeholder" >
        <select ref="customerTypeSelect" v-if="item.type === 'select'" v-model="temp.customerType" class="form-item-input form-item-select">
          <option v-for="type in customerTypeList" :value="type.id">{{ type.name }}</option>
        </select>
        <textarea v-if="item.type === 'textarea'" v-model="temp[item.key]" :placeholder="item.placeholder" class="form-item-input form-item-textarea" name="" cols="30" rows="10"></textarea>
        <span v-if="readySubmit">
          <span v-if="item.rule" class="form-item-warn">{{ item.rule(temp[item.key]) }}</span>
        </span>
      </li>
    </ul>
    <!-- 证件 -->
    <ul class="check-form-list">
      <li class="check-form-item">
        <div class="form-left-label">
          <span class="form-label-must">*</span>
          <span class="form-label-text"> 企业证件：</span>
        </div>
        <ul class="form-card-list">
          <li class="form-card-item left" :class="{ active: type === 1 }" @click="changeType(1)">多证合一</li>
          <li class="form-card-item right" :class="{ active: type === 0 }" @click="changeType(0)">营业执照+税务登记证+组织机构代码证</li>
        </ul>
      </li>
      <!-- 多证合一 -->
      <div v-if="type === 1" class="form-card-wrapper">
        <!-- 执照编码 -->
        <li v-for="(item, index) in listItem" v-if="index === listItem.length - 1" class="check-form-item">
          <div class="form-left-label">
            <span v-if="item.required" class="form-label-must">*</span>
            <span class="form-label-text">{{ item.name }}：</span>
          </div>
          <input v-if="item.type === 'input'" v-model="newCreditCode" class="form-item-input" type="text" :placeholder="item.placeholder" >
          <span v-if="readySubmit">
            <span v-if="item.rule" class="form-item-warn">{{ item.rule(newCreditCode) }}</span>
          </span>
        </li>
        <!-- 图片列表 -->
        <div v-for="(item, index) in newLicenceList">
          <li class="check-form-item">
            <div class="form-left-label">
              <span class="form-label-must">*</span>
              <span class="form-label-text">{{ item.name }}：</span>
            </div>
            <div class="form-item-file" @click="uploadFile(item.attachmentType)">上传附件</div>
            <span class="form-file-desc">*支持：pdf，.png，.jpg，.jpeg，仅支持上传一个文件，最大上传空间10M</span>
          </li>
          <li v-if="item.progressing" class="check-form-item file-name-item">
            <div class="form-left-label"></div>
            <div class="form-progress-block">
              <div class="progress-top-part">
                <p v-show="item.imgName" class="progress-file-name" :class="{ fail: item.fail }">
                  <i style="margin-right: 5px; color: #4A90E2; font-size: 14px;" class="iconfont icon-fujian"></i>
                  {{ item.imgName }}
                  <span v-if="item.fail" class="form-item-warn">上传失败</span>
                  <i style="margin-left: 3px; cursor: pointer; color: #999; font-size: 8px; vertical-align: middle;" class="iconfont icon-guanbi1" @click="clearFileItem(item, index, newLicenceList, newImgList)"></i>
                </p>
                <p v-show="!item.progressEnd" class="progress-percent-num">{{ item.percentage }}%</p>
              </div>
              <div v-show="!item.progressEnd" class="progress-line-part">
                <span class="progress-active-line" :style="{ width: item.percentage + '%' }"></span>
              </div>
            </div>
          </li>
        </div>
      </div>
      <!-- 三证分开 -->
      <div v-if="type === 0" class="form-card-wrapper">
        <!-- 执照编码 -->
        <li v-for="(item, index) in listItem" v-if="index === listItem.length - 1" class="check-form-item">
          <div class="form-left-label">
            <span v-if="item.required" class="form-label-must">*</span>
            <span class="form-label-text">{{ item.name }}：</span>
          </div>
          <input v-if="item.type === 'input'" v-model="oldCreditCode" class="form-item-input" type="text" :placeholder="item.placeholder" >
          <span v-if="readySubmit">
            <span v-if="item.rule" class="form-item-warn">{{ item.rule(oldCreditCode) }}</span>
          </span>
        </li>
        <!-- 图片列表 -->
        <div v-for="(item, index) in oldLicenceList">
          <li class="check-form-item">
            <div class="form-left-label">
              <span class="form-label-must">*</span>
              <span class="form-label-text">{{ item.name }}：</span>
            </div>
            <div class="form-item-file" @click="uploadFile(item.attachmentType)">上传附件</div>
            <span class="form-file-desc">*支持：pdf，.png，.jpg，.jpeg，仅支持上传一个文件，最大上传空间10M</span>
          </li>
          <li v-if="item.progressing" class="check-form-item file-name-item">
            <div class="form-left-label"></div>
            <div class="form-progress-block">
              <div class="progress-top-part">
                <p v-show="item.imgName" class="progress-file-name" :class="{ fail: item.fail }">
                  <i style="margin-right: 5px; color: #4A90E2; font-size: 14px;" class="iconfont icon-fujian"></i>
                  {{ item.imgName }}
                  <span v-if="item.fail" class="form-item-warn">上传失败</span>
                  <i style="margin-left: 3px; cursor: pointer; color: #999; font-size: 8px; vertical-align: middle;" class="iconfont icon-guanbi1" @click="clearFileItem(item, index, oldLicenceList, oldImgList)"></i>
                </p>
                <p v-show="!item.progressEnd" class="progress-percent-num">{{ item.percentage }}%</p>
              </div>
              <div v-show="!item.progressEnd" class="progress-line-part">
                <span class="progress-active-line" :style="{ width: item.percentage + '%' }"></span>
              </div>
            </div>
          </li>
        </div>
      </div>
    </ul>
    <!-- 提交按钮 -->
    <div class="form-submit-btn" @click="doSubmit()">提交</div>
    <!-- 文件上传统一处理 -->
    <input ref="filecrmCompanyCreditCode" type="file" style="display: none;" @change="newFileChanged($event, 0)">
    <input ref="filecrmCompanyBusinessNo" type="file" style="display: none;" @change="oldFileChanged($event, 0)">
    <input ref="filecrmCompanyTaxNo" type="file" style="display: none;" @change="oldFileChanged($event, 1)">
    <input ref="filecrmCompanyOrgCode" type="file" style="display: none;" @change="oldFileChanged($event, 2)">
  </section>
</template>

<script>
  import { getCompanyTypeList, customerAuthentication } from '@/api/person/identification'
  import { getUserInfo } from '@/utils/auth'
  import Axios from 'axios'
  export default {
    name: 'indenficationIntro',
    data () {
      const baseRule = (name, maxLength) => {
        return value => {
          if (!value) {
            return `请输入${name}`
          }
          if (value.length > maxLength) {
            return `长度不可超过${maxLength}个字符`
          }
          return ''
        }
      }
      const UserInfo = getUserInfo()
      return {
        // 加载中
        loading: false,
        // 证件类型 新：1，旧：0
        type: 1,
        // 准备提交
        readySubmit: false,
        userInfo: UserInfo,
        // 提交的form对象
        temp: {
          userId: UserInfo.userId || 'b8080769b3ebcb74b5ff16a39a2fbaa0',
          userName: UserInfo.userName || 'b8080769b3ebcb74b5ff16a39a2fbaa0',
          companyName: '', // 企业名称
          customerType: '11', // 供方企业类型
          contacts: '', // 联系人
          position: '', // 联系人职务
          contactNumber: '', // 联系电话
          creditCode: '', // 统一社会信用代码或营业执照
          // certificateType: 1 // 证件类型
        },
        newCreditCode: '', // 新执照
        oldCreditCode: '', // 旧执照
        // 显示
        newLicenceList: [{
          name: '营业执照',
          attachmentType: 'crmCompanyCreditCode',
          percentage: 0,
          progressing: false
        }],
        oldLicenceList: [{
          name: '营业执照',
          attachmentType: 'crmCompanyBusinessNo',
          percentage: 0,
          progressing: false
        }, {
          name: '税务登记证',
          attachmentType: 'crmCompanyTaxNo',
          percentage: 0,
          progressing: false
        }, {
          name: '组织机构代码证',
          attachmentType: 'crmCompanyOrgCode',
          percentage: 0,
          progressing: false
        }],
        // 新图片列表的值
        newImgList: [{
          attachmentName: '',
          attachmentType: 'crmCompanyCreditCode',
          attachmentPath: '',
          fileType: '',
          fileSize: ''
        }],
        // 旧证图片列表的值
        oldImgList: [{
          attachmentName: '',
          attachmentType: 'crmCompanyBusinessNo',
          attachmentPath: '',
          fileType: '',
          fileSize: ''
        }, {
          attachmentName: '',
          attachmentType: 'crmCompanyTaxNo',
          attachmentPath: '',
          fileType: '',
          fileSize: ''
        }, {
          attachmentName: '',
          attachmentType: 'crmCompanyOrgCode',
          attachmentPath: '',
          fileType: '',
          fileSize: ''
        }],
        // 用户类型
        customerType: 'A44',
        // 公司类型列表
        customerTypeList: [{
          id: '11',
          name: '房产'
        }],
        // 列表项
        listItem: [
          {
            name: '企业名称',
            key: 'companyName',
            type: 'input',
            placeholder: '请输入企业名称',
            required: true,
            rule: value => {
              return baseRule('企业名称', 60)(value)
            }
          }, {
            name: '企业类别',
            key: 'customerType',
            type: 'select',
            placeholder: '请选择企业类别',
            required: true,
            rule: value => {
              return baseRule('企业类别', 40)(value)
            }
          }, {
            name: '企业联系人',
            key: 'contacts',
            type: 'input',
            placeholder: '请输入姓名',
            required: true,
            rule: value => {
              return baseRule('企业联系人', 40)(value)
            }
          }, {
            name: '联系人职务',
            key: 'position',
            type: 'input',
            placeholder: '请输入联系人职务',
            required: true,
            rule: value => {
              return baseRule('联系人职务', 40)(value)
            }
          }, {
            name: '企业联系人电话',
            key: 'contactNumber',
            type: 'input',
            placeholder: '手机／固定电话',
            required: true,
            rule: value => {
              // if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
              //   return '请输入正确格式的手机号'
              // }
              if (value.length > 13 || value.length < 11) {
                return '请输入正确格式的号码'
              }
              return baseRule('企业联系人电话', 40)(value)
            }
          }, {
            name: '统一社会信用代码',
            key: 'newCreditCode',
            type: 'input',
            placeholder: '输入18位统一社会信用代码',
            required: true,
            rule: value => {
              if (!value || value.length !== 18) {
                return '请输入18位统一社会信用代码'
              }
            }
          }
        ],
        // 新证规则
        newCerRule: {
          name: '统一社会信用代码',
          key: 'newCreditCode',
          type: 'input',
          placeholder: '输入18位统一社会信用代码',
          required: true,
          rule: value => {
            if (!value || value.length !== 18) {
              return '请输入18位统一社会信用代码'
            }
          }
        },
        // 旧证规则
        oldCerRule: {
          name: '营业执照编码',
          key: 'oldCreditCode',
          type: 'input',
          placeholder: '输入15位营业执照编码',
          required: true,
          rule: value => {
            if (!value || value.length !== 15) {
              return '请输入正确15位营业执照编码'
            }
          }
        }
      }
    },
    computed: {
      imgList () {
        return this.type === 1 ? this.newImgList : this.oldImgList
      }
    },
    watch: {
      newCreditCode (newVal) {
        this.temp.creditCode = newVal
      },
      oldCreditCode (newVal) {
        this.temp.creditCode = newVal
      },
      type (newVal) {
        this.listItem[this.listItem.length - 1] = newVal ? this.newCerRule : this.oldCerRule
      }
    },
    created () {
      this.loadData()
    },
    mounted () {
    },
    methods: {
      /*
      * 加载数据
      * */
      loadData () {
        // 获取企业类型
        getCompanyTypeList({
          customerType: this.customerType
        }).then(res => {
          this.customerTypeList = res.data.data
          // 默认选中第一条内容
          this.$nextTick(() => {
            this.$refs.customerTypeSelect[0].value = this.$refs.customerTypeSelect[0].childNodes[0].value
          })
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
      uploadFile (key) {
        // console.log('key: ', `file${key}`)
        this.$refs[`file${key}`].click()
      },
      /*
      * 新三证上传
      * */
      newFileChanged (event, index) {
        let file = event.target.files[0]
        let temp = this.newLicenceList[index]
        temp.imgName = file.name
        this.$set(this.newLicenceList, index, temp)
        let formData = new window.FormData()
        formData.append('file', file, file.name)
        let Type = file.type
        if (file.size > 1024 * 1024 * 10) {
          this.$message({
            message: '请上传大小不超过10M的文件！',
            type: 'error'
          })
          return false
        }
        // 允许文件类型列表
        const fileTypeList = ['jpeg', 'jpg', 'png', 'pdf']
        if (!Type || fileTypeList.indexOf(Type.split('/')[1]) < 0) {
          this.$message({
            message: '请上传规定格式的文件！',
            type: 'error'
          })
          return false
        }
        // 显示上传进度
        this.newLicenceList[index].progressing = true
        this.newLicenceList[index].percentage = 0
        this.newLicenceList[index].progressEnd = false
        this.uploadPhoto(formData, progress => {
          this.newLicenceList[index].percentage = Math.floor(progress.loaded / progress.total * 100)
        }, res => {
          this.newLicenceList[index].progressEnd = true
          if (res.data.code === 200) {
            let middleItem = this.newLicenceList[index]
            middleItem.fail = false
            this.newLicenceList.splice(index, 1, middleItem)
            this.newImgList[index].attachmentName = file.name
            this.newImgList[index].attachmentPath = res.data.result[0].photoBig
            this.newImgList[index].fileType = `.${file.type.split('/')[1]}` // 取文件类型后缀
            this.newImgList[index].fileSize = file.size
          } else {
            let middleItem = this.newLicenceList[index]
            middleItem.fail = true
            this.newLicenceList.splice(index, 1, middleItem)
          }
        })
      },
      /*
      * 旧三证上传
      * */
      oldFileChanged (event, index) {
        let file = event.target.files[0]
        this.oldLicenceList[index].imgName = file.name
        let formData = new window.FormData()
        formData.append('file', file, file.name)
        let Type = file.type
        if (file.size > 1024 * 1024 * 10) {
          this.$message({
            message: '请上传大小不超过10M的文件！',
            type: 'error'
          })
          return false
        }
        // 允许文件类型列表
        const fileTypeList = ['jpeg', 'jpg', 'png', 'pdf']
        if (!Type || fileTypeList.indexOf(Type.split('/')[1]) < 0) {
          this.$message({
            message: '请上传规定格式的文件！',
            type: 'error'
          })
          return false
        }
        // 显示上传进度
        this.oldLicenceList[index].progressing = true
        this.oldLicenceList[index].percentage = 0
        this.oldLicenceList[index].progressEnd = false
        this.uploadPhoto(formData, progress => {
          this.oldLicenceList[index].percentage = Math.floor(progress.loaded / progress.total * 100)
        }, res => {
          this.oldLicenceList[index].progressEnd = true
          if (res.data.code === 200) {
            let middleItem = this.oldLicenceList[index]
            middleItem.fail = false
            this.oldLicenceList.splice(index, 1, middleItem)
            this.oldImgList[index].attachmentName = file.name
            this.oldImgList[index].attachmentPath = res.data.result[0].photoBig
            this.oldImgList[index].fileType = `.${file.type.split('/')[1]}` // 取文件类型后缀
            this.oldImgList[index].fileSize = file.size
          } else {
            let middleItem = this.oldLicenceList[index]
            middleItem.fail = true
            this.oldLicenceList.splice(index, 1, middleItem)
            // this.oldLicenceList[index].fail = true
          }
        })
      },
      /*
      * 上传图片
      * */
      uploadPhoto (data, progressCallback, uploadCallback) {
        Axios({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'post',
          data: data,
          url: this.FileUploadUrl,
          onUploadProgress: function (progressEvent) {
            if (progressEvent.lengthComputable) {
              progressCallback(progressEvent)
            }
          }
        }).then(res => {
          uploadCallback(res)
        }, err => {
          console.log('err', err)
        })
      },
      /*
      * 表单验证
      * */
      configForm () {
        let flag = true
        this.listItem.forEach((item, index) => {
          if (item.required && item.rule(this.temp[item.key]) && index < this.listItem.length - 1) {
            flag = false
          } else {
            flag = !item.rule(this.temp.creditCode)
          }
        })
        if (this.type === 1) {
          this.newImgList.forEach(item => {
            if (!item.attachmentName) {
              flag = false
              this.$message({
                message: '请先上传附件！',
                type: 'error'
              })
              return false
            }
          })
        } else {
          this.oldImgList.forEach(item => {
            if (!item.attachmentName) {
              flag = false
              this.$message({
                message: '请先上传附件！',
                type: 'error'
              })
              return false
            }
          })
        }
        return flag
      },
      /*
      * 提交
      * */
      doSubmit () {
        this.readySubmit = true
        if (!this.configForm()) {
          return false
        }
        let query = this.temp
        query.certificateType = this.type
        query.attachmentList = this.imgList
        this.loading = true
        customerAuthentication(query).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '提交认证信息成功！',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({
                path: '/identification/result'
              })
            }, 300)
          } else {
            this.$message({
              message: res.data.data,
              type: 'warning'
            })
          }
        }, err => {
          this.loading = false
          console.log(err)
        })
      },
      /*
      * 清除当前附件
      * */
      clearFileItem (item, index, list, imgList) {
        const temp = Object.assign({}, item, {
          imgName: ''
        })
        this.$set(list, index, temp)
        const imgTemp = Object.assign({}, imgList[index], {
          attachmentName: '',
          attachmentPath: '',
          fileType: '',
          fileSize: ''
        })
        this.$set(imgList, index, imgTemp)
        this.$refs[`file${item.attachmentType}`].value = ''
      }
    }
  }
</script>

<style lang="sass">
  @import "./index"
</style>
