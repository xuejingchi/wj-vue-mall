<template>
  <div class="requirement-dialog-main">
    <el-dialog
      :title="content.dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialog-body">
        <div class="dialog-title clearfix">
          <div class="dialog-icon f-l">
            <span class="iconfont">&#xe60c;</span>
          </div>
          <div class="dialog-text f-l">
            <h2>
              {{ content.operation }}
            </h2>
            <p>{{ content.oneT }}</p>
            <p>{{ content.twoT }}</p>
          </div>
        </div>
        <div class="dialog-content">
          <ul class="list-table">
            <li class="list-item clearfix">
              <div class="list-title">{{ content.list.type.listTitle }}</div>
              <div class="list-text">{{ content.list.type.listTtext }}</div>
            </li>
            <li class="list-item clearfix">
              <div class="list-title">{{ content.list.sketch.listTitle }}</div>
              <div class="list-text">{{ content.list.sketch.listTtext }}</div>
            </li>
            <li class="list-item clearfix">
              <div class="list-title">{{ content.list.accessory.listTitle }}</div>
              <div class="list-text">
                <a style="font-size: 12px;color: #1C6EEB;" @click="DownloadFile(content.list.accessory.textUrl, content.list.accessory.listTtext)">{{ content.list.accessory.listTtext }}</a>
              </div>
            </li>
            <li class="list-item clearfix">
              <div class="list-title">{{ content.list.upTime.listTitle }}</div>
              <div class="list-text">{{ content.list.upTime.listTtext | timeFormat('YYYY-MM-DD  HH:mm:ss') }}</div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="affirm" type="primary" @click="updateList()">确定</el-button>
        <el-button class="cancel" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import moment from 'moment'
  import { affirmScheme } from '@/api/person/buyer/contract'
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'add-dialog',
    components: {},
    filters: {
      timeFormat (value, format) {
        if (value) {
          return moment(value).format(format)
        }
        return ''
      }
    },
    data() {
      return {
        dialogVisible: false,
        content: {
          dialogTitle: '',
          operation: '',
          oneT: '',
          twoT: '',
          list: {
            type: {
              listTitle: '方案分类',
              listTtext: '',
            },
            sketch: {
              listTitle: '方案简述',
              listTtext: '',
            },
            accessory: {
              listTitle: '方案附件',
              listTtext: '',
              textUrl: ''
            },
            upTime: {
              listTitle: '上传时间',
              listTtext: '',
            }
          },
          status: '',
          solutionId: ''
        },
        list: {},
        dialogList: {},
        userInfo: getUserInfo()
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      show(data, status) {
        this.dialogVisible = true
        this.list = data
        if (status === 'affirm') {
          this.content = {
            dialogTitle: '确认方案',
            operation: '是否确认此方案？',
            oneT: '方案确认后我们将及时跟您沟通，进行订单签订！',
            twoT: '万郡绿建始终为您提供高效、可靠、透明、增值服务！',
            list: {
              type: {
                listTitle: '方案分类',
                listTtext: data.row.schemeCategory,
              },
              sketch: {
                listTitle: '方案简述',
                listTtext: data.row.schemeName,
              },
              accessory: {
                listTitle: '方案附件',
                listTtext: data.row.attachmentName,
                textUrl: data.row.schemeAttachment
              },
              upTime: {
                listTitle: '上传时间',
                listTtext: data.row.uploadTime,
              }
            },
            status: '60',
            solutionId: data.row.schemeId
          }
        } else if (status === 'reject') {
          this.content = {
            dialogTitle: '驳回方案',
            operation: '您确定驳回此方案吗？',
            oneT: '对方案没有获得您的认可我们非常歉意',
            twoT: '万郡绿建将会跟您沟通，为您积极匹配新方案!',
            list: {
              type: {
                listTitle: '方案分类',
                listTtext: data.row.schemeCategory,
              },
              sketch: {
                listTitle: '方案简述',
                listTtext: data.row.schemeName,
              },
              accessory: {
                listTitle: '方案附件',
                listTtext: data.row.attachmentName,
                textUrl: data.row.schemeAttachment
              },
              upTime: {
                listTitle: '上传时间',
                listTtext: data.row.uploadTime,
              }
            },
            status: '55',
            solutionId: data.row.schemeId
          }
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      updateList() {
        let parmas = {
          solutionId: this.content.solutionId,
          status: this.content.status,
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          attachmentId: this.list.row.attachmentId
        }
        affirmScheme(parmas).then((response) => {
          if (response.data.code === 200) {
            this.dialogList = response.data.data
            if (this.content.status === '55') {
              this.$message({
                type: 'success',
                message: '已驳回'
              })
            } else if (this.content.status === '60') {
              this.$message({
                type: 'success',
                message: '已确认'
              })
            }
            this.$emit('getTempData')
            this.dialogVisible = false
          }
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "./requirementList"
</style>0
