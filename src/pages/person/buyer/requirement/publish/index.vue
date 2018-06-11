<template>
  <section class="pulish-require-page" v-loading.fullscreen.lock="loading">
    <!-- 新增地址 -->
    <add-address v-if="addressShow" @addAddressSuccess="addAddressSuccess" ref="addAddress"></add-address>
    <editor-address ref="editorAddress" @editorAddressSuccess="editorAddressSuccess"></editor-address>
    <!-- 上传失败提示 -->
    <v-toast ref="failToast"></v-toast>
    <nav class="publish-require-nav">
      发布采购需求
    </nav>
    <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
      <div class="publish-form-box">
        <header class="form-box-title">需求信息</header>
        <div class="form-box-main">
          <el-form-item label="需求简述：" prop="demandResume">
            <input placeholder="请输入需求简述" class="form-item-input" v-model="formData.demandResume" />
          </el-form-item>
          <el-form-item label="需求类型：" prop="demandType">
            <ul class="require-type-box">
              <li v-for="(item, index) in requireTypeList" class="require-type-item" @click="changeTypeIndex(index)">
                <div class="require-type-radio" :class="{ active: demandType === index }">
                  <span class="require-type-inner" v-if="demandType === index"></span>
                </div>
                <span class="require-type-name">{{ item.name }}</span>
                <span class="require-type-desc">{{ item.desc }}</span>
                <!-- 文本需求 -->
                <div v-if="index === 0 && demandType == 0" class="text-area-box">
                  <textarea class="type-text-area" cols="30" rows="10" placeholder="" v-model="demandRemarkList[0]"></textarea>
                </div>
                <!-- 附件需求 -->
                <div v-if="index === 1 && demandType === 1" class="file-require-box">
                  <div class="file-upload-btn" v-show="!attachmentList[index].attachmentPath" @click="uploadFile(index)">附件上传</div>
                  <div class="file-uploaded-box" v-show="attachmentList[index].attachmentPath">
                    <p class="file-uploaded-title">附件</p>
                    <p class="file-uploaded-name" @click="DownloadFile(attachmentList[index].attachmentPath, attachmentList[index].attachmentName)">
                      <i style="margin-right: 5px;" class="iconfont icon-fujian"></i>{{ attachmentList[index].attachmentName }}<span style="margin-left: 3px; cursor: pointer;" @click="clearAttachmentItem(index)">&nbsp;X</span></p>
                  </div>
                  <p class="file-text-title">附件上传说明： <br/>1、支持附件类型：doc  docx    xls  xlsx   pdf  jpg  jpeg  png  rar  zip ;<br/>
                    2、附件不大于50M，如果您有多个附件，请压缩成后上传；</p>
                  <p class="file-text-desc">更多补充与备注：</p>
                  <div style="padding-left: 0;" class="text-area-box">
                    <textarea class="type-text-area" cols="30" rows="10" placeholder="" v-model="demandRemarkList[1]"></textarea>
                  </div>
                </div>
                <!-- 详细需求 -->
                <div v-if="index === 2 && demandType === 2" class="file-require-box">
                  <div class="detail-require-table">
                    <header class="detail-table-header">
                      <div v-for="(item, index) in tableItems" class="table-header-item" :style="{ width: `${item.width}px` }">
                        <span class="header-label-must" v-if="item.required">*</span>
                        <span class="header-item-text">{{ item.name }}</span>
                      </div>
                      <div class="table-header-item" :style="{ width: `${43}px` }">
                        <span class="header-item-text">操作</span>
                      </div>
                    </header>
                    <ul class="detail-table-body">
                      <li @mouseenter="item.hover = true" @mouseleave="item.hover = false" class="detail-table-item" v-for="(item, index) in detailInputList">
                        <div v-for="table in tableItems" class="table-item-inner" :style="{ width: `${table.width}px` }">
                          <input type="text" class="item-inner-input" v-model="item[table.key]" />
                        </div>
                        <div class="table-item-inner" :style="{ width: `${43}px` }">
                          <span class="item-inner-text" :class="{ hidden: !item.hover }" @click="deleteOneItem(index)">删除</span>
                        </div>
                      </li>
                    </ul>
                    <footer class="detail-table-footer">
                      <i class="iconfont addIcon">&#xe634;</i>
                      <span class="table-footer-text" @click="addOneTableItem">添加一条</span>
                    </footer>
                  </div>
                  <div class="file-upload-btn" v-show="!attachmentList[index].attachmentPath" @click="uploadFile(index)">附件上传</div>
                  <div class="file-uploaded-box" v-show="attachmentList[index].attachmentPath">
                    <p class="file-uploaded-title">附件</p>
                    <p class="file-uploaded-name" @click="DownloadFile(attachmentList[index].attachmentPath, attachmentList[index].attachmentName)">
                      <i style="margin-right: 5px;" class="iconfont icon-fujian"></i>{{ attachmentList[index].attachmentName }}<span style="margin-left: 3px; cursor: pointer;" @click="clearAttachmentItem(index)">&nbsp;X</span>
                    </p>
                  </div>
                  <p class="file-text-title">附件上传说明： <br/>1、支持附件类型：doc  docx    xls  xlsx   pdf  jpg  jpeg  png  rar  zip ;<br/>
                    2、附件不大于50M，如果您有多个附件，请压缩成后上传；</p>
                  <p class="file-text-desc">更多补充与备注：</p>
                  <div style="padding-left: 0;" class="text-area-box">
                    <textarea class="type-text-area" cols="30" rows="10" placeholder="" v-model="demandRemarkList[2]"></textarea>
                  </div>
                </div>
              </li>
            </ul>
          </el-form-item>
        </div>
      </div>
      <div class="publish-form-box">
        <header class="form-box-title">采购要求</header>
        <div class="form-box-main">
          <el-form-item class="form-date-item" label="期望交货日期：" prop="dateTimeStart">
            <el-date-picker
              v-model="formData.dateTimeStart"
              align="right"
              type="date"
              placeholder="YYYY-MM-DD"
              :picker-options="pickerOptionsStart"
              @change="startDateChange()">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formData.dateTimeEnd"
              align="right"
              type="date"
              placeholder="YYYY-MM-DD"
              :default-value="defaultEndDate"
              :picker-options="pickerOptionsEnd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收货地址：" prop="addressId">
            <ul :style="showBtn ? {'height': '240px'} : null" class="require-type-box" style="overflow: hidden;">
              <li :class="{ active: formData.addressId === item.addressId }" v-for="(item, index) in addressList" class="require-type-item item-list" @click="changeAddressId(item.addressId)">
                <div v-if="index < 5">
                  <div class="require-type-radio" :class="{ active: formData.addressId === item.addressId }">
                    <span class="require-type-inner" v-if="formData.addressId === item.addressId"></span>
                  </div>
                  <span class="require-type-name">{{ item.areas }}{{ item.address }}({{ item.contacts }}收)&nbsp;{{ item.contactNumber }}</span>
                  <el-button type="text" class="item-row-editor" @click="itemEditorAdress(item)">修改本地址</el-button>
                </div>
                <div v-if="!showBtn && index >= 5">
                  <div class="require-type-radio" :class="{ active: formData.addressId === item.addressId }">
                    <span class="require-type-inner" v-if="formData.addressId === item.addressId"></span>
                  </div>
                  <span class="require-type-name">{{ item.areas }}{{ item.address }}({{ item.contacts }}收)&nbsp;{{ item.contactNumber }}</span>
                  <el-button type="text" class="item-row-editor" @click="itemEditorAdress(item)">修改本地址</el-button>
                </div>
              </li>
            </ul>
            <div v-if="addressList.length > 5 && showBtn" @click="toggleShow" class="address-add-btn">显示更多</div>
            <div v-if="addressList.length < 20 && !showBtn || addressList.length < 6" class="address-add-btn" @click="addNewAddress">使用新地址</div>
          </el-form-item>
        </div>
      </div>
      <div class="publish-form-box last">
        <header class="form-box-title">联系人</header>
        <div class="form-box-main">
          <el-form-item label="姓名：" prop="demandContacts">
            <input class="form-item-input" style="width: 150px;" v-model="formData.demandContacts"/>
          </el-form-item>
          <el-form-item label="手机/座机：" prop="demandPhone">
            <input class="form-item-input" style="width: 150px;" v-model="formData.demandPhone"/>
          </el-form-item>
        </div>
      </div>
      <footer class="form-submit-box">
        <el-button class="form-submit-btn" type="success" @click="submitForm">提交需求</el-button>
      </footer>
    </el-form>
    <!-- 文件上传统一处理 -->
    <input ref="file1" type="file" style="display: none;" @change="fileChanged($event, 1)">
    <input ref="file2" type="file" style="display: none;" @change="fileChanged($event, 2)">
    <contract-list-dialog ref="contractEditorAdress"></contract-list-dialog>
  </section>
</template>

<script>
  import { getUserInfo } from '@/utils/auth'

  import { addDemandInfo } from '@/api/person/buyer/contract.js'
  import { getAddressList } from '@/api/person/address/address.js'

  import Axios from 'axios'

  import addAddress from './addAddress.vue'
  import editorAddress from './editorAddress.vue'
  import Toast from './toast.vue'

  export default {
    name: 'publishRequirement',
    data () {
      let mobileValidator = (rule, value, callback) => {
        if (mobileValidator > 15 || mobileValidator < 11) {
          callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      }
      const UserInfo = getUserInfo()
      return {
        showBtn: true,
        addressShow: false,
        // 可提交
        canRequest: true,
        loading: false,
        userInfo: UserInfo,
        defaultEndDate: new Date(),
        demandRemarkList: ['', '', ''],
        attachmentList: [{
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: ''
        }, {
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: ''
        }, {
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: ''
        }],
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
          }
        },
        pickerOptionsEnd: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
          }
        },
        // 文件已上传
        fileUploaded: false,
        addressList: [],
        tableItems: [
          {
            required: true,
            name: '商品名称',
            width: 150,
            key: 'itemName'
          },
          {
            required: false,
            name: '品牌',
            width: 80,
            key: 'brandName'
          },
          {
            required: true,
            name: '数量',
            width: 60,
            key: 'quantity'
          },
          {
            required: true,
            name: '单位',
            width: 50,
            key: 'unit'
          },
          {
            required: false,
            name: '补充描述',
            width: 280,
            key: 'description'
          }
        ],
        detailInputList: [{
          itemName: '',
          brandName: '',
          quantity: '',
          unit: '',
          description: '',
          hover: false
        }],
        requireTypeList: [
          {
            name: '文本需求',
            desc: '你可以在此将您的需求做简描述。'
          },
          {
            name: '附件需求',
            desc: '您可以将施工图纸，商品图片，或者附件类型的需求在此上传，形成附件采购需求。'
          },
          {
            name: '详细需求',
            desc: '如果您有详细的采购清单和商品技术参数，请您填写详细采购需求。'
          }
        ],
        formData: {
          demandResume: '',
          demandContacts: '',
          demandPhone: '',
          addressId: '',
          dateTimeStart: '',
          dateTimeEnd: '',
          customerCode: UserInfo.companyCode,
          customerId: UserInfo.customerId,
          companyId: UserInfo.companyId,
          customerName: UserInfo.companyName,
          userName: UserInfo.userName,
          demandRemark: '',
          demandType: 10
        },
        demandType: 0,
        rules: {
          demandResume: [
            {
              required: true,
              message: '请输入需求简述',
              trigger: 'blur'
            }
          ],
          demandType: [
            {
              required: true,
              message: '请选择需求类型',
              trigger: 'blur'
            }
          ],
          demandContacts: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          demandPhone: [{
            required: true,
            trigger: 'blur',
            validator: mobileValidator
          }],
          dateTimeStart: [{
            required: true,
            message: '请选择期望交货日期',
            trigger: 'blur'
          }],
          addressId: [{
            required: true,
            message: '请选择收货地址'
          }]
        }
      }
    },
    computed: {
      submitData () {
        let params = this.formData
        return params
      }
    },
    created () {
      this.loadAddressList()
      Axios({
        url: 'http://mall.vandream.com:8081/group1/M00/00/3A/wKgF2lrfAN6APsuqAAAZ07D--5U50.xlsx',
        method: 'get'
      }).then(res => {
        console.log(res)
      })
    },
    mounted () {
    },
    methods: {
      /*
      * 获取地址列表
      * */
      loadAddressList () {
        getAddressList({
          userId: this.userInfo.userId,
          companyId: this.userInfo.companyId
        }).then(res => {
          if (res.data.code === 200) {
            this.addressList = res.data.data
            this.formData.addressId = this.addressList[0].addressId
          }
        }, err => {
          console.log(err)
        })
      },
      /*
      * 上传文件
      * */
      uploadFile (index) {
        this.$refs[`file${index}`].click()
      },
      /*
      * 文件上传内容改变
      * */
      fileChanged (event, index) {
        let file = event.target.files[0]
        let FileType = file.name.split('.')[file.name.split('.').length - 1]
        const allowedFileTypes = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'jpg', 'jpeg', 'png', 'rar', 'zip']
        if (file.size > 1024 * 1024 * 50) {
          this.$message({
            message: '请上传大小不超过50M的文件！',
            type: 'error'
          })
          return false
        }
        if (allowedFileTypes.indexOf(FileType) < 0) {
          this.$message({
            message: '请上传正确格式的文件',
            type: 'error'
          })
          return false
        }
        let formData = new window.FormData()
        formData.append('file', file, file.name)
        Axios({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'post',
          data: formData,
          url: this.FileUploadUrl
        }).then(res => {
          if (res.data.code === 200) {
            this.attachmentList[index].attachmentName = file.name
            this.attachmentList[index].attachmentPath = res.data.result[0].photoBig
            this.attachmentList[index].fileType = `.${FileType}` // 取文件类型后缀
            this.attachmentList[index].fileSize = file.size
          } else {
            this.$refs.failToast.showDialog()
          }
        }, err => {
          console.log('err', err)
        })
      },
      /*
      * 清除附件
      * */
      clearAttachmentItem (index) {
        let temp = {
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: ''
        }
        this.attachmentList.splice(index, 1, temp)
        this.$refs[`file${index}`].value = ''
      },
      /*
      * 修改类型
      * */
      changeTypeIndex (index) {
        this.demandType = index
      },
      /*
      * 修改地址
      * */
      changeAddressId (id) {
        this.formData.addressId = id
      },
      /*
      * 添加一条
      * */
      addOneTableItem () {
        this.detailInputList.push({
          itemName: '',
          brandName: '',
          quantity: '',
          unit: '',
          description: '',
          hover: false
        })
      },
      /*
      * 删除单条
      * */
      deleteOneItem (index) {
        this.detailInputList.splice(index, 1)
      },
      /*
      * 提交表单
      * */
      submitForm () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let params = {}
            params = Object.assign({}, this.formData)
            params.demandRemark = this.demandRemarkList[this.demandType]
            if (params.dateTimeStart && params.dateTimeStart.getTime()) {
              params.dateTimeStart = params.dateTimeStart.getTime()
              params.dateTimeEnd = params.dateTimeEnd.getTime()
            }
            if (this.demandType > 0) {
              params.attachmentPath = this.attachmentList[this.demandType].attachmentPath
              params.attachmentName = this.attachmentList[this.demandType].attachmentName
              params.fileSize = this.attachmentList[this.demandType].fileSize
              params.fileType = this.attachmentList[this.demandType].fileType
            }
            // 详细需求
            if (this.demandType === 2) {
              let trueInputList = this.detailInputList.filter(item => {
                return item.brandName
              })
              params.demandDiscuss = trueInputList.map((item) => {
                return {
                  brandName: item.brandName,
                  description: item.description,
                  itemName: item.itemName,
                  quantity: parseInt(item.quantity, 10),
                  unit: item.unit
                }
              })
            }
            // 临时测试
            // params.addressId = '078e28c41214c9f3b8b67b6bfb75dba2'
            params.userId = this.userInfo.userId
            // 需求类型 详细需求为 20
            params.demandType = this.demandType < 2 ? '10' : '20'
            this.loading = true
            // 请求过程中切换成不可提交状态
            this.canRequest = false
            addDemandInfo(params).then(res => {
              this.loading = false
              this.canRequest = true
              if (res.data && res.data.code === 200) {
                this.canRequest = false
                this.$message({
                  message: '需求发布成功！',
                  type: 'success'
                })
                setTimeout(() => {
                  this.canRequest = true
                  this.$router.push({
                    path: '/setting/buyer/requirement'
                  })
                }, 300)
              }
            }, err => {
              this.loading = false
              this.canRequest = true
              console.log(err)
            })
          } else {
            return false
          }
        })
      },
      /*
      * 开始日期改变
      * */
      startDateChange () {
        // 结束日期默认值
        this.defaultEndDate = this.formData.dateTimeStart
        // 结束日期不可选赋值
        this.pickerOptionsEnd.disabledDate = time => {
          return time.getTime() < this.formData.dateTimeStart.getTime()
        }
      },
      /*
      * 使用新地址
      * */
      addNewAddress () {
        this.addressShow = true
        this.$nextTick(() => {
          this.$refs.addAddress.dialogVisible = true
        })
      },
      /*
      * 添加地址成功
      * */
      addAddressSuccess () {
        this.$refs.addAddress.dialogVisible = false
        this.loadAddressList()
        this.addressShow = false
      },
      editorAddressSuccess () {
        this.$refs.editorAddress.dialogVisible = false
        this.loadAddressList()
      },
      /*
      * 切换地址下拉
      * */
      toggleShow () {
        this.showBtn = !this.showBtn
      },
      /*
      * 打开编辑地址
      * */
      itemEditorAdress (scope) {
        console.log(scope)
        this.$refs.editorAddress.isShow(scope)
      },
    },
    components: {
      'add-address': addAddress,
      'v-toast': Toast,
      'editor-address': editorAddress
    }
  }
</script>

<style lang="sass">
  @import "index"
</style>
