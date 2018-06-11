<template>
  <div id="register" v-loading="loading">
    <div class="shadow">
      <ul class="header">
        <li class="logo" @click="goHome"></li>
        <li class="line"></li>
        <li class="lable">账号注册</li>
        <li class="back">我已经是会员，去<span @click="goLogin" style="color:#0854C6">登录</span></li>
      </ul>
    </div>
    <div class="content">
      <div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model.trim="ruleForm2.phoneNumber" @change="changePhone" auto-complete="off" type="number"  placeholder="请输入手机号" style="width:350px"></el-input>
            <!-- <i class="font-styel color-2c iconfont icon-zhucedagou"></i> -->
          </el-form-item>
          <el-form-item label="短信验证码" prop="verifyCode">
            <el-input type="" v-model.trim="ruleForm2.verifyCode" auto-complete="off" placeholder="请输入短信验证码" style="width:200px"></el-input>
            <span class="send-code" @click="sendCode">{{count}}</span>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input type="password" v-model.trim="ruleForm2.password" auto-complete="off" placeholder="8~30字符，由字母和数字组成" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="password" v-model.trim="ruleForm2.confirmPwd" auto-complete="off" placeholder="请再次输入密码" style="width:350px"></el-input>
          </el-form-item>
          <el-form-item v-if="needVerify" label="验证码">
            <verify :phoneNumber="ruleForm2.phoneNumber" @verifySuccess="verifySuccess"></verify>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="checked" size="medium"></el-checkbox>
            <span class="reading">我已阅读并同意 <span >
              <router-link target="_blank" class="color-2c" :to="{ path: '/protocol' }">《万郡绿建商城注册协议》</router-link></span></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" style="width:350px">立即注册</el-button>
          </el-form-item>
        </el-form>
        <div style="margin-left:33%;margin-top:30px;font-size: 14px;color: #333333;">有任何问题请联系客服</div>
        <div style="margin-left:32%;margin-top:20px;font-size: 24px;color: #333333;">0571-56077610</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { sendSmsCode, verifyPhone, register } from '@/api/reception/register/register'
  import verify from '@/components/common/login/verify.vue'
  import { setVerifyNum, getVerifyNum, removeVerifyNum } from '@/utils/auth'
  export default {
    name: 'register',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.confirmPwd !== '') {
            this.$refs.ruleForm2.validateField('confirmPwd')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        myTitle: '标题',
        needVerify: false,
        position: 50,
        canDrag: false,
        slideLeft: 0,
        slideTop: 0,
        sendDisable: true,
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521638641632&di=3f7080082a261b99973711b4135afa76&imgtype=0&src=http%3A%2F%2Fwww.people.com.cn%2Fmediafile%2Fpic%2F20180305%2F0%2F11081514267256913204.jpg',
        smallImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521638641632&di=3f7080082a261b99973711b4135afa76&imgtype=0&src=http%3A%2F%2Fwww.people.com.cn%2Fmediafile%2Fpic%2F20180305%2F0%2F11081514267256913204.jpg',
        isActive: true,
        isActiveCode: false,
        count: '发送验证码',
        timeCode: 60,
        timer: null,
        loading: false,
        ruleForm2: {
          phoneNumber: '',
          confirmPwd: '',
          password: '',
          verifyCode: '',
        },
        checked: true,
        rules2: {
          phoneNumber: [
            { required: true, message: '手机号码有误，请重新输入', trigger: 'blur' },
            { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请填写中国境内手机号码，境外手机号码注册请联系客服', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '验证码长度在6个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' },
            { pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,30}$/, message: '8~30字符，由字母和数字组成', trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        },
      }
    },
    // metaInfo: {
    //   title: this.myTitle,
    //   titleTemplate: '%s - by vue-meta',
    //   htmlAttrs: {
    //     lang: 'zh'
    //   },
    //   script: [{innerHTML: '', type: 'text/javascript'}],
    //   __dangerouslyDisableSanitizers: ['script']
    // },
    beforeCreate() {
      this.$nextTick(() => {
        console.log(this)
      })
    },
    created () {
      console.log(this.myTitle)
    },
    components: {
      verify
    },
    directives: {
      move(el) {
        var X
        el.onmousedown = function (e) {
          X = e.clientX - el.offsetLeft
          document.onmousemove = function (e) {
            var endx = e.clientX - X
            el.className = 'move moveBefore'
            el.style.left = `${endx}px`
            el.parentNode.parentNode.querySelector('.move-img').style.transform = `translate(${endx}px, 0)`
            var width = document.getElementById('movebox').offsetWidth - document.getElementById('move').offsetWidth
            el.parentNode.children[0].style.width = `${endx}px`
            el.parentNode.children[1].innerHTML = '拖动滑块验证'
            // 临界值小于
            if (endx <= 0) {
              el.style.left = '0px'
              el.parentNode.children[0].style.width = '0px'
              el.parentNode.parentNode.querySelector('.move-img').style.transform = 'translate(0, 0)'
            }
            // 临界值大于
            if (parseInt(el.style.left, 10) >= width) {
              el.parentNode.parentNode.querySelector('.move-img').style.transform = `translate(${width}px, 0)`
              el.style.left = `${width}px`
              el.parentNode.children[0].style.width = `${width}px`
              // el.parentNode.children[1].innerHTML = '验证通过'
              // el.className = 'move moveSuccess'
              // el.onmousedown = null
            }
            document.onmouseup = function () {
              document.onmousemove = null
            }
            el.parentNode.onmouseout = function () {
              setTimeout(() => {
                // el.className = 'move moveSuccess'
                // document.onmousemove = null
              }, 300)
            }
          }
        }
      }
    },
    mounted() {
      // 获取拼图
    },
    methods: {
      goHome () {
        this.$router.push({
          path: '/'
        })
      },
      /*
      * 验证通过
      * */
      verifySuccess () {
        this.needVerify = false
      },
      submitForm(formName) {
        if (!this.checked) {
          this.$message({
            message: '请勾选我已阅读并同意！',
            type: 'error'
          })
          return false
        }
        if (this.needVerify) {
          this.$message({
            message: '请通过滑动验证！',
            type: 'error'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let num = Number(getVerifyNum()) || 0
            setVerifyNum(Number(num + 1))
            let params = this.ruleForm2
            if (!this.needVerify) {
              register(params).then(res => {
                if (res && res.data && res.data.code === 200) {
                  this.$message({
                    message: res.data.data,
                    type: 'success'
                  })
                  removeVerifyNum(num)
                  this.loading = true
                  setTimeout(() => {
                    this.loading = false
                    this.$router.push({ path: '/login' })
                  }, 3000)
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
              this.$message({
                message: '请先拖动滑块验证！',
                type: 'error'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 校验手机号码
      changePhone() {
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.ruleForm2.phoneNumber)) {
          let parmas = {
            phoneNumber: this.ruleForm2.phoneNumber
          }
          if (this.ruleForm2.phoneNumber) {
            verifyPhone(parmas).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.data,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: res.data.data,
                  type: 'error'
                })
              }
            })
          }
        }
      },
      // 短信发送验证码
      sendCode() {
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (this.ruleForm2.phoneNumber.length !== 11) {
          this.$message({
            message: '手机号码有误，请重新输入！',
            type: 'error'
          })
          return false
        } else if (!myreg.test(this.ruleForm2.phoneNumber)) {
          this.$message({
            message: '手机号码有误，请重新输入！',
            type: 'error'
          })
          return false
        }
        let parmas = {
          phoneNumber: this.ruleForm2.phoneNumber
        }
        if (this.sendDisable) {
          verifyPhone(parmas).then(res => {
            if (res.data.code === 200) {
              this.getSmsCode(parmas)
            } else {
              this.$message({
                message: res.data.data,
                type: 'error'
              })
            }
          })
        }
      },
      goLogin() {
        this.$router.push({ path: '/login' })
      },
      // 短信验证码接口
      getSmsCode(parmas) {
        sendSmsCode(parmas).then((res) => {
          if (res.data && res.data.code === 200) {
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
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .movebox{
    position: relative;
    background-color: #e8e8e8;
    width: 292px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    .txt{
      position: absolute;
      top: 0px;
      width: 292px;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -o-user-select: none;
      -ms-user-select: none;
    }
    .movego{
       background-color: #7ac23c;
       height: 34px;
       width: 0px;
    }
    .move{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 40px;
      height: 34px;
      border: 1px solid #ccc;
      cursor: move;
       }
       .moveBefore{
       background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
       }
       .moveSuccess{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
       }
    }
  #register{
    margin: 0 auto;
    .color-2c{
     color: #2CAF64;
    }
    .font-styel{
      font-size: 14px;
      margin-left: 13px;
    }
    .shadow{
      box-shadow: 0 5px 5px 0 rgba(0,0,0,0.05);
      .header{
        width: 1200px;
        margin: 0 auto;
        height:80px;
        background: #FFFFFF;
        padding:13px 0;
        li{
          float:left;
        }
        .logo{
          width:164px;
          height:54px;
          background:url(../../../assets/person/securitySettings/logo2x.png) no-repeat;
          background-size:contain;
        }
        .line{
          height:40px;
          border-left: 1px solid #C0C0C0;
          margin:8px 20px;
        }
        .lable{
          height:54px;
          line-height:54px;
          font-size: 18px;
          color: #333333;
          font-family: PingFangSC-Semibold;
        }
        .back{
          float:right;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          height:54px;
          line-height:54px;
        }
      }
    }
    .content{
      width: 700px;
      margin: 0 auto;
      margin-top: 78px;
      height: 700px;
      .send-code{
        background: #DDDDDD;
        padding:10px 37px;
        border: 1px solid #CCCCCC;
        border-radius: 2px;
      }
      .reading{
        font-size: 13px;
        color: #333333;
        margin-left: 7px;
      }
    }
  }
</style>
<style>
.el-form-item__label {
  padding: 0px 21px 0 0 !important;
}
</style>
