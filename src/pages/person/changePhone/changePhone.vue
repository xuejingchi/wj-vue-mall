<template>
  <div class="change-phone">
    <div class="header">
      <ul class="box">
        <li class="logo" @click="backHp()"></li>
        <li class="line"></li>
        <li class="lable">修改手机号</li>
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
            <span>2. 修改手机号</span>
          </li>
          <li class="iconfont icon-xiugaimimajindutiao"
              :class="{'icon-xiugaimimajindutiaogaoliang': curProgress >= 3}">
            <span>3. 完成</span>
          </li>
        </ul>
        <ul class="auth" v-if="curProgress === 1">
          <li class="one">
            <span><i>*</i>原手机号码</span>
            <div class="phone">{{one.showPhoneNumber}}</div>
            <p class="tips iconfont icon-gantanhao" v-if="one.showPhoneTips"> 手机号格式不正确</p>
          </li>
          <li class="two" v-if="one.imgVerify">
            <span><i>*</i>滑动验证</span>
            <verify key="1" class="verify" :phoneNumber="`${one.phoneNumber}`" @verifySuccess="rule2VerifySuccess(1)"></verify>
          </li>
          <li class="three">
            <span><i>*</i>短信验证码</span>
            <el-input class="input" v-model="one.verifyCode" placeholder="请输入短信验证码"></el-input>
            <el-button class="send" :class="{'sendDisable': this.timer1 !== null}"
                       @click="sendCode('timer1')">{{btnVal1}}</el-button>
            <p class="tips iconfont icon-gantanhao" v-if="one.showCodeTips"> 验证码不正确</p>
          </li>
          <li class="four">
            <el-button type="primary" :disabled="!one.verifyCode || !one.phoneNumber" @click="submit1">提交</el-button>
          </li>
        </ul>
        <ul class="auth" v-if="curProgress === 2">
          <li class="one">
            <span><i>*</i>新手机号码</span>
            <el-input class="input" ref="phone2" v-model="two.phoneNumber" @change="checkPhone(2)"></el-input>
            <p class="tips iconfont icon-gantanhao" v-if="two.showPhoneTips"> 手机号格式不正确</p>
          </li>
          <li class="two" v-if="two.imgVerify">
            <span><i>*</i>滑动验证</span>
            <verify key="2" class="verify" :phoneNumber="`${two.phoneNumber}`" @verifySuccess="rule2VerifySuccess(2)"></verify>
          </li>
          <li class="three">
            <span><i>*</i>短信验证码</span>
            <el-input class="input" ref="code" v-model="two.verifyCode" placeholder="请输入短信验证码"></el-input>
            <el-button class="send" :class="{'sendDisable': this.timer2 !== null}" @click="sendCode('timer2')">{{btnVal2}}</el-button>
            <p class="tips iconfont icon-gantanhao" v-if="two.showCodeTips"> 验证码不正确</p>
          </li>
          <li class="four">
            <el-button type="primary" :disabled="!two.phoneNumber || !two.verifyCode" @click="submit2">提交</el-button>
          </li>
        </ul>
        <div class="finish" v-if="curProgress === 3">
          <p class="label iconfont icon-shenhetongguo">
            <span>手机号修改成功!</span>
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
  import { verifyPhone } from '@/api/reception/register/register'
  import { getUserInfo, setVerifyNum, getVerifyNum, removeVerifyNum } from '@/utils/auth'
  export default {
    data () {
      return {
        curProgress: 1,
        curVerifyNum: 0, // 当前验证码验证次数
        // 第一步 验证身份
        one: {
          phoneNumber: getUserInfo().phoneNumber,
          showPhoneNumber: '',
          showPhoneTips: false,
          verifyCode: '',
          showCodeTips: false,
          isSuccess: false, // 验证成功
          imgVerify: false, // 是否显示图片验证
        },
        // 第二步 修改手机号
        two: {
          phoneNumber: null,
          showPhoneTips: false,
          verifyCode: null,
          showCodeTips: false,
          isSuccess: false, // 验证成功
          imgVerify: false, // 是否显示图片验证
        },
        timer1: null,
        timer2: null,
        btnVal1: '发送验证码',
        btnVal2: '发送验证码',
        timeCode1: 60,
        timeCode2: 60,
        stateNum: 0,
        pointY: null,
      }
    },
    created() {
    },
    beforeMount() {
      this.getVerifyNumFun()
    },
    mounted () {
      let query = {
        userId: getUserInfo().userId
      }
      this.getUserInfoByUserId(query)
      // removeVerifyNum()
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
      getUserInfoByUserId(query) {
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
        if (num > 2) {
          this.one.imgVerify = true
        }
      },
      // 发送验证码
      sendCode(id) {
        const time = 60
        if (id === 'timer1') {
          if (!this.timer1) {
            this.btnVal1 = `重新发送${this.timeCode1}s`
            this.timer1 = setInterval(() => {
              if (this.timeCode1 > 0 && this.timeCode1 <= time) {
                this.timeCode1 = this.timeCode1 - 1
                this.btnVal1 = `重新发送${this.timeCode1}s`
              } else {
                clearInterval(this.timer1)
                this.timer1 = null
                this.btnVal1 = '发送验证码'
                this.timeCode1 = 60
              }
            }, 1000)
          }
        } else {
          if (!this.timer2) {
            this.btnVal2 = `重新发送${this.timeCode2}s`
            this.timer2 = setInterval(() => {
              if (this.timeCode2 > 0 && this.timeCode2 <= time) {
                this.timeCode2 = this.timeCode2 - 1
                this.btnVal2 = `重新发送${this.timeCode2}s`
              } else {
                clearInterval(this.timer2)
                this.timer2 = null
                this.btnVal2 = '发送验证码'
                this.timeCode2 = 60
              }
            }, 1000)
          }
          const phoneNumber = {
            phoneNumber: this.two.phoneNumber
          }
          verifyPhone(phoneNumber).then((res) => {
            if (res.data.code !== 200) {
              this.$message.error(res.data.data)
            } else {
              funSets.sendSmsCode(phoneNumber).then(
                // res => {
                //   console.log(res)
                // }
              ).catch(
                err => {
                  this.$message.error(err)
                }
              )
            }
          })
        }
      },
      // 校验手机号
      checkPhone(id) {
        if (id === 1) {
          this.one.showPhoneTips = !checkout.phone(this.one.phoneNumber)
          if (this.one.showPhoneTips) {
            this.$refs.phone1.focus()
          }
        } else {
          this.two.showPhoneTips = !checkout.phone(this.two.phoneNumber)
          if (this.two.showPhoneTips) {
            this.$refs.phone2.focus()
          }
        }
      },
      // 提交原手机号信息
      submit1() {
        let query = {
          phoneNumber: this.one.phoneNumber,
          verifyCode: this.one.verifyCode
        }
        if (!this.one.phoneNumber) {
          this.$message.error('手机号码不能为空！')
          return
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
      // 提交新手机号信息
      submit2() {
        let query = {
          phoneNumber: this.two.phoneNumber,
          userId: getUserInfo().userId,
          verifyCode: this.two.verifyCode
        }
        if (this.two.imgVerify) {
          this.$message.error('图片验证未通过！')
          return
        }
        funSets.modifyPhone(query).then(
          res => {
            if (res.data.code === 200) {
              removeVerifyNum()
              this.curProgress = 3
            } else if (res.data.code === 13004) {
              this.getVerifyNumFun()
              let num = this.curVerifyNum + 1
              console.log('num', num)
              if (num >= 3) {
                this.two.imgVerify = true
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
      // 图片校验成功函数
      rule2VerifySuccess(id) {
        if (id === 1) {
          this.one.isSuccess = true
          this.one.imgVerify = false
        } else {
          this.two.isSuccess = true
          this.two.imgVerify = false
        }
      },
      // 返回账户中心
      goPage() {
        this.$router.push({
          path: 'setting/accountSetting/'
        })
      }
    },
    watch: {
      $route() {
        window.location.reload()
      }
    },
    components: {
      Verify
    }
  }
</script>
<style lang="scss" scoped>
  .change-phone {
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
          width: 510px;
          margin-left: 110px;
          li {
            height:40px;
            position:relative;
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
            .tips{
              position:absolute;
              bottom:-22px;
              left:118px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              color: #EB0700;
            }
          }
          .one {
            span {
              color: #333333;
            }
            .input{
              width:346px;
              margin-right:0px;
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
              color: #666666;
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
              float: left;
              margin-left:110px;
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
          }
        }
        .finish{
          width:280px;
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
            margin-left:35px;
          }
        }
      }
    }
  }
</style>
