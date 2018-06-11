<template>
  <div id="login-model" v-if="mdShow">
    <el-dialog :visible.sync="showDialog" width="466px">
      <div style="padding:0 50px">
        <div style="margin-top:35px;margin-bottom:40px;">
          <span class="login-titel" :class="{ active: isActive }" @click="changeAccount">账号登录</span>
          <span class="login-titel" :class="{ active: isActiveCode }" @click="changeCode">验证码登录</span>
        </div>
        <div v-if="isActive" key="1">
          <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" class="demo-ruleForm">
            <el-form-item prop="phoneNumber" :rules="isActive === true ? rules1.phoneNumber:[]">
              <el-input type=" " v-model="ruleForm1.phoneNumber" auto-complete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="isActive === true ? rules1.password:[]">
              <el-input type="password" v-model="ruleForm1.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item v-if="needVerify">
              <verify :phoneNumber="ruleForm1.phoneNumber" @verifySuccess="rule1VerifySuccess"></verify>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPassWord('ruleForm1')" style="width:100%">登录</el-button>
            </el-form-item>
            <div style="text-align:right;margin-top:35px;margin-bottom:60px">
              <span class="login-password" @click="goForget">忘记密码?</span>
              <span class="login-register" @click="goRegister">免费注册></span>
            </div>
          </el-form>
        </div>
        <div v-if="isActiveCode" key="2">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <el-form-item prop="phoneNumber" :rules="isActiveCode === true ? rules2.phoneNumber:[]">
              <el-input type="" v-model="ruleForm2.phoneNumber" auto-complete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode" :rules="isActiveCode === true ? rules2.verifyCode:[]">
              <el-input type="" v-model="ruleForm2.verifyCode" auto-complete="off" placeholder="短信验证码" style="width:200px"></el-input>
              <span class="send-code" @click="sendCode">{{count}}</span>
            </el-form-item>
            <el-form-item v-if="needVerify">
              <verify :phoneNumber="ruleForm1.phoneNumber" @verifySuccess="rule2VerifySuccess"></verify>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%">登录</el-button>
            </el-form-item>
            <div style="text-align:right;margin-top:35px;margin-bottom:60px">
              <span class="login-password" @click="goForget">忘记密码?</span>
              <span class="login-register" @click="goRegister">免费注册></span>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import { sendSmsCode, login } from '@/api/reception/register/register'
  import { setCustomerLevel, setToken, setUserId, setCompanyId, setVerifyNum, getVerifyNum, removeVerifyNum, setUserInfo, setCompanyStatus, setCompanyName, setCompanyFlag, setAccountFlag, setPhoneNumber, setUserName } from '@/utils/auth'
  import verify from '@/components/common/login/verify.vue'
  export default {
    props: ['mdShow'],
    data () {
      return {
        needVerify: false,
        isActive: true,
        isActiveCode: false,
        showDialog: false,
        count: '发送验证码',
        timeCode: 60,
        timer: null,
        ruleForm1: {
          phoneNumber: '',
          password: '',
        },
        ruleForm2: {
          phoneNumber: '',
          verifyCode: '',
        },
        rules1: {
          phoneNumber: [
            { required: true, message: '请输入手机号码', trigger: 'change' },
            { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确手机号码格式！', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ]
        },
        rules2: {
          phoneNumber: [
            { required: true, message: '请输入手机号码', trigger: 'change' },
            { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确手机号码格式！', trigger: 'change' }
          ],
          verifyCode: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 6, message: '验证码长度在6个字符', trigger: 'change' },
          ]
        }
      }
    },
    watch: {
      mdShow (newVal) {
        this.showDialog = newVal
      },
      showDialog (newVal) {
        this.$emit('modelStatusChange', newVal)
      }
    },
    methods: {
      rule1VerifySuccess () {
        this.needVerify = false
      },
      rule2VerifySuccess () {
        this.needVerify = false
      },
      submitPassWord(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let num = Number(getVerifyNum()) || 0
            setVerifyNum(Number(num + 1))
            let params = {
              phoneNumber: this.ruleForm1.phoneNumber,
              password: this.ruleForm1.password,
              type: 0
            }
            login(params).then((res) => {
              if (res.data.code === 200) {
                setToken(res.data.data.token)
                setUserId(res.data.data.userId)
                setCompanyId(res.data.data.companyId)
                setCompanyStatus(res.data.data.companyStatus)
                setCompanyName(res.data.data.companyName)
                setCompanyFlag(res.data.data.companyFlag)
                setAccountFlag(res.data.data.accountFlag)
                setCustomerLevel(res.data.data.customerLevel)
                setPhoneNumber(res.data.data.phoneNumber)
                setUserName(res.data.data.userName)
                setUserInfo(JSON.stringify(res.data.data))
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$emit('loginSuccess')
                window.location.reload()
                removeVerifyNum(num)
              } else if (num > 2) {
                this.needVerify = true
                this.$message({
                  message: res.data.data,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: res.data.data,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let num = Number(getVerifyNum()) || 0
            setVerifyNum(Number(num + 1))
            let params = {
              phoneNumber: this.ruleForm2.phoneNumber,
              password: this.ruleForm2.verifyCode,
              type: 1
            }
            login(params).then((res) => {
              if (res.data.code === 200) {
                setToken(res.data.data.token)
                setUserId(res.data.data.userId)
                setCompanyId(res.data.data.companyId)
                setCompanyStatus(res.data.data.companyStatus)
                setCompanyName(res.data.data.companyName)
                setCompanyFlag(res.data.data.companyFlag)
                setAccountFlag(res.data.data.accountFlag)
                setCustomerLevel(res.data.data.customerLevel)
                setPhoneNumber(res.data.data.phoneNumber)
                setUserName(res.data.data.userName)
                setUserInfo(JSON.stringify(res.data.data))
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$emit('loginSuccess')
                removeVerifyNum(num)
                window.location.reload()
              } else if (num > 2) {
                this.needVerify = true
                this.$message({
                  message: res.data.data,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: res.data.data,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      changeAccount() {
        this.isActive = true
        this.isActiveCode = false
      },
      changeCode() {
        this.isActive = false
        this.isActiveCode = true
      },
      sendCode() {
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (this.ruleForm2.phoneNumber.length !== 11) {
          this.$message({
            message: '请输入正确的手机号码！',
            type: 'error'
          })
          return false
        } else if (!myreg.test(this.ruleForm2.phoneNumber)) {
          this.$message({
            message: '请输入正确的手机号码！',
            type: 'error'
          })
          return false
        }
        let parmas = {
          phoneNumber: this.ruleForm2.phoneNumber
        }
        sendSmsCode(parmas).then((res) => {
          if (res.data && res.data.code === 200) {
            const time = 60
            if (!this.timer) {
              this.count = `重新发送${this.timeCode}s`
              this.timer = setInterval(() => {
                if (this.timeCode > 0 && this.timeCode <= time) {
                  this.timeCode = this.timeCode - 1
                  this.count = `重新发送${this.timeCode}s`
                } else {
                  clearInterval(this.timer)
                  this.timer = null
                  this.count = '发送验证码'
                  this.timeCode = 60
                }
              }, 1000)
            }
          }
        })
      },
      goRegister() {
        this.showDialog = false
        this.$router.push({ path: '/register' })
      },
      goForget() {
        this.showDialog = false
        this.$router.push({ path: '/forget' })
      }
    },
    created () {
    },
    components: {
      verify
    }
  }
</script>
<style scoped lang="scss">
  #login-model {
    .active {
      border-bottom: 4px solid #25B369;
      font-size: 22px !important;
      color: #333333 !important;
      padding: 5px 0;
    }
    .login-titel {
      font-size: 19px;
      color: #999999;
      height: 28px;
      line-height: 28px;
      margin-right: 42px;
    }
    .send-code{
      background: #DDDDDD;
      padding:10px 24px;
      border: 1px solid #CCCCCC;
      border-radius: 2px;
    }
    .login-password{
      font-size: 14px;
      color: #333333;
      margin-right: 6px;
    }
    .login-register{
      font-size: 14px;
      color: #FF7515;
    }
  }
</style>
