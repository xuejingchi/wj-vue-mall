<template>
  <div class="subaccount">
    <SettingTitle :msg='titleName'></SettingTitle>
    <div class="titel">
      <div class="titel-l">
        <span class="set">操作指引</span></div>
      <div class="titel-r">
        <span class="round">1</span><span class="text">添加子账号</span><span class="line">--------------------</span>
        <span class="round">2</span><span class="text">验证手机号归属</span><span class="line">--------------------</span>
        <span class="round">3</span><span class="text">账号添加角色权限</span><span class="line">--------------------</span>
        <span class="round">4</span><span class="text">完成</span><span class="line">--------------------</span>
      </div>
    </div>
    <div style="clear:box"></div>
    <el-button type="primary" size="mini" style="margin-top:20px;margin-bottom:15px" @click="addSubaccount"> + 添加子账号</el-button>
    <div class="list">
      <div class="table-list-header" >
        <div class="table-list-inner">使用者</div>
        <div class="table-list-inner">角色</div>
        <div class="table-list-inner">手机号</div>
        <div class="table-list-inner">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{status}}<i class="el-icon--right el-icon-arrow-down" :class="{'el-icon-arrow-up': show }"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <span v-for="(table, index) in statusItems">
                <el-dropdown-item :command="table.status">{{table.name}}</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="table-list-inner">操作</div>
      </div>
      <div v-loading="loading">
        <div class="table-list-body" v-for="(table, index) in tableItems2" @mouseenter="table.show = true" @mouseleave="table.show = false" >
          <div class="table-body-inner" :class="{'col-F7':table.show}" >{{table.accoutName}}</div>
          <div class="table-body-inner" :class="{'col-F7':table.show}" @click="ModifySubaccount(table.accountId)">
            <span v-if="table.show" style="color:#1C6EEB;">{{table.roleName}}<i class="el-icon-edit-outline"></i></span>
            <span v-else>{{table.roleName}}</span>
          </div>
          <div class="table-body-inner" :class="{'col-F7':table.show}">
            {{table.phoneNumber}}
          </div>
          <div class="table-body-inner" :class="{'col-F7':table.show}">
            <span v-if="table.status === '0'">未启用</span>
            <span v-else-if="table.status === '1'">已停用</span>
            <span v-else-if="table.status === '2'">使用中</span>
            <span v-else-if="table.status === '3'">已注销</span>
          </div>
          <div class="table-body-inner" :class="{'col-F7':table.show}">
            <span v-if="table.status === '0'">
              <el-button type="text" size="mini">注销</el-button>
            </span>
            <span v-else-if="table.status === '1'">
              <el-button size="mini" @click="enable(table)">启用</el-button>
              <el-button type="text" size="mini">注销</el-button>
            </span>
            <span v-else-if="table.status === '2'">
              <el-button size="mini" @click="disEnable(table)">停用</el-button>
              <el-button type="text" size="mini">注销</el-button>
            </span>
            <span v-else-if="table.status === '3'"></span>
          </div>
        </div>
        <div style="clear:box;"></div>
      </div>
      <div v-show="disabledPu">
        <div style="border-bottom:1px solid #E2E2E2">
          <div style="text-align:center;padding-top:50px;padding-bottom:30px">
            <!--<div class="iconfont icon-shangpinliebiaokong" style="font-size:140px;color:#F18115"></div>-->
            <img width="132px" src="../../../reception/identification/imgs/no-buy.png" />
            <div style="margin-top:20px;color:#666666;font-size:14px;margin-bottom:20px">暂无子账号</div>
            <div class="goBuy" style="height:38px;line-height:38px" @click="">
              <el-button size="medium" style="width:150px;margin-bottom:20px;">去创建</el-button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="project-pagination" style="text-align:center;margin-bottom:25px" v-show="!disabledPu">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :current-page="pageNo"
        @current-change="pageChange"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import SettingTitle from '@/components/common/settingTitle'
import { findSubAccountList, updateSubAccount } from '@/api/person/subaccount/subaccount'
import { getUserInfo } from '@/utils/auth'
export default {
  name: 'Subaccount',
  components: {
    SettingTitle: SettingTitle
  },
  data () {
    return {
      subAccountList: [],
      titleName: '子账户管理',
      show: true,
      status: '全部状态',
      statusValue: '',
      disabledPu: false,
      pageNo: 1,
      pageSize: 10,
      totalSize: 9,
      loading: false,
      userId: getUserInfo().userId || 1,
      tableItems: [
        {
          name: '受用者',
          width: 1
        },
        {
          name: '角色',
          width: 2
        },
        {
          name: '手机号',
          width: 3
        },
        {
          name: '状态',
          width: 4
        },
        {
          name: '操作',
          width: 5
        }
      ],
      statusItems: [
        {
          name: '全部状态',
          status: ''
        },
        {
          name: '使用中',
          status: 2
        },
        {
          name: '已停用',
          status: 1
        },
        {
          name: '未启用',
          status: 0
        },
        {
          name: '已注销',
          status: 3
        }
      ],
      tableItems2: [
        {
          name: 'qqq',
          show: false,
          width: 192
        },
        {
          name: 'qqq',
          show: false,
          width: 192
        },
        {
          name: 'zzz',
          show: false,
          width: 192
        },
        {
          name: 'zzz',
          show: false,
          width: 192
        },
        {
          name: 'zzz',
          show: false,
          width: 192
        }
      ],
    }
  },
  mounted() {
    this.findSubAccountList()
  },
  methods: {
    // 添加子账户
    addSubaccount () {
      this.$router.push({path: '/setting/accountSetting/addSubaccount'})
    },
    ModifySubaccount (accountId) {
      this.$router.push({
        path: '/setting/accountSetting/ModifySubaccount',
        query: {
          accountId: accountId
        }
      })
    },
    handleCommand (item) {
      console.log('item', item)
      this.show = true
      this.statusItems.forEach(itemTabes => {
        if (itemTabes.status === item) {
          this.status = itemTabes.name
          this.statusValue = itemTabes.status
          this.findSubAccountList()
        }
      })
    },
    findSubAccountList () {
      this.loading = true
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        parentAccountId: this.userId,
        status: this.statusValue
      }
      findSubAccountList(params).then((res) => {
        if (res.data.code === 200 && res.data.data.subAccountList && res.data.data.subAccountList.length > 0) {
          this.disabledPu = false
          res.data.data.subAccountList.forEach(item => {
            item.show = false
          })
          this.tableItems2 = res.data.data.subAccountList
          setTimeout(() => {
            this.loading = false
          }, 1000)
          // this.totalSize = res.data.totalSize
        } else {
          res.data.data.subAccountList.forEach(item => {
            item.show = false
          })
          this.tableItems2 = res.data.data.subAccountList
          this.disabledPu = true
          this.loading = false
        }
      })
    },
    // 启用
    enable (item) {
      let params = {
        accountId: item.accountId,
        parentAccountId: this.userId,
        parentAccoutName: getUserInfo().userName,
        status: 2
      }
      updateSubAccount(params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '启用成功！',
            type: 'success'
          })
          this.findSubAccountList()
        }
      })
    },
    // 停用
    disEnable (item) {
      let params = {
        accountId: item.accountId,
        parentAccountId: this.userId,
        parentAccoutName: getUserInfo().userName,
        status: 1
      }
      updateSubAccount(params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '停用成功！',
            type: 'success'
          })
          this.findSubAccountList()
        }
      })
    },
    pageChange (page) {
      this.pageNo = page
      this.findSubAccountList()
    }
  }
}
</script>
<style lang="sass">
  @import "./index"
</style>
