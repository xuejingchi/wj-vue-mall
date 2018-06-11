<template>
  <section class="identify-intro-page">
    <header class="identify-intro-header">
      <h3 class="intro-header-title">
        供应商入驻介绍
      </h3>
      <p class="intro-header-text">
        供应商入驻是指在商户通过平台审核，同时进驻平台线下体验馆，成为平台指定供应商的过程
      </p>
    </header>
    <section class="intro-main-body">
      <h2 class="intro-main-title">
        入驻申请流程
      </h2>
      <div class="main-body-wrapper">
        <ul class="intro-steps-line">
          <li class="intro-steps-item" v-for="(item, index) in firstSteps">
            <div class="intro-item-top">
              <span class="item-top-left">
                {{ item.num }}
              </span>
              <span class="item-top-right">
                {{ item.title }}
              </span>
              <span class="item-top-triangle"></span>
            </div>
            <p class="intro-item-text">{{ item.text }}</p>
          </li>
        </ul>
        <ul class="intro-steps-line">
          <li class="intro-steps-item" v-for="(item, index) in secondSteps">
            <div class="intro-item-top">
              <span class="item-top-left">
                {{ item.num }}
              </span>
              <span class="item-top-right">
                {{ item.title }}
              </span>
              <span class="item-top-triangle"></span>
            </div>
            <p class="intro-item-text">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <div class="main-body-btn">
      <div class="body-next-btn" @click="changeRoute('provider')">成为合作采购商</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'indenficationIntro',
  data () {
    return {
      firstSteps: [{
        num: 1,
        title: '注册商城账号',
        text: '注册商城账号，可以查看商城能够提供的平台服务'
      }, {
        num: 2,
        title: '完善企业和品牌信息',
        text: '计划入驻商城平台，成为平台供货商，完善企业信息和品牌信息，提供相应的资质证明材料'
      }, {
        num: 3,
        title: '资格审核',
        text: '商城平台完成企业信息和品牌信息的审核，签订订单和线下体验馆入驻协议，成为商城平台货品供应商'
      }],
      secondSteps: [{
        num: 6,
        title: '企业入驻',
        text: '线上商城和线下体验中心入驻，包括商城信息录入，体验中心布展'
      }, {
        num: 5,
        title: '商务洽谈／协议签订',
        text: '进行技术／商务／体验中心展示等洽谈，达成一致后签订战略合作协和体验中心入驻协议'
      }, {
        num: 4,
        title: '考察评估',
        text: '拜访一项合作工厂进行实地考察评估'
      }]
    }
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
