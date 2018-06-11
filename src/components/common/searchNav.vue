<template>
  <div class="search-body">
    <div class="search-img" v-if="showAdd">
      <div class="bg" @click="supplierEnter">
        <i @click="clooseAd" class="el-icon-error"></i>
      </div>
    </div>
    <div class="search-nav">
      <div class="seacrh clearfix">
        <div class="log f-l clearfix">
          <router-link :to="{path: '/'}">
            <img class="logo" src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riEKuAcYYhAAAoSEZuWho865.png" alt="" width="350">
            <img class="version" src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriEKuAd6UYAAACgMZF8LM482.png" alt="" width="30">
          </router-link>
        </div>
        <div class="search-inp f-l clearfix">
          <!--<div class="f-l sele-class">-->
            <!--<el-select v-model="queryCondition.value" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
          <div class="f-l query-inp">
            <el-input
              v-model="queryCondition.input"
              @keyup.enter.native="pushGoodsList"
              placeholder="请输入内容"
              :maxlength="40">
            </el-input>
          </div>
          <div class="f-l query-btn">
            <el-button @click="pushGoodsList">搜索</el-button>
          </div>
        </div>
        <div class="f-l mark-order" v-if="userInfo.companyFlag !== '1'">
          <el-button href="#" class="make clearfix" @click="makeOrder">
            <i class="iconfont">&#xe695;</i>
            <span>
              发布采购需求
            </span>
          </el-button>
        </div>
        <div class="shop-car">
          <el-button href="#" class="clearfix" @click="confrimSubmit">
            <i class="iconfont">&#xe625;</i>
            <span>
              <em id="carNum" v-if="$store.state.purchaseList && $store.state.purchaseList !== null">{{ $store.state.purchaseList | filterNum }}</em>
              我的购物车
            </span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getCarNum } from '@/api/common/searchNav'
  import { getAcountFlag } from '@/api/person/identification'
  import store from '@/store'
  import { getUserInfo } from '@/utils/auth'
  import { configAccountFlag } from '@/utils/identify'
  export default {
    props: {
      keyWord: {
        type: String
      }
    },
    data () {
      return {
        showAdd: true,
        carCount: 1000,
        options: [{
          value: 'NORMAL',
          label: '产品'
        }],
        queryCondition: {
          value: 'NORMAL',
          input: '',
        },
        userInfo: getUserInfo()
      }
    },
    store,
    beforeMount() {
      this.queryCondition.input = this.keyWord
    },
    mounted() {
      this.getCarNum()
    },
    created () {

    },
    methods: {
      toNpwStatus() {
        configAccountFlag(this)
      },
      makeOrder() {
        if (this.userInfo.userId) {
          getAcountFlag({
            userId: getUserInfo().userId
          }).then((res) => {
            if (res.data.code === 200) {
              this.toNpwStatus()
              if (res.data.data === '1') {
                this.$router.push('/identification')
              } else if (res.data.data === '2') {
                this.$router.push('/identification/result')
              } else if (res.data.data === '3') {
                if (this.userInfo.companyFlag === '1') {
                  this.$alert('供方不支持使用购物车，请更换为采购方身份登录', '不支持使用购物车', {
                    confirmButtonText: '确定'
                  })
                } else if (this.userInfo.companyFlag === '2') {
                  this.$router.push('/setting/buyer')
                }
              }
            }
          })
        } else {
          this.$router.push('/login')
        }
      },
      supplierEnter() {
        this.showAdd ? window.location.href = 'http://www.vandream.com/html/entrance.html' : this.showAdd = false
      },
      clooseAd() {
        this.showAdd = false
      },
      hasClass(obj, cls) {
        let objClass = obj.className
        let objClassLst = objClass.split(/\s+/)
        let x = 0
        for (x in objClassLst) {
          if (objClassLst[x] === cls) {
            return true
          }
        }
      },
      pushGoodsList() {
        let input
        this.queryCondition.input ? input = this.queryCondition.input.replace(/(^\s*)|(\s*$)/g, '') : input = ''
        let value = this.queryCondition.value
        this.$emit('searchGoods', { keyWord: input, type: value, btn: true })
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
      confrimSubmit () {
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
    },
    components: {
    },
    watch: {
      $route () {
        if (this.$route.query.id) {
          this.queryCondition.input = ''
        }
      },
      keyWord (newVal) {
        this.queryCondition.input = newVal
      }
    }

  }
</script>
<style lang="sass">
  @import "../../css/common/searchNav/index"
</style>
