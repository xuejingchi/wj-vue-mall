<template>
  <section class="order-detail-page" v-loading.fullscreen.lock="loading">
    <div class="order-detail-main">
      <header class="order-detail-header">
        <div class="detail-header-left">
          <h3 class="detail-header-title">销售订单</h3>
          <p class="detail-header-desc">
            <span class="header-desc-label" style="float: left;">销售订单号：</span>
            <span class="header-desc-value" style="float: left;">{{ info.saleOrderCode }}</span>
            <span class="header-desc-label">订单日期：</span>
            <span class="header-desc-value">{{ info.orderDate | timeFormat('YYYY-MM-DD HH:mm:ss') }}</span>
            <span class="header-desc-value" style="float: right">{{ info.categoryName }}</span>
            <span class="header-desc-label" style="float: right">商品分类：</span>
          </p>
        </div>
      </header>
      <div class="detail">
        <div class="info">
          <div class="left">基础信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">甲方</span>
              <span class="mr-l">{{ info.purchaser }}</span>
            </div>
            <div>
              <span class="detail-left-label">乙方</span>
              <span class="mr-l">{{ info.supplier }}</span>
            </div>
            <div>
              <span class="detail-left-label">项目名称</span>
              <span class="mr-l">{{ info.projectName }}</span>
            </div>
            <div>
              <span class="detail-left-label">收货地址</span>
              <span class="mr-l">{{ info.address }}</span>
            </div>
            <div>
              <span class="detail-left-label">招采经理</span>
              <span class="mr-l">{{ info.staffer }}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="purchase">
        <div class="left">采购需求：</div>
        <div class="right">
          <template>
            <el-table
              :data="info.itemList"
              style="width: 100%"
              stripe
              border
              show-summary
              :summary-method="getItemSummaries"
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                prop="serial"
                label="序号"
                width="45"
              >
              </el-table-column>
              <el-table-column
                prop="itemName"
                label="商品名称"
                width="95"
              >
              </el-table-column>
              <el-table-column
                prop="brandName"
                label="品牌"
                width="70"
              >
              </el-table-column>
              <el-table-column
                prop="paramters"
                label="技术参数"
                width="165"
              >
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                width="55"
              >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                >
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="含税单价(元)"
                width="100">
              </el-table-column>
              <el-table-column
                prop="taxRate"
                label="税率"
                width="40">
              </el-table-column>
              <el-table-column
                prop="amountPrice"
                label="金额(元)"
                width="60"
              >
              </el-table-column>
              <el-table-column
                prop="expectDate"
                label="预计交付日期"
                width="100">
                <template slot-scope="scope">
                  {{ scope.row.expectDate | timeFormat('YYYY-MM-DD') }}
                </template>
              </el-table-column>
            </el-table>
          </template>
          <p class="buy-require-desc">以上总价已经包含产品出厂价、损耗、相关配件、关税、税金、利润、商检费、运输费、安装调试费等，即将产品从生产至交付、并完成安装调试等所有服务的最终交货价，除此甲方不需承担其他任何费用，乙方亦不得要求需方客户支付任何费用。</p>
        </div>
        <div style="clear:both"></div>
      </div>
      <!-- 附件承诺 -->
      <div v-if="info.attachmentList && info.attachmentList.length" class="enclosure">
        <div class="left">附件和承诺：</div>
        <div class="right">
          <div class="order-file-list">
            <div v-for="(item, index) in info.attachmentList" class="upload-file order-file-item">
              <i class="iconfont icon-fujian"></i>
              附件{{ index + 1 }}{{ item.attachmentName }}
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="file-desc-text">点击文件名下载文件，下载文件为PDF版本，你可以使用PDF阅读器或者浏览器打开。</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <!-- 结算信息 -->
      <div class="purchase">
        <div class="left">结算信息：</div>
        <div class="right">
          <template>
            <el-table
              :data="info.billingInformation"
              style="width: 100%"
              stripe
              border
              show-summary
              :summary-method="getBillingSummaries"
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                prop="receiptsExplain"
                label="收款说明"
                width="280"
              >
              </el-table-column>
              <el-table-column
                prop="startDate"
                label="开始日期"
                width="140"
              >
                <template slot-scope="scope">
                  {{ scope.row.startDate | timeFormat('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column
                prop="limitDay"
                label="收款期限(天)"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="proportion"
                label="金额占比(%)"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额"
                width="135"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <!-- 发票信息 -->
      <div class="purchase">
        <div class="left">发票信息：</div>
        <div class="right">
          <ul class="invoice-info-list">
            <li class="invoice-info-item">
              <span class="info-item-label">单位名称</span>
              <span class="info-item-value">{{ info.companyName || '未知' }}</span>
            </li>
            <li class="invoice-info-item">
              <span class="info-item-label">纳税人识别码</span>
              <span class="info-item-value">{{ info.identificationCode || '未知' }}</span>
            </li>
            <li class="invoice-info-item">
              <span class="info-item-label">单位地址</span>
              <span class="info-item-value">{{ info.companyAddress || '未知' }}</span>
            </li>
            <li class="invoice-info-item">
              <span class="info-item-label">电话</span>
              <span class="info-item-value">{{ info.tel || '未知' }}</span>
            </li>
            <li class="invoice-info-item">
              <span class="info-item-label">开户行及账号</span>
              <span class="info-item-value">{{ `${info.bankName} ${info.cardNumber}` || '未知' }}</span>
            </li>
          </ul>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="info.contractList && info.contractList.length" class="enclosure">
        <div class="left">订单信息：</div>
        <div class="right">
          <div class="order-file-list">
            <div v-for="(item, index) in info.contractList" class="upload-file order-file-item">
              <i class="iconfont icon-fujian"></i>
              附件{{ index + 1 }}{{ item.attachmentName }}
            </div>
            <div style="clear: both;"></div>
          </div>
          <div class="file-desc-text">点击文件名下载文件，下载文件为PDF版本，你可以使用PDF阅读器或者浏览器打开。</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="parseInt(info.status, 10) > 50" class="detail">
        <div class="info">
          <div class="left">确认信息：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">确认人</span>
              <span class="mr-l">{{ info.confirmer }}</span>
            </div>
            <div>
              <span class="detail-left-label">确认时间</span>
              <span class="mr-l">{{ info.confirmDateTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}</span>
            </div>
            <div v-if="parseInt(info.status, 10) >= 60">
              <span class="detail-left-label">甲方签约人</span>
              <span class="mr-l">{{ info.firstParty }}</span>
            </div>
            <div v-if="parseInt(info.status, 10) >= 60">
              <span class="detail-left-label">乙方签约人</span>
              <span class="mr-l">{{ info.secondParty }}</span>
            </div>
            <div v-if="parseInt(info.status, 10) >= 60">
              <span class="detail-left-label">生效时间</span>
              <span class="mr-l">{{ info.takeEffectDateTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div v-if="btnShow && info.status === '50'" class="confirm-btn-box">
        <el-button type="warning" @click="orderConfirm">订单确认</el-button>
      </div>
    </div>
  </section>
</template>

<script>
  import { getOrderInfo, confirmOrder } from '@/api/person/supplier/supplier.js'
  import { getUserInfo } from '@/utils/auth'
  import { getSummaries } from '@/utils/table'
  export default {
    name: 'ordermentDetail',
    data () {
      return {
        loading: false,
        btnShow: parseInt(this.$route.query.btn, 10) === 1,
        // 订单ID
        purchaseContractHeadId: this.$route.query.orderId,
        recordMark: '',
        userInfo: getUserInfo(),
        info: {}
      }
    },
    created () {
      this.loadData()
    },
    mounted () {
      console.log(typeof this.$route.query.btn)
    },
    methods: {
      /*
      * 加载数据
      * */
      loadData () {
        getOrderInfo({
          userId: this.userInfo.userId,
          purchaseContractHeadId: this.purchaseContractHeadId
        }).then(res => {
          if (res.data.code === 200) {
            let info = res.data.data
            if (info.itemList && info.itemList.length) {
              info.itemList.forEach((item, index) => {
                item.serial = index + 1
              })
            }
            this.info = info
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
      * 订单确认
      * */
      orderConfirm () {
        this.loading = true
        confirmOrder({
          operatorType: '25',
          purchaseContractHeadId: this.purchaseContractHeadId,
          recordMark: this.recordMark,
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          supplierId: this.userInfo.supplierId
        }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '确认成功！',
              type: 'success'
            })
            // 刷新页面内容
            this.btnShow = false
            this.loadData()
            // 切换页面hash值
            window.location.hash = this.$router.resolve({
              query: {
                orderId: this.$route.query.orderId,
                btn: 0
              }
            }).href
          }
        }, err => {
          this.loading = false
          console.log(err)
        })
      },
      /*
      * 计算合计
      * */
      getItemSummaries (param) {
        return getSummaries(param, ['quantity', 'unitPrice', 'amountPrice'])
      },
      /*
      * 结算信息合计
      * */
      getBillingSummaries (param) {
        return getSummaries(param, ['amount'])
      }
    }
  }
</script>

<style lang="sass">
  @import "index"
</style>
