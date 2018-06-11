<template>
  <section class="delivry-detail-page" v-loading.fullscreen.lock="loading">
    <el-steps :active="active" align-center class="up-step">
      <el-step  class="step-item" :class="{ 'step-active': info.status === '10' }" :title="info.deliveryNoticeDate | timeFormat('YYYY-MM-DD HH:mm')">
      </el-step>
      <el-step  class="step-item" :class="{ 'step-active': info.status === '40' }" :title="info.deliveryDate | timeFormat('YYYY-MM-DD HH:mm')">
      </el-step>
      <el-step  class="step-item" :class="{ 'step-active': info.status === '50' }" :title="info.arrivalDate | timeFormat('YYYY-MM-DD HH:mm')">
      </el-step>
      <el-step  class="step-item" :class="{ 'step-active': info.status === '90' }" :title="info.receiptDateTime | timeFormat('YYYY-MM-DD HH:mm')">
      </el-step>
    </el-steps>
    <section v-if="parseInt(info.status, 10) === 50" class="payment-warning-part">
      <div class="warning-left-part">
        <i style="font-size: 44px; margin-right: 10px; color: #F18115;" class="iconfont icon-zhuyi"></i>
      </div>
      <div class="warning-right-box">
        <p class="warning-right-text">
          当前状态: 到货待签收
        </p>
        <p v-if="info.logisticsList && info.logisticsList.length" class="warning-right-desc">
          物流跟踪：{{ info.logisticsList[0].logisticsTime | timeFormat('YYYY-MM-DD HH:mm:ss') }} {{ info.logisticsList[0].logisticsInfo }}
        </p>
        <p v-if="btnShow" class="warning-right-desc">
          您可以 <span class="delivery-receipt-btn" @click="doReceipt">签收</span>
        </p>
      </div>
    </section>
    <div class="delivry-detail-main">
      <div class="detail">
        <div class="info">
          <div class="left">基础信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">发货单号</span>
              <span class="mr-l">{{ info.deliveryCode }}</span>
            </div>
            <div>
              <span class="detail-left-label">发货日期</span>
              <span class="mr-l">{{ info.deliveryDate | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>
            </div>
            <div>
              <span class="detail-left-label">发货通知号</span>
              <span class="mr-l">{{ info.deliveryNoticeCode }}</span>
            </div>
            <div>
              <span class="detail-left-label">采购订单号</span>
              <span class="mr-l">{{ info.contractCode }}</span>
            </div>
            <div>
              <span class="detail-left-label">收货地址</span>
              <span class="mr-l">{{ info.address }}({{ info.sales }}收)</span>
              <span class="mr-l">{{ info.contactTel }}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="detail">
        <div class="info">
          <div class="left">物流信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">物流公司</span>
              <span class="mr-l">{{ info.logisticsName }}</span>
            </div>
            <div>
              <span class="detail-left-label">物流公司联系人</span>
              <span class="mr-l">{{ info.contactName }}</span>
            </div>
            <div>
              <span class="detail-left-label">物流单号</span>
              <span class="mr-l">{{ info.logisticsNumber }}</span>
            </div>
            <div>
              <span class="detail-left-label">车牌号</span>
              <span class="mr-l">{{ info.carNumber }}</span>
            </div>
            <div>
              <span class="detail-left-label">司机/车队负责人</span>
              <span class="mr-l">{{ info.driverName }}</span>
            </div>
            <div>
              <div style="float: left;" class="detail-left-label">物流跟踪</div>
              <ul style="float: left;" class="mr-l delivery-logist-list">
                <li v-for="item in info.logisticsList" class="logist-list-item">
                  <span>{{ item.logisticsTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>&nbsp;
                  <span>{{ item.logisticsInfo }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="detail" v-if="info.remark">
        <div class="info">
          <div class="left">备注：</div>
          <div class="right">
            <span class="detail-left-label">{{ info.remark }}</span>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <!-- 发货信息 --- 验收 -->
      <div ref="receiptTable" class="purchase">
        <div class="left">发货信息：</div>
        <div class="right">
          <template>
            <el-table
              :data="info.itemList"
              style="width: 100%"
              stripe
              border
              show-summary
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                prop="serial"
                label="序号"
                width="44"
              >
              </el-table-column>
              <el-table-column
                prop="itemName"
                label="商品名称"
                width="133"
              >
              </el-table-column>
              <el-table-column
                prop="brandName"
                label="品牌"
                width="68"
              >
              </el-table-column>
              <el-table-column
                prop="parameters"
                label="技术参数"
                width="222"
              >
              </el-table-column>
              <el-table-column
                prop="contractTotal"
                label="数量"
                width="74"
              >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="74"
              >
              </el-table-column>
              <el-table-column
                prop="noticeQuantity"
                label="发货通知量"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="realQuantity"
                label="实发量"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="receiptQuantity"
                label="签收量"
                width="80"
              >
                <template slot-scope="scope">
                  <input :disabled="!btnShow || scope.row.receiptQuantity === scope.row.realQuantity" type="number" v-model="scope.row.receiptQuantity" />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="btnShow && info.status === '50'" class="detail">
        <div class="info">
          <div class="left"><span style="color: #FD2E2E; margin-right: 2px;">*</span>签收凭证：</div>
          <div class="right">
            <div class="file-upload-btn" v-show="!attachmentList[0].attachmentPath" @click="uploadFile(0)">附件上传</div>
            <div class="file-uploaded-box" v-show="attachmentList[0].attachmentPath">
              <p class="file-uploaded-title">附件</p>
              <p class="file-uploaded-name" @click="DownloadFile(attachmentList[0].attachmentPath, attachmentList[0].attachmentName)">
                <i style="margin-right: 5px;" class="iconfont icon-fujian"></i>{{ attachmentList[0].attachmentName }}<span style="margin-left: 3px; cursor: pointer;" @click="clearAttachmentItem(index)">&nbsp;X</span>
              </p>
            </div>
            <p class="file-text-title">附件上传说明： <br/>1、支持附件类型：doc  docx    xls  xlsx   pdf  jpg  jpeg  png  rar  zip ;<br/>
              2、附件不大于20M，如果您有多个附件，请压缩成后上传；</p>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div v-if="btnShow && info.status === '50'" class="detail">
        <div class="info">
          <div class="left"><span style="color: #FD2E2E; margin-right: 2px;">*</span>签收说明：</div>
          <div class="right">
            <textarea class="type-text-area" cols="30" rows="10" placeholder="" v-model="receiptInfo"></textarea>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div v-if="info.status === '90'" class="detail">
        <div class="info">
          <div class="left">签收信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">签收时间</span>
              <span class="mr-l">{{ info.arrivalDate | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>
            </div>
            <p style="color: #1c6eeb;" class="file-uploaded-name" @click="DownloadFile(info.attachmentPath, info.attachmentName)">
              <i style="margin-right: 5px;" class="iconfont icon-fujian"></i>{{ info.attachmentName }}
            </p>
            <div class="detail-left-label">{{ info.receiptInfo }}</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <footer v-if="btnShow && info.status === '50'" class="form-submit-box">
        <el-button class="form-submit-btn" type="success" @click="submitForm">签收</el-button>
        <el-button class="form-cancle-btn" @click="cancleEdit">取消</el-button>
      </footer>
    </div>
    <!-- 文件上传统一处理 -->
    <input ref="file0" type="file" style="display: none;" @change="fileChanged($event, 0)">
  </section>
</template>

<script>
  import { getDeliveryInfo, logisticsReceipt } from '@/api/person/buyer/contract'
  import Axios from 'axios'
  import { getUserInfo } from '@/utils/auth.js'
  import { updateBillStatus } from '@/api/common/updateBillStatus'
  export default {
    name: 'delivryDetail',
    data () {
      return {
        loading: false,
        btnShow: parseInt(this.$route.query.btn, 10) === 1,
        isRead: parseInt(this.$route.query.isRead, 10) === 1,
        info: {},
        userInfo: getUserInfo(),
        receiptInfo: '',
        deliveryId: this.$route.query.deliveryHeadId || '091d40e4226f594a2bbf4d54153e217f',
        attachmentList: [{
          attachmentPath: '',
          attachmentName: '',
          fileType: '',
          fileSize: ''
        }]
      }
    },
    computed: {
      active () {
        if (!this.info.status) {
          return 0
        }
        const statusList = ['10', '40', '50', '90']
        return statusList.indexOf(this.info.status) || 0
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
        getDeliveryInfo({
          userId: this.userInfo.userId,
          deliveryId: this.deliveryId
        }).then(res => {
          let info = res.data.data
          info.itemList.forEach((item, index) => {
            item.serial = index + 1
            // 签收量默认等于实发量
            if (info.status !== '90') {
              item.receiptQuantity = parseInt(item.realQuantity, 10)
            } else {
              item.receiptQuantity = parseInt(item.receiptQuantity, 10)
            }
          })
          this.info = Object.assign({}, info)
          // 切换已读状态
          if (!this.isRead) {
            const params = {
              billId: this.deliveryId,
              billType: '25',
              companyId: getUserInfo().companyId,
              companyName: getUserInfo().companyName,
              operatorType: '10',
              userId: getUserInfo().userId,
              userName: getUserInfo().userName
            }
            updateBillStatus(params).then(() => {
            })
          }
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
          console.log('上传成功: ', res)
          if (res.data.code === 200) {
            this.attachmentList[index].attachmentName = file.name
            this.attachmentList[index].attachmentPath = res.data.result[0].photoBig
            this.attachmentList[index].fileType = `.${FileType}` // 取文件类型后缀
            this.attachmentList[index].fileSize = file.size
          } else {
            this.$refs.failToast.showDialog()
          }
          console.log(this.attachmentList)
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
      * 确认
      * */
      submitForm () {
        if (!this.attachmentList[0].attachmentPath) {
          this.$message({
            message: '请先上传附件！',
            type: 'error'
          })
          return false
        }
        let params = {
          userId: this.userInfo.userId,
          deliveryId: this.deliveryId,
          deliveryCode: this.info.deliveryCode,
          userName: this.userInfo.userName,
          itemList: this.info.itemList.map(item => {
            return {
              deliveryLineId: item.deliveryLineId,
              deliveryLineCode: item.deliveryLineCode,
              receiptQuantity: item.receiptQuantity,
              deliveryHeadId: this.info.deliveryId
            }
          }),
          receiptInfo: this.receiptInfo,
          attachmentList: this.attachmentList,
          bussinessType: 'tmsDelivery'
        }
        this.loading = true
        logisticsReceipt(params).then(res => {
          this.loading = false
          console.log(res)
          this.$message({
            message: '签收成功！',
            type: 'success'
          })
          let messageSetTimeout = setTimeout(() => {
            clearTimeout(messageSetTimeout)
            // this.$router.go(-1)
            // 重新加载数据
            this.btnShow = false
            this.loadData()
          }, 300)
        }, err => {
          this.loading = false
          console.log(err)
        })
      },
      /*
      * 取消
      * */
      cancleEdit () {
        this.$router.go(-1)
      },
      /*
      * 签收锚点
      * */
      doReceipt () {
        this.$nextTick(() => {
          window.scrollTo(0, this.$refs.receiptTable.offsetTop)
        })
      }
    }
  }
</script>

<style lang="sass">
  @import "index"
</style>
