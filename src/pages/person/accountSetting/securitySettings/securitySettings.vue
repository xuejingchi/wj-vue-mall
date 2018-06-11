<template>
  <div class="secyrity-setting">
    <div class="nav">
      <div class="line"></div>
      <p>安全设置</p>
    </div>
    <div class="box">
      <p class="title">安全服务</p>
      <ul class="content">
        <li>
          <p class="label iconfont icon-mimae">
            <span>登录密码</span>
          </p>
          <p class="des">建议您定期更改密码以保护账号安全，设置长度8～30位字符，至少数字、字母组合</p>
          <p class="btn" @click="change('psd')">修改</p>
        </li>
        <li>
          <p class="label iconfont icon-shouji">
            <span>手机号码</span>
          </p>
          <p class="des">修改手机号码，可更安全，方便找回账户</p>
          <p class="btn" @click="change('phone')">修改</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'securitySettings',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    // 点击修改
    change(id) {
      let path = id === 'psd' ? '/changePsd' : '/changePhone'
      this.$router.push({
        path: path
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .secyrity-setting {
    overflow:hidden;
    width:965px;
    .nav{
      height:30px;
      margin-top:30px;
      .line,p{
        float:left;
      }
      .line{
        width:4px;
        height:20px;
        margin-top:5px;
        margin-right:10px;
        background: #31B470;
      }
      p{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        height:30px;
        line-height:30px;
      }
    }
    .box{
      overflow:hidden;
      margin-top:16px;
      width:965px;
      height:238px;
      border: 1px solid #E2E2E2;
      .title{
        height:35px;
        line-height:35px;
        padding-left:14px;
        background: #F3F3F3;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
      }
      .content{
        overflow:hidden;
        padding:0px 40px;
        li{
          height:100px;
          padding:35px 0px;
          .label,.des,.btn{
            float:left;
            height:30px;
            line-height:30px;
          }
          .label{
            text-align:right;
            width:80px;
            margin-right:36px;
            span{
              height:30px;
              line-height:30px;
              float:left;
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #333333;
              font-weight:normal;
            }
          }
          .icon-mimae{
            color: rgb(38, 153, 236);
            font-size:16px;
            font-weight:600;
          }
          .icon-shouji{
            color:#FE8218;
            font-size:16px;
            font-weight:600;
          }
          .des{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            width:590px;
          }
          .btn{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #1C6EEB;
          }
        }
        li:first-child{
          border-bottom: 1px solid #E2E2E2;
        }
      }
    }
  }
</style>
