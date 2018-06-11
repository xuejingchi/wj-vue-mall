<template>
  <div class="change-psd">
    <div class="header">
      <ul class="box">
        <li @click="backHp" class="logo"></li>
        <li class="line"></li>
        <li class="lable">修改密码</li>
      </ul>
    </div>
    <div class="container">
      <div class="body">
        <ul class="progress">
          <li class="iconfont icon-xiugaimimajindutiao"
              :class="{'icon-xiugaimimajindutiaogaoliang': curProgress >= 1}">
            <span>1. 验证身份</span>
          </li>
          <li class="iconfont icon-xiugaimimajindutiao"
              :class="{'icon-xiugaimimajindutiaogaoliang': curProgress >= 2}">
            <span>2. 修改密码</span>
          </li>
          <li class="iconfont icon-xiugaimimajindutiao"
              :class="{'icon-xiugaimimajindutiaogaoliang': curProgress >= 3}">
            <span>3. 完成</span>
          </li>
        </ul>
        <ul class="auth" v-if="curProgress === 1">
          <li class="one">
            <span>注册手机号码</span>
            <p class="phone">{{one.showPhoneNumber}}</p>
          </li>
          <li class="two" v-if="one.imgVerify">
            <span><i>*</i>滑动验证</span>
            <verify class="verify" :phoneNumber="`${one.phoneNumber}`" @verifySuccess="rule2VerifySuccess(1)"></verify>
          </li>
          <li class="three">
            <span><i>*</i>短信验证码</span>
            <el-input class="input" :maxlength="6" v-model.trim="one.verifyCode" placeholder="请输入短信验证码"></el-input>
            <el-button class="send" :class="{'sendDisable': this.timer !== null}" @click="sendCode">{{btnVal}}</el-button>
          </li>
          <li class="four">
            <el-button :disabled="!one.verifyCode.length" type="primary" @click="next">下一步</el-button>
          </li>
        </ul>
        <ul class="edit-psd" v-if="curProgress === 2">
          <li>
            <span><i>*</i>设置密码</span>
            <el-input class="input" v-model="two.password"
                      type="password" @change="checkPsd"
                      ref="psd1"
                      placeholder="8～30位字符，至少数字、字母组合">
            </el-input>
            <p class="tips iconfont icon-gantanhao" v-if="two.showPsdTips"> {{two.psdTips}}</p>
          </li>
          <li>
            <span><i>*</i>确认密码</span>
            <el-input class="input" v-model="two.confirmPwd"
                      type="password" @change="confirmPsd"
                      ref="psd2"
                      placeholder="8位～30位字符，至少数字、字母组合">
            </el-input>
            <p class="tips iconfont icon-gantanhao" v-if="two.showConfirmTips"> {{two.confirmTips}}</p>
            <p class="tips iconfont icon-gantanhao" v-if="two.showConfirmTips2"> {{two.confirmTips2}}</p>
          </li>
          <li>
            <el-button class="button" type="primary" :disabled="(!two.password.length) || (!two.confirmPwd.length)" @click="submit">提交</el-button>
          </li>
        </ul>
        <div class="finish" v-if="curProgress === 3">
          <p class="label iconfont icon-shenhetongguo">
            <span>密码修改成功</span>
          </p>
          <el-button class="button" @click="goPage" type="primary">确定并返回账户中心</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as funSets from '@/api/person/securitySettings'
  import * as checkout from '@/api/common/checkout'
  import Verify from '@/components/common/login/verify.vue'
  import { getUserInfo, setVerifyNum, getVerifyNum, removeVerifyNum } from '@/utils/auth'
  export default {
    data () {
      return {
        curProgress: 1,
        curVerifyNum: 0, // 当前验证码验证次数
        one: {
          phoneNumber: getUserInfo().phoneNumber,
          showPhoneNumber: null,
          verifyCode: '',
          isSuccess: false,
          imgVerify: false, // 是否显示图片验证
        },
        two: {
          password: '',
          confirmPwd: '',
          showPsdTips: false,
          psdTips: '密码格式输入不正确',
          showConfirmTips: false,
          confirmTips: '密码格式输入不正确',
          showConfirmTips2: false,
          confirmTips2: '两次密码输入不一致'
        },
        btnVal: '发送验证码',
        timeCode: 60,
        timer: null
      }
    },
    created () {
    },
    beforeMount () {
      this.getVerifyNumFun()
      let query = {
        userId: getUserInfo().userId
      }
      this.getUserInfo(query)
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      // 返回首页
      backHp() {
        this.$router.push({
          path: '/'
        })
      },
      // 获取用户信息
      getUserInfo(query) {
        funSets.getUserInfoByUserId(query).then(
          res => {
            let phoneNumber = res.data.data.phoneNumber
            this.one.phoneNumber = phoneNumber
            this.one.showPhoneNumber = `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7, 11)}`
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 获取当前验证码验证次数
      getVerifyNumFun() {
        let num = getVerifyNum() === undefined ? 0 : getVerifyNum()
        num = Number(num)
        this.curVerifyNum = num
        if (num > 3) {
          this.one.imgVerify = true
        }
      },
      // 点击下一步
      next() {
        let query = {
          phoneNumber: this.one.phoneNumber,
          verifyCode: this.one.verifyCode
        }
        if (this.one.imgVerify) {
          this.$message.error('图片验证未通过！')
          return
        }
        funSets.checkVerifyCode(query).then(
          res => {
            if (res.data.code === 200) {
              this.curProgress = 2
              removeVerifyNum()
            } else if (res.data.code === 13004) {
              this.getVerifyNumFun()
              let num = this.curVerifyNum + 1
              if (num >= 3) {
                this.one.imgVerify = true
              }
              setVerifyNum(num)
              this.$message.error('验证码错误！')
            } else {
              this.$message.error(res.data.data)
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 校验密码
      checkPsd() {
        this.two.showPsdTips = !checkout.password(this.two.password)
        if (this.two.showPsdTips) {
          this.$refs.psd1.focus()
        }
      },
      // 确认密码时校验
      confirmPsd() {
        this.two.showConfirmTips = !checkout.password(this.two.confirmPwd)
        if (this.two.showConfirmTips) {
          this.$refs.psd2.focus()
        }
      },
      // 修改密码后提交
      submit() {
        if (!this.two.password.length) {
          this.$refs.psd1.focus()
          return
        }
        if (!this.two.confirmPwd.length) {
          this.$refs.psd2.focus()
          return
        }
        if (this.two.showConfirmTips) {
          return
        }
        if (this.two.password === this.two.confirmPwd) {
          this.two.showConfirmTips2 = false
          let query = {
            phoneNumber: this.one.phoneNumber,
            password: this.two.password,
            confirmPwd: this.two.confirmPwd
          }
          funSets.modifyPassword(query).then(
            res => {
              if (res.data.code === 200) {
                this.curProgress = 3
              } else {
                this.$message.error('密码修改失败！')
              }
            }
          ).catch(
            err => {
              this.$message.error(err)
            }
          )
        } else {
          this.two.showConfirmTips2 = true
          this.$refs.psd2.focus()
        }
      },
      // 验证码
      sendCode() {
        const time = 60
        if (!this.timer) {
          this.btnVal = `重新发送${this.timeCode}s`
          this.timer = setInterval(() => {
            if (this.timeCode > 0 && this.timeCode <= time) {
              this.timeCode = this.timeCode - 1
              this.btnVal = `重新发送${this.timeCode}s`
            } else {
              clearInterval(this.timer)
              this.timer = null
              this.btnVal = '发送验证码'
              this.timeCode = 60
            }
          }, 1000)
        }
        let query = {
          phoneNumber: this.one.phoneNumber,
        }
        funSets.sendSmsCode(query).then(
          res => {
            console.log(res)
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 图片校验成功函数
      rule2VerifySuccess(id) {
        if (id === 1) {
          this.one.isSuccess = true
          this.one.imgVerify = false
        }
      },
      // 返回账户中心
      goPage() {
        this.$router.push({
          path: 'setting/accountSetting/'
        })
      }
    },
    components: {
      Verify
    },
    watch: {
      $route() {
        window.location.reload()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .change-psd {
    overflow:hidden;
    .header{
      overflow:hidden;
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.05);
      .box{
        width:1200px;
        overflow:hidden;
        margin-left:calc(50% - 600px);
        height: 80px;
        background: #FFFFFF;
        padding: 13px 0;
        li {
          float: left;
        }
        .logo {
          width: 164px;
          height: 54px;
          background: url(../../../assets/person/securitySettings/logo2x.png) no-repeat;
          background: image-set(url(../../../assets/person/securitySettings/logo2x.png) 2x,url(../../../assets/person/securitySettings/logo3x.png) 3x) no-repeat;
          background-size: contain;
        }
        .line {
          height: 40px;
          border-left: 1px solid #C0C0C0;
          margin: 8px 20px;
        }
        .lable {
          height: 54px;
          line-height: 54px;
          font-size: 18px;
          color: #333333;
          font-family: PingFangSC-Semibold;
        }
        .back {
          float: right;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          text-align: right;
          height: 54px;
          line-height: 54px;
        }
      }
    }
    .container {
      overflow: hidden;
      width: 1202px;
      margin-left: calc(50% - 600px);
      .body {
        overflow: hidden;
        width: 680px;
        margin-top: 40px;
        margin-left: calc(50% - 340px);
        .progress {
          overflow: hidden;
          li {
            position: relative;
            width: 226px;
            height: 24px;
            float: left;
            font-size: 24px;
            line-height: 24px;
            color: #21A458;
            span {
              display: block;
              position: relative;
              width: 226px;
              height: 24px;
              top: -24px;
              left: 0px;
              text-align: center;
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #21A458;
            }
          }
          .icon-xiugaimimajindutiaogaoliang {
            span {
              color: #ffffff;
            }
          }
        }
        .auth {
          overflow: hidden;
          margin-top: 80px;
          width: 460px;
          margin-left: 110px;
          li {
            height: 40px;
            margin-bottom: 20px;
            span, p, .input {
              float: left;
            }
            span {
              width: 90px;
              text-align: right;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: #151515;
              margin-right: 20px;
            }
            .verify{
              float:left;
              margin-top:10px;
            }
            .phone {
              width: 300px;
              text-align: left;
              font-size: 18px;
              color: #333333;
              height: 40px;
              line-height: 40px;
            }
            i {
              font-size: 14px;
              color: #D0021B;
              padding-right: 6px;
              font-style: normal
            }
            .input {
              width: 200px;
              margin-right: 10px;
            }
          }
          .one {
            span {
              color: #333333;
            }
          }
          .two{
            height:270px;
          }
          .three {
            .send {
              width: 136px;
              background: #FF7515;
              border: 1px solid #D05B0B;
              border-radius: 2px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #ffffff;
              text-align: center;
            }
            .sendDisable{
              background: #DDDDDD;
              border: 1px solid #CCCCCC;
            }
          }
          .four {
            margin-top: 60px;
            button {
              width: 348px;
              float: right;
              margin-right: 3px;
            }
          }
        }
        .edit-psd {
          overflow: hidden;
          margin-top: 80px;
          width: 460px;
          margin-left: 110px;
          li {
            height: 40px;
            margin-bottom: 30px;
            position:relative;
            span, .input {
              float: left;
            }
            span {
              width: 90px;
              text-align: right;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: #151515;
              margin-right: 20px;
            }
            i {
              font-size: 14px;
              color: #D0021B;
              padding-right: 6px;
              font-style: normal
            }
            .input {
              width: 350px;
            }
            .button{
              float:right;
              margin-right:0px;
              width:350px;
              margin-top:60px;
            }
            .tips{
              position:absolute;
              bottom:-22px;
              left:118px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #EB0700;
            }
          }
        }
        .finish{
          width:250px;
          overflow:hidden;
          margin-left:calc(50% - 125px);
          margin-top:148px;
          .label{
            height:40px;
            font-size:34px;
            line-height:40px;
            color:#43B655;
            span{
              float:right;
              font-family: PingFangSC-Regular;
              font-size: 28px;
              color: #333333;
              text-align: center;
              display:inline-block;
              height:40px;
              margin-right:25px;
              line-height:36px;
            }
          }
          .button{
            width:200px;
            margin-top:70px;
            font-size: 14px;
            color: #FFFFFF;
            margin-left:25px;
          }
        }
      }
    }
  }
</style>
