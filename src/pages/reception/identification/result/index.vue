<template>
  <section class="identify-result-page">
    <div class="identify-result-main">
      <h2 class="identify-result-title">
        <i style="color: #43B655; font-size: 34px; vertical-align: middle;" class="iconfont icon-shenhetongguo"></i>
        企业认证信息已经提交成功，万郡绿建正在进行审核
      </h2>
      <p class="identify-result-tips">
        请您耐心等待
      </p>
    </div>
    <div class="identify-btn-part">
      <button class="identify-back-btn" @click="changeRoute('/')">返回首页</button>
    </div>
    <p class="identify-service-part">
      <!--有任何问题请联系客服客服电话-->
      <span class="service-part-left">有任何问题请联系客服 </span>
      <span class="service-part-right">客服电话：0571-56077610</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'identifyResult',
  data () {
    return {}
  },
  methods: {
    /*
    * 切换路由
    * */
    changeRoute (path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style lang="sass">
  @import "./index"
</style>
