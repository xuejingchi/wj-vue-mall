<template>
  <el-dialog
    class="model-homepage-model"
    :visible.sync="dialogVisible"
    width="600"
    height="680">
    <section class="model-root-page">
      <!-- 文字描述 -->
      <section class="model-main-text">
        <p class="model-main-title">
          尊敬的用户：
        </p>
        <p class="model-main-text">
          您好，欢迎您使用万郡绿建商城，为了您更好的获取商城的服务，请选择您的身份。如想了解更多，可以联系客服。
        </p>
      </section>
      <!-- 主要内容 -->
      <section class="model-main-content">
        <header class="model-main-header">
          <ul class="main-header-list">
            <li v-for="(role, index) in roleList" :class="{ active: roleIndex === index }" class="main-header-item" @click="changeRoleIndex(index)">{{ role.name }}</li>
          </ul>
          <!-- 下划线 -->
          <span :style="{ left: roleIndex * (60 + 40) + 'px' }" class="main-header-underline"></span>
          <div class="main-header-right">
            <i style="font-size: 16px; color: #666666; transform: translate(0, 5px); display: inline-block;" class="iconfont">&#xe636;</i>
            <span class="header-service-num">400-826-7880</span>
            <button class="header-service-btn">
              <a href="http://wpa.qq.com/msgrd?v=3&uin=2034919445&site=qq&menu=yes" target="_blank">
                <i style="font-size: 12px; color: #000;" class="iconfont icon-QQgai"></i>
                在线咨询
              </a>
            </button>
          </div>
        </header>
        <div v-if="roleIndex === 0" class="model-main-body">
          <ul class="main-img-list">
            <li v-for="(item, index) in buyerImgList" class="img-list-item">
              <img :src="item.src">
              <span class="item-top-icon">{{ index + 1 }}</span>
            </li>
          </ul>
          <p class="main-body-text">我是需方，我要入驻商城</p>
          <div class="main-body-btn">
            <div class="body-next-btn" @click="changeRoute('/identification/intro/buyer')">成为合作采购商</div>
          </div>
        </div>
        <div v-if="roleIndex === 1" class="model-main-body">
          <ul class="main-img-list">
            <li v-for="(item, index) in supplierImgList" class="img-list-item">
              <img class="item-main-img" :src="item.src">
              <span class="item-top-icon">{{ index + 1 }}</span>
            </li>
          </ul>
          <p class="main-body-text">我是供方，我要入驻商城</p>
          <div class="main-body-btn">
            <div class="body-next-btn" @click="changeRoute('/identification/intro/provider')">成为合作供应商</div>
          </div>
        </div>
      </section>
      <!-- 案例介绍 -->
      <section class="identifiy-case-intro">
        <h3 class="case-intro-title">案例介绍</h3>
        <ul class="case-img-list">
          <li v-for="item in footerImgList" class="case-img-item">
            <img :src="item.src">
          </li>
        </ul>
      </section>
    </section>
  </el-dialog>
</template>

<script>
  export default {
    name: 'modelRoot',
    data () {
      return {
        dialogVisible: false,
        roleList: [{
          id: 0,
          name: '需方'
        }, {
          id: 1,
          name: '供方'
        }],
        buyerImgList: [{
          src: require('./imgs/buyer_img_0@2x.png')
        }, {
          src: require('./imgs/buyer_img_1@2x.png')
        }, {
          src: require('./imgs/buyer_img_2@2x.png')
        }],
        supplierImgList: [{
          src: require('./imgs/supplier_img_0@2x.png')
        }, {
          src: require('./imgs/supplier_img_1@2x.png')
        }, {
          src: require('./imgs/supplier_img_2@2x.png')
        }],
        footerImgList: [{
          src: require('./imgs/footer_img_0@2x.png')
        }, {
          src: require('./imgs/footer_img_1@2x.png')
        }, {
          src: require('./imgs/footer_img_2@2x.png')
        }],
        roleIndex: 0
      }
    },
    methods: {
      /*
      * 切换角色
      * */
      changeRoleIndex (index) {
        this.roleIndex = index
      },
      /*
      * 切换路由
      * */
      changeRoute (path) {
        this.dialogVisible = false
        this.$router.push({
          path: path
        })
      }
    }
  }
</script>

<style lang="sass">
  @import "./identification"
</style>
