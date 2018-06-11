<template>
  <div id="login">
    <div class="shadow">
      <ul class="header">
        <li class="logo"></li>
        <li class="line"></li>
        <li class="lable">忘记密码</li>
        <li class="back" @click="backHp">返回</li>
      </ul>
    </div>
    <div class="forget-content">
      <div class="contact">请联系客服处理您的问题</div>
      <div class="tel-ask">
        <span class="ask">在线咨询</span>
        <span class="phone">400-826-7880</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'forget',
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      backHp() {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped lang="scss">
  #login{
    margin: 0 auto;
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
          text-align: right;
          height:54px;
          line-height:54px;
        }
      }
    }
    .forget-content{
      background: #fff;
      text-align: center;
      height: 700px;
      .contact{
        margin-top:153px;
        font-size: 28px;
        color: #333333;
        letter-spacing: 0;
      }
      .tel-ask{
        margin-top: 60px;
        height: 40px;
        .ask{
          line-height: 40px;
          height: 40px;
          background-image: linear-gradient(0deg, #F7F7F7 0%, #FFFFFF 100%);
          border: 1px solid #D2D2D2;
          border-radius: 2px;
          padding:10px 20px;
        }
        .phone{
          padding-top: 5px;
          margin-left: 22px;
          opacity: 0.8;
          font-family: PingFangSC-Semibold;
          font-size: 30px;
          color: #666666;
        }
      }
    }
  }
</style>
