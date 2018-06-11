<template>
  <section class="identify-intro-page">
    <header class="identify-intro-header">
      <h3 class="intro-header-title">
        需方会员介绍
      </h3>
      <p class="intro-header-text">
        采购商会员是指成为平台会员后，获取平台给予整套解决方案或平台采购商品的优惠资格
      </p>
      <img class="top-crown-img" src="./imgs/top_crown_bg@2x.png">
    </header>
    <section class="intro-main-body">
      <h2 class="intro-main-title">
        加入会员流程
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
              <i class="iconfont classify-icon" v-html="item.img"></i>
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
              <i class="item-top-triangle iconfont classify-icon" v-html="item.img"></i>
            </div>
            <p class="intro-item-text">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <div class="main-body-btn">
      <div class="body-next-btn" @click="changeRoute('/identification/check/buyer')">去填写资料</div>
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
          text: '注册商城账号，可以查看商城能够提供的平台服务',
          img: '&#xe618;'
        }, {
          num: 2,
          title: '完善企业信息',
          text: '成为商城平台会员，完善企业信息，提供相应的资质证明材料',
          img: '&#xe619;'
        }, {
          num: 3,
          title: '资格审核',
          text: '商城平台完成企业信息的审核，分配商务对接人员，提供专业的服务',
          img: '&#xe617;'
        }],
        secondSteps: [{
          num: 6,
          title: '商务洽谈',
          text: '进行体验馆参观，商务交流，提供需求梳理和',
          img: '&#xe617;'
        }, {
          num: 5,
          title: '协议签订',
          text: '达成一致后签订战略合作协议和协议签订',
          img: '&#xe619;'
        }, {
          num: 4,
          title: '账号权限',
          text: '账号信息确认，完善资料，服务人员分配',
          img: '&#xe618;'
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
