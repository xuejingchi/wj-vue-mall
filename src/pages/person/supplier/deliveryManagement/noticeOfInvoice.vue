<template>
  <div class="notice-body">
    <div class="notice-body-title">
      <h2>发货通知</h2>
    </div>
    <div class="notice-content">
      <div class="notice-info-item">
        <div class="notice-info-title">
          <div class="notice-info-title-item t-l">
            发货通知单：{{ listData.deliveryNoticeCode }}
          </div>
          <div class="notice-info-title-item t-c">
            通知时间：{{ listData.deliveryNoticeDate | timeFormat('YYYY-MM-DD') }}
          </div>
          <div class="notice-info-title-item t-r">
            预计到货日期：{{ listData.expectDate | timeFormat('YYYY-MM-DD') }}
          </div>
        </div>
        <div class="notice-info-content clearfix">
          <div class="notice-info-content-title">客户信息：</div>
          <div class="notice-info-content-txt">
            <div class="notice-info-txt-item clearfix" style="margin: 0">
              <div class="notice-info-txt-label">客户名称</div>
              <div class="notice-info-txt-row">{{ listData.customerName }}</div>
            </div>
            <div class="notice-info-txt-item clearfix">
              <div class="notice-info-txt-label">收货地址</div>
              <div class="notice-info-txt-row">{{ listData.address }}</div>
            </div>
            <div class="notice-info-txt-item clearfix">
              <div class="notice-info-txt-label">销售订单号</div>
              <div class="notice-info-txt-row">{{ listData.saleContractCode }}</div>
            </div>
            <div class="notice-info-txt-item clearfix">
              <div class="notice-info-txt-label">招采经理</div>
              <div class="notice-info-txt-row">{{ listData.purchaser }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="notice-info-item">
        <div class="notice-info-content m-n clearfix">
          <div class="notice-info-content-title">商品信息：</div>
          <div class="notice-info-content-txt">
            <div class="notice-info-txt-item m-n clearfix">
              <template>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  class="list-table"
                  stripe
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
                    prop="parameters"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="unit"
                    label="单位">
                  </el-table-column>
                  <el-table-column
                    prop="orderCount"
                    label="订单数量">
                  </el-table-column>
                  <el-table-column
                    prop="noticeNumber"
                    label="发运通知量">
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="notice-info-item">-->
        <!--<div class="notice-info-content clearfix">-->
          <!--<div class="notice-info-content-title">备注：</div>-->
          <!--<div class="notice-info-content-txt">-->
            <!--<div class="notice-info-txt-item clearfix">-->
              <!--<p>-->
                <!--预埋槽道 （图表1）侧面加劲肋有锁健功能，埋入混凝土时可加强与混凝土的握裹力热浸镀锌70um以上处理，防腐性能佳配有T型泡沫填充物，防止漏浆。预埋槽道可作为现浇、预制混凝土构件上承载锚固点的理想可调节解决方案，现已广发应用，如铁路桥检修吊篮安装铁路桥四电上桥电缆爬梯安装铁梁箱梁内、外排水管安装铁路隧道内综合接地，地铁管片的管路及设备的安装固定等。我厂现生产多种规格T型预埋槽珍珠棉填充物（图表2）。尺寸和形状和任意调整，完全贴合预埋槽道，防止漏浆。颜色可以调配，目前客户指定灰色比较多。成本相对较低在1元每米左右。长度一般在5-6米随意定制。特殊产品每种规格起订量一般在1万米左右。，地铁管片的管路及设备的安装固定等。我厂现生产多种规格T型预埋槽珍珠棉填充物（图表2）。尺寸和形状和任意调整，完全贴合预埋槽道，防止漏浆。颜色可以调配，目前客户指定灰色比较多。成本相对较低在1元每米左右。长度一般在5-6米随意定制。尺寸和形状和任意调整，完全贴合预埋槽道，防止漏浆。颜色可以调配，目前客户指定灰色比较多。成本相对较低在1元每米左右。长度一般在5-6米随意定制。特殊产品每种规格起订量一般在1万米左右右。-->
              <!--</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSupplierDeliveryNoticeInfo } from '@/api/person/supplier/supplier'
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'noticeOfInvoice',
    data () {
      return {
        tableData: [],
        listData: {},
        userInfo: getUserInfo()
      }
    },
    mounted () {
      this.getSupplierDeliveryNoticeInfo()
    },
    methods: {
      getSupplierDeliveryNoticeInfo() {
        let params = {
          deliveryNoticeId: this.$route.query.deliveryNoticeId,
          userId: this.userInfo.userId
        }
        getSupplierDeliveryNoticeInfo(params).then((response) => {
          let data = response.data.data
          this.listData = data
          this.tableData = data.itemList
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "./noticeOfInvoice"
</style>
