<template>
  <div class="upload-project">
    <div class="detail">
      <div class="titel">{{ contractName }}</div>
      <div class="lock">
        <span style="color:#999">采购订单号：<span>{{ contractCode }}</span></span>
        <span style="margin-left:45px;color:#999">订单日期：<span>{{ contractDate | timeFormat('YYYY-MM-DD hh:mm')}}</span></span>
      </div>
      <div class="info">
        <div class="left">基础信息：</div>
        <div class="right">
          <div>
            <span class="detail-left-label">甲方</span>
            <span >{{purchaser}}</span>
          </div>
          <div>
            <span class="detail-left-label">乙方</span>
            <span >{{supplier}}</span></div>
          <div>
            <span class="detail-left-label">项目名称</span>
            <span >{{projectName}}</span></div>
          <div>
            <span class="detail-left-label">收货地址</span>
            <span >{{address}}（{{name}}收）{{phone}}</span></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="purchase" >
        <div class="left" style="margin-top:5px">采购需求：</div>
        <div class="right" style="margin-top:5px">
          <template>
            <el-table
              :data="tableData2"
              style="width: 100%"
              border>
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
                label="技术参数"
                prop="paramters"
                >
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                width="50"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="50">
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                width="120"
                label="含税单价（元）">
              </el-table-column>
              <el-table-column
                prop="taxRate"
                label="税率">
              </el-table-column>
              <el-table-column
                prop="anountPrice"
                label="金额（元）">
              </el-table-column>
              <el-table-column
                label="预计交付日期"
                width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.expectDate | timeFormat('YYYY-MM-DD')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="purchase">
        <div class="enclosure">
          <div class="left">附件和承诺：</div>
          <div class="right">
            <div class="upload-file">
              <span v-for="item in attachmentList" @click="DownloadFile(item.attachmentPath, item.attachmentName)">
                <span>
                  <i class="iconfont icon-fujian"></i>
                  {{item.attachmentName}}
                </span>
              </span>
            </div>
            <div style="margin-top:8px;color:#999">点击文件名下载文件，下载文件为pdf版本，你可以使用pdf阅读器或者浏览器打开</div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div class="left" style="margin-top:20px">结算信息：</div>
        <div class="right" style="margin-top:20px">
          <template>
            <el-table
              :data="tableData3"
              style="width: 100%"
              border>
              <el-table-column
                prop="receiptsExplain"
                label="收款说明"
                >
              </el-table-column>
              <el-table-column
                label="开始日期"
                >
                <template slot-scope="scope">
                  <span>{{scope.row.startDate | timeFormat('YYYY-MM-DD hh:mm')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="limitDay"
                label="收款期限（天）"
                >
              </el-table-column>
              <el-table-column
                prop="proportion"
                label="金额占比(百分比)">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="enclosure">
        <div class="left">发票信息：</div>
        <div class="right">
          <div>
            <div class="info-left" style="border-right:1px solid #E2E2E2;">单位名称</div>
            <div class="info-right">{{companyName}}</div>
          </div>
          <div style="clear:both;">
            <span class="info-left" style="border-right:1px solid #E2E2E2;">纳税人识别码</span>
            <span class="info-right">{{identificationCode}}</span>
          </div>
          <div style="clear:both;">
            <span class="info-left" style="border-right:1px solid #E2E2E2;">单位地址</span>
            <span class="info-right">{{companyAddress}}</span>
          </div>
          <div style="clear:both;">
            <span class="info-left" style="border-right:1px solid #E2E2E2;">电话</span>
            <span class="info-right">{{tel}}</span>
          </div>
          <div style="clear:both;">
            <span class="info-left" style="border-bottom:1px solid #E2E2E2;border-right:1px solid #E2E2E2;">开户行及账号</span>
            <span class="info-right" style="border-bottom:1px solid #E2E2E2">{{cardNumber}}</span>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="enclosure" style="border-bottom: none;" v-show="contractList.length > 0">
        <div class="left">订单信息：</div>
        <div class="right">
          <div class="upload-file">
            <span v-for="item in contractList" @click="DownloadFile(item.attachmentPath, item.attachmentName)">
              <i class="iconfont icon-fujian"></i>
              {{item.attachmentName}}
            </span>
          </div>
          <div style="margin-top:8px;color:#999">点击文件名下载文件，下载文件为pdf版本，你可以使用pdf阅读器或者浏览器打开</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="info" style="border-top:1px dashed #e2e2e2;padding-top:20px;padding-top:20px;padding-bottom:70px" v-show="status == 55">
        <div class="left">确认信息：</div>
        <div class="right">
          <div>确认人<span style="margin-left:73px">{{confirmer}}</span></div>
          <div>确认时间<span style="margin-left:73px">{{ confirmDateTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}</span></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="info" style="border-top:1px dashed #e2e2e2;padding-bottom:70px" v-show="status == 60">
        <div class="left">确认信息：</div>
        <div class="right">
          <div>
            <span class="detail-left-label">确认人</span>
            <span >{{confirmer}}</span></div>
          <div>
            <span class="detail-left-label">确认时间</span>
            <span >{{ confirmDateTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span></div>
          <div>
            <span class="detail-left-label">甲方签约人</span>
            <span >{{firstParty}}</span></div>
          <div>
            <span class="detail-left-label">乙方签约人</span>
            <span >{{secondParty}}</span></div>
          <div>
            <span class="detail-left-label">生效时间</span>
            <span >{{ takeEffectDateTime | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="submit" v-show="btn == 1">
        <div class="submit-style" @click="confrimDetial">订单确认</div>
        <!--<div class="submit-cancel" @click="">取消</div>-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { fgetContractInfo, confirmationContract } from '@/api/person/buyer/contract'
  import { getUserInfo } from '@/utils/auth'
  export default {
    data () {
      return {
        tableData2: [],
        tableData3: [],
        active: 0,
        address: '',
        dispatchCode: '',
        projectName: '',
        purchaser: '',
        secondParty: '',
        contractName: '',
        contractCode: '',
        contractDate: '',
        identificationCode: '',
        tel: '',
        companyName: '',
        companyAddress: '',
        cardNumber: '',
        status: '',
        btn: '',
        supplier: '',
        confirmer: '',
        confirmDateTime: '',
        firstParty: '',
        takeEffectDateTime: '',
        contractList: [],
        attachmentList: [],
        name: '',
        phone: '',
        userId: getUserInfo().userId || '2',
        userName: getUserInfo().userName || '2'
      }
    },
    mounted () {
      this.btn = this.$route.query.btn
      this.getDetail()
    },
    methods: {
      getDetail () {
        let params = {
          contractId: this.$route.query.contractId,
          userId: this.userId,
        }
        fgetContractInfo(params).then((response) => {
          if (response.data.code === 200) {
            let data = response.data.data
            this.tableData2 = data.itemList
            this.tableData3 = data.billingInformation
            this.address = data.address
            this.dispatchCode = data.dispatchCode
            this.projectName = data.projectName
            this.purchaser = data.purchaser
            this.secondParty = data.secondParty
            this.contractName = data.contractName
            this.contractCode = data.contractCode
            this.contractDate = data.contractDate
            this.identificationCode = data.identificationCode
            this.tel = data.tel
            this.companyName = data.companyName
            this.companyAddress = data.companyAddress
            this.cardNumber = data.cardNumber
            this.confirmer = data.confirmer
            this.confirmDateTime = data.confirmDateTime
            this.firstParty = data.firstParty
            this.supplier = data.supplier
            this.name = data.name
            this.phone = data.phone
            this.takeEffectDateTime = data.takeEffectDateTime
            this.status = data.status
            this.contractList = data.contractList
            this.attachmentList = data.attachmentList
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      confrimDetial () {
        let params = {
          contractId: this.$route.query.contractId,
          userId: this.userId,
          userName: this.userName,
          operatorType: '25'
          // contractId: '0da5dcf9bd94a547fdaec392ec39a0b2',
        }
        confirmationContract(params).then((response) => {
          if (response.data.code === 200) {
            this.$message({
              message: '确认成功！',
              type: 'success'
            })
            // 刷新数据
            this.btn = 0
            this.getDetail()
          } else {
            this.$message({
              message: '提交失败！',
              type: 'error'
            })
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "./receiptInvoice"
</style>
