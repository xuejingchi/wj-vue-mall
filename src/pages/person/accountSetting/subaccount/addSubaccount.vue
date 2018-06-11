<template>
  <div class="addSubaccount">
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
    <div class="list">
      <div class="account">子账户信息</div>
      <div class="body">
        <div class="titel">
          <i class="el-icon-warning"></i> 账号创建后，不支持修改和删除，请仔细考虑</div>
          <div style="margin-left:40px">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="140px" class="demo-ruleForm">
              <el-form-item label="使用者姓名：" prop="phoneNumber">
                <el-input v-model.trim="ruleForm2.phoneNumber" auto-complete="off" type="number"  placeholder="请输入手机号" style="width:300px"></el-input>
                <!-- <i class="font-styel color-2c iconfont icon-zhucedagou"></i> -->
              </el-form-item>
              <el-form-item label="手机号码：" prop="phoneNumber">
                <el-input v-model.trim="ruleForm2.phoneNumber" auto-complete="off" type="number"  placeholder="请输入手机号" style="width:300px"></el-input>
                <!-- <i class="font-styel color-2c iconfont icon-zhucedagou"></i> -->
              </el-form-item>
              <el-form-item label="使用者手机验证码：" prop="verifyCode">
                <el-input type="" v-model.trim="ruleForm2.verifyCode" auto-complete="off" placeholder="请输入短信验证码" style="width:200px"></el-input>
                <span class="send-code" @click="sendCode">{{count}}</span>
              </el-form-item>
              <!-- <el-form-item label="设置密码" prop="password">
                <el-input type="password" v-model.trim="ruleForm2.password" auto-complete="off" placeholder="8~30字符，由字母和数字组成" style="width:350px"></el-input>
              </el-form-item> -->
              <!-- <el-form-item v-if="needVerify" label="验证码">
                <verify :phoneNumber="ruleForm2.phoneNumber" @verifySuccess="verifySuccess"></verify>
              </el-form-item> -->
            </el-form>
          </div>
      </div>
      <div class="account">分配角色</div>
      <div class="role">
        <div class="role-select">
          <span>角色：</span>
          <el-radio-group v-model="ruleForm2.verifyCode" style="margin-left:28px;">
            <el-radio label="采购"></el-radio>
            <el-radio label="财务"></el-radio>
          </el-radio-group>
        </div>
        <div class="role-show">
          <div style="text">权限预览：</div>
          <div class="tree">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-account">
      <el-button type="primary" @click="submitForm()">确认创建</el-button>
    </div>
  </div>
</template>
<script>
import SettingTitle from '@/components/common/settingTitle'
// import { getAddressList } from '@/api/person/address/address'
export default {
  name: 'Subaccount',
  components: {
    SettingTitle: SettingTitle
  },
  data () {
    return {
      tableList: [],
      titleName: '子账户管理',
      show: false,
      sendDisable: true,
      status: '状态',
      count: '发送验证码',
      timeCode: 60,
      timer: null,
      ruleForm2: {
        phoneNumber: '',
        confirmPwd: '',
        password: '',
        verifyCode: '',
      },
      rules2: {
        phoneNumber: [
          { required: true, message: '手机号码有误，请重新输入', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请填写中国境内手机号码，境外手机号码注册请联系客服', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度在6个字符', trigger: 'blur' },
        ]
      },
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    // this.getAddress()
  },
  methods: {
    handleCommand (item) {
      this.show = true
      this.tableItems.forEach(itemTabes => {
        if (itemTabes.width === item) {
          this.status = itemTabes.name
        }
      })
    },
    // 短信发送验证码
    sendCode() {
      const time = 60
      if (!this.timer) {
        this.count = `重新发送${this.timeCode}s`
        this.sendDisable = false
        this.timer = setInterval(() => {
          if (this.timeCode > 0 && this.timeCode <= time) {
            this.timeCode = this.timeCode - 1
            this.count = `重新发送${this.timeCode}s`
          } else {
            clearInterval(this.timer)
            this.timer = null
            this.count = '发送验证码'
            this.sendDisable = true
            this.timeCode = 60
          }
        }, 1000)
      }
      // let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      // if (this.ruleForm2.phoneNumber.length !== 11) {
      //   this.$message({
      //     message: '手机号码有误，请重新输入！',
      //     type: 'error'
      //   })
      //   return false
      // } else if (!myreg.test(this.ruleForm2.phoneNumber)) {
      //   this.$message({
      //     message: '手机号码有误，请重新输入！',
      //     type: 'error'
      //   })
      //   return false
      // }
      // let parmas = {
      //   phoneNumber: this.ruleForm2.phoneNumber
      // }
      if (this.sendDisable) {
        // verifyPhone(parmas).then(res => {
        //   if (res.data.code === 200) {
        //     this.getSmsCode(parmas)
        //   } else {
        //     this.$message({
        //       message: res.data.data,
        //       type: 'error'
        //     })
        //   }
        // })
      }
    },
    handleNodeClick(data) {
      console.log(data)
    },
    submitForm () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 短信验证码接口
    // getSmsCode(parmas) {
    //   sendSmsCode(parmas).then((res) => {
    //     if (res.data && res.data.code === 200) {
    //       const time = 60
    //       if (!this.timer) {
    //         this.count = `重新发送${this.timeCode}s`
    //         this.sendDisable = false
    //         this.timer = setInterval(() => {
    //           if (this.timeCode > 0 && this.timeCode <= time) {
    //             this.timeCode = this.timeCode - 1
    //             this.count = `重新发送${this.timeCode}s`
    //           } else {
    //             clearInterval(this.timer)
    //             this.timer = null
    //             this.count = '发送验证码'
    //             this.sendDisable = true
    //             this.timeCode = 60
    //           }
    //         }, 1000)
    //       }
    //     }
    //   })
    // },
    // getAddress () {
    //   let params = {
    //     companyId: 'e629dbc72df5a96361b6237f3f945ea4'
    //   }
    //   getAddressList(params).then((response) => {
    //     if (response.data.code === 200) {
    //       response.data.data.forEach(item => {
    //         item.show = false
    //       })
    //       let data = response.data.data
    //       this.tableItems2 = data
    //     }
    //   })
    // }
  }
}
</script>
<style lang="sass">
  @import "./addSubaccount"
</style>
