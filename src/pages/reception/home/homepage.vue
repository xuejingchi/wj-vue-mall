<template>
  <div class="homepage">
    <search-nav ref="searchNav" @searchGoods="searchGoods" :keyWord="keyWord"></search-nav>
    <div class="commodity-list clearfix">
      <div ref="navItem" @mouseenter="classifyHover(true)" @mouseleave="classifyBlur(false)" class="shop-classify f-l" :class="showClass ? 'show-class' : ''">
        <div class="classify-title clearfix">
          <i class="iconfont all-icon">&#xe631;</i>
          <p>全部商品分类</p>
        </div>
        <div v-show="showClassify" class="classify-content" id="classify-content">
          <ul>
            <template v-for="(item, index) in shopList">
              <li class="item-list" v-if="item.isShow !== 0">
                <div class="classify-shop-content">
                  <i v-if="index === 0" class="iconfont classify-icon">&#xe62f;</i>
                  <i v-if="index === 1" class="iconfont classify-icon">&#xe62e;</i>
                  <i v-if="index === 2" class="iconfont classify-icon">&#xe62c;</i>
                  <i v-if="index === 3" class="iconfont classify-icon">&#xe62d;</i>
                  <p class="classify-shop-title">
                    {{ item.categoryName }}
                    <i class="iconfont right-icon">&#xe609;</i>
                  </p>
                  <div class="clearfix">
                    <template v-for="list in item.tagList">
                      <span class="classify-shop-txt" v-if="item.tagList !==null">{{ list !== null ? list : '' }}</span>
                    </template>
                  </div>
                </div>
                <ul class="classify-content-list"  v-if="item.isShow">
                  <div class="classify-content-list-in" style="overflow-y: auto;height: 100%">
                    <template v-for="classfiy in item.categoryList">
                      <li class="list-item clearfix">
                        <div class="f-l item-title">
                          <a class="item-router" @click="toSearch(classfiy)">{{ classfiy.categoryName }}<i>> </i></a>
                        </div>
                        <div class="f-l item-txt">
                          <template v-for="commodity in classfiy.categoryList">
                            <a class="commodity-router" :class="commodity.urlStatus === 0 ? 'disabled' : ''" @click="toSearch(commodity)">{{ commodity.categoryName }}</a>
                          </template>
                        </div>
                      </li>
                    </template>
                  </div>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="shop-nav f-l">
        <el-menu
          :default-active="index"
          class="index-nav"
          mode="horizontal"
          background-color="white"
          active-text-color="#22A158"
          text-color="#000"
          @select="changeChildrenRoute"
        >
          <el-menu-item v-for="(route, index) in childRoutes" :index="route.path" :key="index">{{ route.name }}</el-menu-item>
          <!--<el-menu-item index="brand">品牌</el-menu-item>-->
          <!--<el-menu-item index="solution">解决方案</el-menu-item>-->
          <!--<el-menu-item index="experienceCenter">体验中心</el-menu-item>-->
          <!--<el-menu-item index="supplyChain">供应链金融</el-menu-item>-->
        </el-menu>
      </div>
    </div>
    <div class="hp-view">
      <router-view v-if="$route.path === '/goodsList'" ref="goodsList" @changeKeyWord="changeKeyWord"></router-view>
      <router-view v-if="$route.path !== '/goodsList'" @getCarNum="getCarNum" @changeKeyWord="changeKeyWord"></router-view>
    </div>
    <el-dialog class="edit-psd-dialog" :visible.sync="showEditPsdBox">
      <p class="title">欢迎您使用商城！</p>
      <p class="des">首次登录子账户需要设置初始密码，否则不能正常使用。</p>
      <p class="line"></p>
      <ul class="form-box">
        <li>
          <span class="label">初始登录密码：</span>
          <el-input class="input" type="password"
                    placeholder="8～30位字符，至少数字、字母组合"
                    @change="checkPsd"
                    v-model="password" ref="psd1"></el-input>
          <p v-if="showPsdTips" class="tips iconfont icon-gantanhao"> {{psdTips}}</p>
        </li>
        <li>
          <span class="label">初始登录密码：</span>
          <el-input class="input" type="password"
                    placeholder="8～30位字符，至少数字、字母组合"
                    @change="confirmPsd"
                    v-model="confirmPwd" ref="psd2"></el-input>
          <p class="tips iconfont icon-gantanhao" v-if="showConfirmTips"> {{confirmTips}}</p>
          <p class="tips iconfont icon-gantanhao" v-if="showConfirmTips2"> {{confirmTips2}}</p>
        </li>
        <li>
          <el-button class="btn" type="primary" @click="setPsd">提交</el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
  import searchNav from '@/components/common/searchNav.vue'
  import { queryContent } from '@/api/common/searchNav'
  import { getAccountFlag, getUserId, getUserInfo } from '@/utils/auth'
  import * as checkout from '@/api/common/checkout'
  import { modifyPassword } from '@/api/person/securitySettings'
  export default {
    name: 'homepage',
    components: {
      'search-nav': searchNav
    },
    data () {
      return {
        showClassify: this.$route.path === '/',
        keyWord: this.$route.query.keyWord || '',
        getAccountFlag: getAccountFlag(),
        userId: getUserId(),
        showClass: false,
        route: '',
        shopList: [],
        index: '',
        activeIndex: 0,
        childRoutes: [{
          path: '/',
          name: '首页'
        }, {
          path: '/brand',
          name: '品牌'
        }, {
          path: '/solution',
          name: '解决方案'
        }, {
          path: '/experienceCenter',
          name: '体验中心'
        }, {
          path: '/supplyChain',
          name: '供应链金融'
        }],
        userInfo: getUserInfo(),
        showEditPsdBox: false,
        password: '',
        confirmPwd: '',
        showPsdTips: false,
        psdTips: '密码格式输入不正确',
        showConfirmTips: false,
        confirmTips: '密码格式输入不正确',
        showConfirmTips2: false,
        confirmTips2: '两次密码输入不一致'
      }
    },
    created () {
      document.title = this.$route.query.keyWord ? this.$route.query.keyWord : '万郡绿建—绿色建筑建材领域专业的 B2B电商采购平台'
      this.index = this.$route.path.split('/')[1] || '/'
    },
    mounted() {
      this.getClassfiyList()
      if (this.$route.path === '/') {
        this.showClass = true
      }
      if (this.userInfo.pwdFlag === '00') {
        this.showEditPsdBox = true
      }
    },
    methods: {
      changeKeyWord (value) {
        this.keyWord = value
      },
      getClassfiyList() {
        let pramas = {
          categoryId: ''
        }
        queryContent(pramas)
          .then((response) => {
            if (response.status === 200) {
              this.shopList = response.data.data
            }
          })
      },
      toSearch(scope) {
        // document.querySelector('.shop-classify').style.overflow = 'hidden'
        this.showClassify = false
        if (scope.urlStatus === 1) {
          this.$router.push({
            path: '/goodsList',
            query: {
              id: scope.categoryId,
              key: scope.categoryName
            }
          })
          let params = {
            id: scope.categoryId,
            key: scope.categoryName
          }
          if (this.$route.path === '/goodsList') {
            this.$refs.goodsList.searchGoods(params)
          }
        } else {
          this.$router.push({path: '/construction'})
        }
      },
      changeChildrenRoute(index) {
        this.$router.push(index)
        index === '/' ? this.showClass = true : this.showClass = false
      },
      searchGoods(params) {
        if (this.$route.path === '/goodsList') {
          this.$refs.goodsList.searchGoods(params)
        } else {
          this.$router.push({
            path: '/goodsList',
            query: {
              keyWord: params.keyWord,
              type: params.type
            }
          })
        }
        document.title = params.keyWord
        // if (this.$route.path === '/') {
        //   this.$router.push({
        //     path: '/goodsList',
        //     query: {
        //       keyWord: params.keyWord,
        //       type: params.type
        //     }
        //   })
        // }
      },
      classifyHover (flag) {
        this.showClassify = flag
      },
      classifyBlur (flag) {
        if (this.$route.path === '/') {
          this.showClassify = true
          return false
        }
        this.showClassify = flag
      },
      /*
      * 刷新购物车
      * */
      getCarNum () {
        this.$refs.searchNav.getCarNum()
      },
      // 子账户-校验密码
      checkPsd() {
        this.showPsdTips = !checkout.password(this.password)
        if (this.showPsdTips) {
          this.$refs.psd1.focus()
        }
      },
      // 子账户-确认密码时校验
      confirmPsd() {
        this.showConfirmTips = !checkout.password(this.confirmPwd)
        if (this.showConfirmTips) {
          this.$refs.psd2.focus()
        }
      },
      // 子账户-首次设置密码
      setPsd() {
        if (!this.password.length) {
          this.$refs.psd1.focus()
          return
        }
        if (!this.confirmPwd.length) {
          this.$refs.psd2.focus()
          return
        }
        if (this.showConfirmTips) {
          return
        }
        if (this.password === this.confirmPwd) {
          this.showConfirmTips2 = false
          let query = {
            phoneNumber: this.userInfo.phoneNumber,
            password: this.password,
            confirmPwd: this.confirmPwd
          }
          modifyPassword(query).then(
            res => {
              if (res.data.code === 200) {
                this.showEditPsdBox = false
              } else {
                this.$message.error('设置初始密码失败！')
              }
            }
          ).catch(
            err => {
              this.$message.error(err)
            }
          )
        } else {
          this.showConfirmTips2 = true
          this.$refs.psd2.focus()
        }
      }
    },
    watch: {
      $route() {
        if (this.$route.path === '/') {
          this.showClass = true
          this.showClassify = true
        } else {
          this.showClass = false
          this.showClassify = false
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "index"
</style>
