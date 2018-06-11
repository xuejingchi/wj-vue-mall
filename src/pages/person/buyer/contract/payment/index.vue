<template>
  <section class="require-detail-page" v-loading.fullscreen.lock="loading">
    <section class="payment-warning-part">
      <div class="warning-left-part">
        <i style="font-size: 44px; margin-right: 10px; color: #F18115;" class="iconfont icon-zhuyi"></i>
      </div>
      <p class="warning-right-text">
        当前还没开通在线支付功能，请您线下付款后，上传付款凭证照片或者扫描PDF文件！
      </p>
    </section>
    <div class="require-detail-main">
      <div class="detail">
        <div class="info">
          <div class="left">基础信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">采购订单号</span>
              <span class="mr-l">{{ info.contractCode }}</span>
            </div>
            <div>
              <span class="detail-left-label">采购订单名称</span>
              <span class="mr-l">{{ info.contractName }}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="enclosure">
        <div class="left"><span style="color: #FD2E2E; margin-right: 2px;">*</span>附件需求：</div>
        <div class="right">
          <div class="file-upload-btn" v-show="!attachmentList[0].attachmentPath" @click="uploadFile(0)">附件上传</div>
          <div class="file-uploaded-box" v-show="attachmentList[0].attachmentPath">
            <p class="file-uploaded-title">附件</p>
            <p class="file-uploaded-name" @click="DownloadFile(attachmentList[0].attachmentPath, attachmentList[0].attachmentName)">
              <i style="margin-right: 5px;" class="iconfont icon-fujian"></i>{{ attachmentList[0].attachmentName }}<span style="margin-left: 3px; cursor: pointer;" @click="clearAttachmentItem(index)">&nbsp;X</span></p>
          </div>
          <p class="file-text-title">附件上传说明： <br/>1、支持附件类型：doc  docx    xls  xlsx   pdf  jpg  jpeg  png  rar  zip ;<br/>
            2、附件不大于50M，如果您有多个附件，请压缩成后上传；</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <footer class="form-submit-box">
        <el-button class="form-submit-btn" type="success" @click="submitForm">确认</el-button>
        <!--<el-button class="form-cancle-btn" @click="cancleEdit">取消</el-button>-->
      </footer>
    </div>
    <nav class="payment-require-nav">
      已上传的付款凭证
    </nav>
    <template>
      <el-table
        class="version-change-table"
        :data="info.paymentedHistory"
        style="width: 100%"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
      >
        <el-table-column
          prop="serial"
          label="序号"
          width="100"
          style="text-align: center;"
        >
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上传时间"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.uploadTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="attachmentName"
          label="附件名称"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-fujian" style="color: #4A90E2;"></i>
            <span style="color: #4A90E2;cursor: pointer" class="link-to-window" @click="DownloadFile(scope.row.attachmentPath,scope.row.attachmentName)">{{ scope.row.attachmentName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 文件上传统一处理 -->
    <input ref="file0" type="file" style="display: none;" @change="fileChanged($event, 0)">
  </section>
</template>

<script>
  import { findPaymentHistory, voucherUpload } from '@/api/person/buyer/contract.js'
  import Axios from 'axios'
  import { getUserInfo } from '@/utils/auth.js'
  export default {
    name: 'requirementDetail',
    data () {
      return {
        loading: false,
        info: {},
        userInfo: getUserInfo(),
        contractId: this.$route.query.contractId,
        attachmentList: [{
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: '',
          attachmentType: 'salesContractPayment'
        }]
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
        findPaymentHistory({
          userId: this.userInfo.userId,
          contractId: this.contractId
        }).then(res => {
          let info = res.data.data
          info.paymentedHistory.forEach((item, index) => {
            item.serial = index + 1
          })
          this.info = info
        }, err => {
          console.log(err)
        })
      },
      /*
      * 表格鼠标移入
      * */
      cellMouseEnter (row, column, cell) {
        for (let i = 0; i < cell.parentNode.children.length; i++) {
          cell.parentNode.children[i].style.backgroundColor = '#F7FCF5'
        }
      },
      /*
      * 表格鼠标移除
      * */
      cellMouseLeave (row, column, cell) {
        for (let i = 0; i < cell.parentNode.children.length; i++) {
          cell.parentNode.children[i].style.backgroundColor = ''
        }
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
          fileSize: '',
          attachmentType: 'salesContractPayment'
        }
        this.attachmentList.splice(index, 1, temp)
        this.$refs[`file${index}`].value = ''
      },
      /*
      * 确认
      * */
      submitForm () {
        let params = {
          attachmentList: this.attachmentList,
          bussinessType: 'somSalesContract',
          contractId: this.contractId,
          fromType: '10',
          userId: this.userInfo.userId,
          userName: this.userInfo.userName
        }
        this.loading = true
        voucherUpload(params).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            })
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }, err => {
          this.loading = false
          console.log(err)
        })
      },
      /*
      * 取消
      * */
      cancleEdit () {
      }
    }
  }
</script>

<style lang="sass">
  @import "index"
</style>
