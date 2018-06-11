<template>
  <div class="upload-project">
    <div class="detail">
      <div class="titel">锁货通知单</div>
      <div class="lock">
        <span style="margin-left:20px">锁货通知单：<span>{{salesReservationCode}}</span></span>
        <span style="margin-left:192px">通知时间：<span>{{notifyDate | timeFormat('YYYY-MM-DD')}}</span></span>
      </div>
      <div class="info">
        <div class="left">基础信息：</div>
        <div class="right">
          <div>项目名称<span class="mr-l">{{projectName}}</span></div>
          <div>收获地址<span class="mr-l">{{address}}</span></div>
          <div>派发单号<span class="mr-l">{{dispatchCode}}</span></div>
          <div>招采经理<span class="mr-l">{{purchaser}}</span><span style="margin-left:25px">{{contactPhone}}</span></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="purchase">
        <div class="enclosure">
          <div class="left">备注：</div>
          <div class="right">
            <div>{{remark}}</div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div class="left" style="margin-top:20px">商品信息：</div>
        <div class="right" style="margin-top:20px">
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
                prop="brand"
                label="品牌"
                >
              </el-table-column>
              <el-table-column
                label="技术参数"
                prop="technicalParameter"
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
                prop="deliveryDate"
                label="要求交付日期">
                <template slot-scope="scope">
                  {{ scope.row.deliveryDate | timeFormat('YYYY-MM-DD') }}
                </template>
              </el-table-column>
              <el-table-column
                prop="itemRemark"
                label="备注">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSalesReservationInfo } from '@/api/person/supplier/supplier'
  import { updateBillStatus } from '@/api/common/updateBillStatus'
  import { getUserInfo } from '@/utils/auth'
  export default {
    data () {
      return {
        status: 20,
        tableData2: [],
        active: 0,
        address: '',
        dispatchCode: '',
        projectName: '',
        purchaser: '',
        contactPhone: '',
        remark: '',
        salesReservationCode: '',
        notifyDate: '',
        userInfo: getUserInfo()
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
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
      getDetail () {
        let params = {
          supplierId: this.userInfo.supplierId,
          userId: this.userInfo.userId,
          salesReservationId: this.$route.query.salesReservationId
        }
        getSalesReservationInfo(params).then((response) => {
          if (response.data.code === 200) {
            let data = response.data.data
            this.tableData2 = data.itemList
            this.address = data.address
            this.dispatchCode = data.dispatchCode
            this.projectName = data.projectName
            this.purchaser = data.purchaser
            this.contactPhone = data.contactPhone
            this.remark = data.remark
            this.salesReservationCode = data.salesReservationCode
            this.notifyDate = data.notifyDate
            const params = {
              billId: this.$route.query.salesReservationId,
              billType: '30',
              companyId: getUserInfo().companyId,
              companyName: getUserInfo().companyName,
              operatorType: '10',
              userId: getUserInfo().userId,
              userName: getUserInfo().userName
            }
            updateBillStatus(params).then((res) => {
              console.log(1, res)
            })
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
    }
  }
</script>
<style lang="sass">
  @import "./detail"
</style>
