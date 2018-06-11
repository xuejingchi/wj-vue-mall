<template>
  <div class="upload-project">
    <el-steps :active="active" align-center class="up-step">
      <el-step  class="step-item" :class="{ 'step-active': status === '10' || status === '25'}">
      </el-step>
      <el-step  class="step-item" :class="{ 'step-active': status === '20' }">
      </el-step>
      <el-step  class="step-item" :class="{ 'step-active': status === '30' || status === '00' }">
      </el-step>
    </el-steps>
    <div class="status" v-show="status !== '20'">
      <div class="status-style">
        <i class="iconfont icon-zhuyi a" v-show="status === '10'"></i>
        <i class="iconfont icon-butongguo a" v-show="status === '25' || status === '00'"></i>
        <i class="iconfont icon-shenhetongguo b" v-show="status === '30'"></i>
        <div class="type">当前状态：
          <span v-show="status === '10'">待上传方案</span>
          <span v-show="status === '00'">方案审核未通过</span>
          <span v-show="status === '30'">方案审核通过</span>
          <span v-show="status === '25'">驳回待上传方案</span>
        </div>
        <!--10 待上传 -->
        <div class="upload" v-show="status === '10'">您可以：
          <span class="col-18" @click="downloadNeed" ref="download">下载采购需求</span>
          <span class="col-18" @click="uploadDemo" ref="upload" style="margin-left:30px" v-if="hasStandardGoods === false">上传方案</span>
        </div>
        <!-- 25方案审核被驳回 -->
        <div class="upload" v-show="status === '25'">
          您的方案不符合我们需求，感谢您的支持！
        </div>
        <!-- 30方案审核通过 -->
        <div class="upload" v-show="status === '30'">
          您的方案符合我们的要求，接下来我们会给您下发预采购清单进行锁货，请您保持联系！
        </div>
        <!-- 00 方案审核未通过 -->
        <div class="upload" v-show="status === '00'">
          您的方案不符合我们需求，感谢您的支持！
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="info">
        <div class="left">基础信息：</div>
        <div class="right">
          <div>派发单号<span class="mr-l">{{solutionCode}}</span></div>
          <div>派发日期<span class="mr-l">{{solutionDate | timeFormat('YYYY-MM-DD')}}</span></div>
          <div>期望交货日期<span style="margin-left:25px">{{deliveryStartDate | timeFormat('YYYY-MM-DD')}} ~ {{deliveryEndDate | timeFormat('YYYY-MM-DD')}}</span></div>
          <div>需求品类<span class="mr-l">{{demandCategory}}</span></div>
          <div>收获地址<span class="mr-l">{{address}}</span></div>
          <div>类目经理<span class="mr-l">{{purchaser}}</span><span style="margin-left:25px">{{contactPhone}}</span></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="purchase">
        <div class="left">采购需求：</div>
        <div class="right">
          <template>
            <el-table
              :data="tableData2"
              style="width: 100%"
              border
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                type="index"
                width="80"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="itemName"
                label="商品名称"
                >
              </el-table-column>
              <el-table-column
                prop="brandName"
                label="品牌"
                >
              </el-table-column>
              <el-table-column
                prop="demandRemark"
                label="需求参数"
                >
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位">
              </el-table-column>
              <el-table-column
                prop=""
                label="备注">
              </el-table-column>
            </el-table>
          </template>
          <a :href="downLink" class="upload">下载采购需求</a>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="enclosure" v-show="demandAttachmentPath">
        <div class="left">附件采购：</div>
        <div class="right">
          <div class="upload-file" @click="DownloadFile(demandAttachmentPath, demandAttachmentName)">
            <i class="iconfont icon-fujian"></i>
            {{demandAttachmentName}}
          </div>
          <div>{{remark}}</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="solution" v-show="!hasStandardGoods">
        <div class="left">解决方案：</div>
        <div class="right" style="width: 90%">
          <div >
            <el-table
              :data="solutonAttachmentVOS"
              style="width: 100%;margin-bottom:20px"
              border
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                type="index"
                width="80"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="solutionAttachmentName"
                label="附近名称"
                >
                <template slot-scope="scope">
                  <span style="color:#1C6EEB" @click="DownloadFile(scope.row.solutionAttachmentPath, scope.row.solutionAttachmentName)">
                    <i class="iconfont icon-fujian"></i>
                    {{scope.row.solutionAttachmentName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="上传时间"
                >
                <template slot-scope="scope">
                  {{ scope.row.createDate | timeFormat('YYYY-MM-DD  HH:mm:ss') }}
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.status === '10'">待上传方案</span>
                  <span v-if="scope.row.status === '20'">方案提交待审核</span>
                  <span v-if="scope.row.status === '30'" class="iconfont icon-icon-test1" style="font-size:12px;color:#21B065;">  审核通过</span>
                  <span v-if="scope.row.status === '00'" class="iconfont icon-icon-test">  审核未通过</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="clear:both"></div>
          <div class="upload" v-show="(status === '10' || status === '25') && !attachmentName" @click="uploadFile()" v-if="showBtn === 1">上传方案附件</div>
          <div class="upload-file" v-show="attachmentName" @click="DownloadFile(attachmentPath, attachmentName)">
            <i class="iconfont icon-fujian"></i>
            {{attachmentName}}
          </div>
          <div class="read" v-show="status === '10' && !attachmentName">
            <div>附件上传说明</div>
            <div>1、支持附件类型：doc docx xls xlsx pdf jpg jpeg png rar zip；</div>
            <div>2、附件不大于50M，如果您有多个附件，请压缩成后上传；</div>
          </div>
          <!-- <div v-show="status !== '10'">
            <div class="upload-file" v-show="solutionAttachmentName">
              <i class="iconfont icon-fujian"></i>
              {{solutionAttachmentName}}
            </div>
            <div style="margin-top:20px;margin-bottom:20px">方案联系人<span style="margin-left:25px">{{solutionContact}}</span><span style="margin-left:25px">{{solutionPhone}}</span></div>
          </div> -->
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="submit" v-show="(status === '10' || status === '25') && !hasStandardGoods">
        <div v-loading="sunmitLoading" class="submit-style" @click="submit" v-if="showBtn === 1">提交</div>
      </div>
      <div class="to" v-show="status === '25' || status === '30'">
        <div class="left">审核意见：</div>
        <div class="right">
          <!-- 15 审核驳回 -->
          <div v-show="status === '25' || status === '00'" class="no">
            <i class="iconfont icon-icon-test" style="font-size:12px;margin-right:10px"></i>
              您的方案不符合我们要求，感谢您的支持！
          </div>
          <!-- 审核通过 30 -->
          <div v-show="status === '30'" class="yes" >
            <i class="iconfont icon-icon-test1" style="font-size:12px;margin-right:10px"></i>
            您的方案符合我们的要求，接下来我们会给您下发预采购清单进行锁货，请您保持联系！
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
    <!-- 文件上传统一处理 -->
    <input ref="file" type="file" style="display: none;" @change="fileChanged($event)">
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>此派发单商品全为标品，无需提交解决方案！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button type="default" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSolutionInfo, uploadAttachment, getSolutionPurchaseExcel } from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  import Axios from 'axios'
  export default {
    data () {
      return {
        sunmitLoading: false,
        downLink: '',
        dialogVisible: false,
        showBtn: this.$route.query.btn,
        status: 20,
        tableData2: [],
        solutonAttachmentVOS: [],
        active: 0,
        address: '',
        hasStandardGoods: '',
        demandCategory: '',
        deliveryStartDate: '',
        deliveryEndDate: '',
        solutionCode: '',
        purchaser: '',
        remark: '',
        solutionDate: '',
        contactPhone: '',
        solutionContact: '',
        solutionPhone: '',
        solutionAttachmentName: '',
        demandAttachmentName: '',
        attachmentPath: '',
        attachmentName: '',
        solutionSupplierId: '',
        fileType: '',
        fileSize: '',
        supplierId: getUserInfo().supplierId || '10ba756fcbe824d92d83bd17907357c0',
        userId: getUserInfo().userId || 1,
        demandAttachmentPath: ''
      }
    },
    mounted () {
      this.getDetail()
      this.uploadMo()
    },
    methods: {
      downloadNeed () {
        window.scrollTo(0, 400)
      },
      uploadDemo () {
        window.scrollTo(0, 600)
      },
      // 获取详情
      getDetail () {
        let params = {
          solutionSupplierId: this.$route.query.solutionSupplierId,
          userId: this.userId,
          supplierId: this.supplierId
        }
        getSolutionInfo(params).then((response) => {
          if (response.data.code === 200) {
            let data = response.data.data
            this.tableData2 = data.itemList
            this.address = data.address
            this.demandCategory = data.demandCategory
            this.deliveryStartDate = data.deliveryStartDate
            this.deliveryEndDate = data.deliveryEndDate
            this.solutionCode = data.solutionCode
            this.purchaser = data.purchaser
            this.contactPhone = data.contactPhone
            this.remark = data.remark
            this.solutionContact = data.solutionContact
            this.solutionPhone = data.solutionPhone
            this.solutionAttachmentName = data.solutionAttachmentName
            this.attachmentName = data.solutionAttachmentName
            this.attachmentPath = data.solutionAttachmentPath
            this.demandAttachmentName = data.demandAttachmentName
            this.demandAttachmentPath = data.demandAttachmentPath
            this.solutionSupplierId = data.solutionSupplierId
            this.solutionDate = data.solutionDate
            this.solutonAttachmentVOS = data.solutonAttachmentVOS
            this.status = data.solutionStatus
            this.hasStandardGoods = data.hasStandardGoods
            // this.status = 30
            if (this.status === '10' || this.status === '25') {
              this.active = 0
            } else if (this.status === '20') {
              this.active = 1
            } else if (this.status === '30' || this.status === '00') {
              this.active = 2
            }
            if (data.hasStandardGoods === true) {
              if (this.status === '10') {
                this.dialogVisible = true
              }
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*
      * 上传文件
      * */
      uploadFile () {
        this.$refs['file'].click()
      },
      fileChanged (event) {
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
            // this.attachmentName = res.data.result[0].fileName
            this.attachmentPath = res.data.result[0].photoBig
            this.fileType = `.${FileType}` // 取文件类型后缀
            this.fileSize = file.size
            this.attachmentName = file.name
          }
        }, err => {
          console.log('err', err)
        })
      },
      uploadMo () {
        let params = {
          solutionSupplierId: this.$route.query.solutionSupplierId,
          supplierId: this.supplierId,
          userId: this.userId
        }
        getSolutionPurchaseExcel(params).then(res => {
          if (res.data.code === 200) {
            // 下载exel 标格
            this.downLink = `${this.ServerImgUrl}${res.data.data.filePath}?fname=${res.data.data.fileName}`
            // this.$message({
            //   message: '下载成功',
            //   type: 'success'
            // })
          } else {
            this.$message({
              message: '下载失败！',
              type: 'error'
            })
          }
        })
        // window.open(`${this.BaseDownloadUrl}/download/solutionPurchaseExcel?userId=${this.userId}&supplierId=${this.supplierId}&solutionId=${this.$route.query.solutionId}&solutionCode=SE1804030005`)
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
      submit () {
        if (this.fileSize === '') {
          this.$message({
            message: '请上先上传附件',
            type: 'error'
          })
          return false
        }
        this.sunmitLoading = true
        let params = {
          attachmentName: this.attachmentName,
          attachmentType: this.attachmentType,
          attachmentPath: this.attachmentPath,
          fileSize: this.fileSize,
          fileType: this.fileType,
          solutionId: this.$route.query.solutionId,
          solutionSupplierId: this.solutionSupplierId,
          userId: this.userId,
          userName: getUserInfo().userName
        }
        uploadAttachment(params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.data,
              type: 'success'
            })
            setTimeout(() => {
              this.sunmitLoading = false
              this.getDetail()
            }, 1000)
          } else {
            this.$message({
              message: '提交失败！',
              type: 'error'
            })
            this.sunmitLoading = false
          }
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "./uploadProject"
</style>
