<template>
  <section class="require-detail-page">
    <div class="require-detail-main">
      <header class="require-detail-header">
        <div class="detail-header-left">
          <h3 class="detail-header-title">{{ info.demandResume }}</h3>
          <p class="detail-header-desc">
            <span class="header-desc-label">需求单号：</span>
            <span class="header-desc-value">{{ info.demandCode }}</span>
            <span class="header-desc-label">发布时间：</span>
            <span class="header-desc-value">{{ info.demandTime | timeFormat('YYYY-MM-DD  HH:mm') }}</span>
          </p>
        </div>
        <div class="detail-header-right">
          <div class="detail-process-line">
            <div v-for="(item, index) in statusList" class="process-line-number">
              <div class="process-line-border" :class="{ active: status >= item.nextStatus }" v-if="index < statusList.length - 1"></div>
              <span :class="{ active: status >= item.status }" class="process-line-icon">{{ index + 1 }}</span>
            </div>
          </div>
          <div class="process-line-texts">
            <div class="process-text-item" v-for="(item, index) in statusList">
              <div v-for="line in item.lines" :class="{ active: status === item.status }" class="process-line-text">
                {{ line.text }}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="detail">
        <div class="info">
          <div class="left">采购要求：</div>
          <div class="right">
            <div>
              <span class="detail-left-label">期望交货日期</span>
              <span class="mr-l">{{ info.deliveryPeriodStart | timeFormat('YYYY-MM-DD') }} ~ {{ info.deliveryPeriodEnd | timeFormat('YYYY-MM-DD') }}</span>
            </div>
            <div>
              <span class="detail-left-label">联系人</span>
              <span class="mr-l">{{ info.contact }}</span>
              <span class="mr-l">{{ info.contactPhone }}</span>
              <span class="mr-l">{{ info.contactTel }}</span>
            </div>
            <div>
              <span class="detail-left-label">收货地址</span>
              <span class="mr-l">{{ info.address }}</span>
              <!--<span class="mr-l">{{ info.address }}({{ info.contact }}收)</span>-->
              <!--<span class="mr-l">{{ info.contactPhone }}</span>-->
            </div>
            <div v-if="status > 10">
              <span class="detail-left-label">销售经理</span>
              <span class="mr-l">{{ info.saler }}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
      <div v-if="info.demandLineDetailDTOList && info.demandLineDetailDTOList.length" class="purchase">
        <div class="left">{{ info.status > 10 ? '采购清单' : '详细需求' }}：</div>
        <div class="right">
          <template>
            <el-table
              :data="info.demandLineDetailDTOList"
              style="width: 100%"
              :highlight-current-row="highlight"
              stripe
              border
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave">
              <el-table-column
                prop="serial"
                label="序号"
                width="50"
              >
              </el-table-column>
              <el-table-column
                prop="itemName"
                label="商品名称"
                width="165"
              >
              </el-table-column>
              <el-table-column
                prop="brand"
                label="品牌"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="demandRemark"
                label="需求描述"
                width="380"
              >
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                width="70"
              >
                <template slot-scope="scope">
                  {{ scope.row.quantity | showQuantityToIntegar }}
                </template>
              </el-table-column>
              <el-table-column
                prop="unitTypeName"
                label="单位"
                width="70"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="info.demandSolutionVOList && info.demandSolutionVOList.length" class="purchase">
        <div class="left">方案信息：</div>
        <div class="right">
          <template>
            <el-table
              :highlight-current-row="highlight"
              stripe
              border
              @cell-mouse-enter="cellMouseEnter"
              @cell-mouse-leave="cellMouseLeave"
              :data="info.demandSolutionVOList">
              <el-table-column
                prop="schemeCategory"
                label="方案分类"
              >
                <template slot-scope="scope">
                  <i style="font-size: 12px; color: #21B065;;" class="iconfont icon-icon-test1" v-if="scope.row.status === '60'"></i>
                  <i style="font-size: 12px; color: #F18115;" class="iconfont icon-icon-test" v-if="scope.row.status === '55'"></i>
                  {{ scope.row.schemeCategory }}
                </template>
              </el-table-column>
              <el-table-column
                prop="schemeName"
                label="方案简述"
              >
              </el-table-column>
              <el-table-column
                prop="attachmentName"
                label="方案附件"
              >
                <template slot-scope="scope">
                  <i style="margin-right: 5px;" class="iconfont icon-fujian"></i><span class="link-to-window" @click="DownloadFile(scope.row.schemeAttachment, scope.row.attachmentName)">{{ scope.row.attachmentName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="上传时间"
              >
                <template slot-scope="scope">
                  {{ scope.row.uploadTime | timeFormat('YYYY-MM-DD  HH:mm:ss') }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <!--<template slot-scope="scope">-->
                  <!--<span class="affirm" v-if="scope.row.status === '60'">已确认</span>-->
                  <!--<span class="reject" v-if="scope.row.status === '55'">已驳回</span>-->
                  <!--<span class="prepare" v-if="scope.row.status === '50'">-->
                  <!--<button class="yes btn"  @click="editorAccessoryStatus(scope, 'affirm')">确认</button>-->
                  <!--<button class="no btn"  @click="editorAccessoryStatus(scope, 'reject')">驳回</button>-->
                <!--</span>-->
                <!--</template>-->
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="info.attachmentName" class="enclosure">
        <div class="left">附件需求：</div>
        <div class="right">
          <div class="upload-file" @click="DownloadFile(info.attachmentPath, info.attachmentName)">
            <i class="iconfont icon-fujian"></i>
            {{ info.attachmentName }}
          </div>
          <div class="file-desc-text">{{ info.remark }}</div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="!info.attachmentName" class="enclosure">
        <div class="left">文本需求：</div>
        <div class="right">
          <div style="margin-top: -3px;" class="file-desc-text">{{ info.remark }}</div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
    <nav v-if="info.logList && info.logList.length" class="publish-require-nav">
      版本变更日志
    </nav>
    <template v-if="info.logList && info.logList.length" >
      <el-table
        class="version-change-table"
        :data="info.logList"
        style="width: 100%"
        :highlight-current-row="highlight"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        >
        <el-table-column
          prop="date"
          label="变更时间"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.date | timeFormat('YYYY-MM-DD  HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="变更说明"
        >
        </el-table-column>
      </el-table>
    </template>
    <dialog-editor-requirementList ref="editorDialog" @getTempData="refresh"></dialog-editor-requirementList>
  </section>
</template>

<script>
import { getDemandInfo } from '@/api/person/buyer/contract.js'
import dialogEditorRequirementList from '../dialog-editor-requirementList'
import { getUserInfo } from '@/utils/auth'
export default {
  name: 'requirementDetail',
  data () {
    return {
      demandId: this.$route.query.demandId,
      getUserInfo: getUserInfo(),
      status: 10,
      highlight: false,
      info: {},
      statusList: [
        {
          status: 10,
          nextStatus: 20,
          lines: [{
            text: '方案'
          }, {
            text: '待受理'
          }]
        }, {
          status: 20,
          nextStatus: 35,
          lines: [{
            text: '方案'
          }, {
            text: '制定中'
          }]
        }, {
          status: 35,
          nextStatus: 40,
          lines: [{
            text: '方案'
          }, {
            text: '待确认'
          }]
        }, {
          status: 40,
          lines: [{
            text: '方案'
          }, {
            text: '已确认'
          }]
        }
      ]
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
      getDemandInfo({
        userId: this.getUserInfo.userId,
        demandId: this.demandId
      }).then(res => {
        if (res.data.code === 200) {
          let info = res.data.data
          if (info.demandLineDetailDTOList && info.demandLineDetailDTOList.length) {
            info.demandLineDetailDTOList.forEach((item, index) => {
              item.serial = index + 1
            })
          }
          if (info.logList && info.logList.length) {
            let logList = []
            for (let i = 0; i < info.logList.length; i++) {
              if (info.logList[i]) {
                logList.push({
                  name: '您的需求已被细化',
                  date: info.logList[i].visitTime
                })
              }
            }
            info.logList = logList
          }
          this.info = info
          this.status = parseInt(info.status, 10)
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
    * 更新状态
    * */
    editorAccessoryStatus (data, status) {
      this.$refs.editorDialog.show(data, status)
    },
    /*
    * 刷新当前页面
    * */
    refresh () {
      this.loadData()
    }
  },
  components: {
    dialogEditorRequirementList
  }
}
</script>

<style lang="sass">
  @import "index"
</style>
