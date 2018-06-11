<template>
  <div id="suspension" v-show="showSuspension">
    <ul id="suspension-list">
      <li class="consult">
        <i class="iconfont">&#xe626;</i>
        <p class="text">咨询</p>
        <p class="text">客服</p>
        <div class="service">
          <span class="iconfont close-icon" @click="closeFloat()">&#xe605;</span>
          <div class="service-title">
            <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riIEyANaesAABbkbtPqxs363.png" alt="">
            <h3>咨询客服</h3>
          </div>
          <div class="service-content">
            <div class="service-txt">
              您好，欢迎光临！有什么问题随时联系我们...
            </div>
            <div class="service-button">
              <a href="http://wpa.qq.com/msgrd?v=3&uin=2034919445&site=qq&menu=yes" target="_blank">
                <span class="iconfont">&#xe629;</span>
                在线咨询
              </a>
            </div>
            <div class="service-tel">
              <div class="tel-item clearfix">
                <div class="f-l icon-tel">
                  <span class="iconfont">&#xe627;</span>
                </div>
                <div class="f-l tel-hot">
                  <span>采购热线：</span>
                  <p>0571-56077610</p>
                </div>
              </div>
              <div class="tel-item clearfix">
                <div class="f-l icon-tel">
                  <span class="iconfont">&#xe627;</span>
                </div>
                <div class="f-l tel-hot">
                  <span>供应商入驻：</span>
                  <p>0571-56077610</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="cart-content">
        <div class="cart-route" @click="toCart">
          <i class="iconfont">&#xe625;</i>
          <p class="text">购</p>
          <p class="text">物</p>
          <p class="text">车</p>
          <span class="cart-list" v-if="$store.state.purchaseList && $store.state.purchaseList !== null">{{ $store.state.purchaseList | filterNum }}</span>
        </div>
      </li>
      <li class="notebook">
        <router-link class="note-route" :to="{path: '/help'}">
          <i class="iconfont">&#xe628;</i>
          <p class="text">操作</p>
          <p class="text">手册</p>
        </router-link>
      </li>
      <li class="top" @click="toTop()">
        <i class="iconfont">&#xe62a;</i>
        <p class="text">TOP</p>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import { getCarNum } from '@/api/common/searchNav'
import { getUserInfo } from '@/utils/auth'
import { configAccountFlag } from '@/utils/identify.js'
export default {
  props: {
  },
  data () {
    return {
      showSuspension: true,
      userInfo: {
        userId: getUserInfo().userId,
        companyFlag: getUserInfo().companyFlag,
        companyStatus: getUserInfo().companyStatus
      }
    }
  },
  mounted() {
    this.isActive()
    this.getCarNum()
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    },
    closeFloat () {
      let consult = document.getElementsByClassName('consult')
      consult.className = 'consult'
    },
    toNpwStatus () {
      configAccountFlag(this)
    },
    getCarNum () {
      if (this.userInfo.userId) {
        let parmas = {
          userId: this.userInfo.userId
        }
        getCarNum(parmas).then((response) => {
          if (response.status === 200) {
            let num = response.data.data
            this.$store.commit('addPurchaseList', num)
          }
        })
      } else {
        this.carCount = 0
      }
    },
    toCart () {
      if (this.userInfo.userId !== '' && this.userInfo.userId !== undefined && this.userInfo.userId !== 'null' && this.userInfo.companyFlag === '2') {
        let route = this.$router.resolve({ path: '/purchaseList' })
        window.open(route.href, '_blank')
      } else if (this.userInfo.userId !== '' && this.userInfo.userId !== undefined && this.userInfo.userId !== 'null' && this.userInfo.companyFlag === '1') {
        this.$alert('供方不支持使用购物车，请更换为采购方身份登录', '不支持使用购物车', {
          confirmButtonText: '确定',
        })
      } else if (this.userInfo.userId !== '' && this.userInfo.userId !== undefined && this.userInfo.userId !== 'null' && this.userInfo.companyStatus !== '3' && this.userInfo.companyStatus !== 'null') {
        this.$alert('认证不支持使用购物车，请更换为采购方身份登录', '不支持使用购物车', {
          confirmButtonText: '确定',
        })
      } else {
        this.$router.push('/login')
      }
    },
    isActive () {
      let ul = document.getElementById('suspension-list')
      let li = ul.children
      li[0].onclick = function () {
        if (this.className.indexOf('active') === -1) {
          this.className += ' active'
        } else {
          let item = this.className
          let newItem = item.replace('active', '')
          this.className = newItem.replace(/(^\s*)|(\s*$)/g, '')
        }
      }
    }
  },
  created () {
  },
  components: {
  },
  watch: {
    $route (path) {
      if (path.path === '/' || path.path === '/brand' || path.path === '/solution' || path.path === '/experienceCenter' || path.path === '/supplyChain' || path.path === '/solution/solutionDetail' || path.path === '/brand/brandDetail' || path.path === '/help' || path.path === '/help/helpDetail' || path.path === '/goodsList' || path.path === '/goodsDetail') {
        this.showSuspension = true
        let ul = document.getElementById('suspension-list')
        let li = ul.children
        if (path.path.indexOf('help') !== -1) {
          console.log('help')
          li[2].className += ' active'
        } else {
          let j = 0
          for (;j < li.length; j++) {
            let tep = li[j].className
            let newTep = tep.replace('active', '')
            li[j].className = newTep.replace(/(^\s*)|(\s*$)/g, '')
          }
        }
      } else {
        this.showSuspension = false
      }
    }
  }
}
</script>
<style lang="sass">
  @import "../../css/common/suspensionBar/suspensionBar"
</style>
