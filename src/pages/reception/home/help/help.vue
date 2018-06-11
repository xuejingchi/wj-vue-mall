<template>
  <div class="help">
    <search-nav @searchGoods="searchGoods" :keyWord="keyWord"></search-nav>
    <div class="commodity-list clearfix">
      <div class="shop-classify f-l" :class="showClass ? 'show-class' : ''">
        <div class="classify-title clearfix">
          <i class="iconfont all-icon">&#xe631;</i>
          <p>全部商品分类</p>
        </div>
        <div class="classify-content" id="classify-content">
          <ul>
            <template v-for="(item, index) in shopList">
              <li>
                <div class="classify-shop-content">
                  <i v-if="index === 0" class="iconfont classify-icon">&#xe62f;</i>
                  <i v-if="index === 1" class="iconfont classify-icon">&#xe62e;</i>
                  <i v-if="index === 2" class="iconfont classify-icon">&#xe62c;</i>
                  <i v-if="index === 3" class="iconfont classify-icon">&#xe62d;</i>
                  <p class="classify-shop-title">{{ item.categoryName }}</p>
                  <div class="clearfix">
                    <span class="classify-shop-txt" v-if="item.tagList !==null">{{ item.tagList !== null ? item.tagList[0] : '' }}</span>
                    <span class="classify-shop-txt" v-if="item.tagList !==null">{{ item.tagList !== null ? item.tagList[1] : '' }}</span>
                  </div>
                  <div class="clearfix">
                    <span class="classify-shop-txt" v-if="item.tagList !==null">{{ item.tagList !== null ? item.tagList[2] : ''  }}</span>
                    <span class="classify-shop-txt" v-if="item.tagList !==null">{{ item.tagList !== null ? item.tagList[3] : ''  }}</span>
                  </div>
                </div>
                <ul class="classify-content-list"  v-if="item.isShow">
                  <template v-for="classfiy in item.categoryList">
                    <li class="list-item clearfix">
                      <div class="f-l item-title">
                        <router-link class="item-router" :to="{path:'/goodsList',query: {id: classfiy.categoryId}}">{{ classfiy.categoryName }}<i>> </i></router-link>
                      </div>
                      <div class="f-l item-txt">
                        <template v-for="commodity in classfiy.categoryList">
                          <router-link class="commodity-router" :to="{path:'/goodsList',query: {id: commodity.categoryId}}">{{ commodity.categoryName }}</router-link>
                        </template>
                      </div>
                    </li>
                  </template>
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
      <router-view></router-view>
    </div>
    <v-identify ref="identify"></v-identify>
  </div>
</template>

<script>
  import searchNav from '@/components/common/searchNav.vue'
  import { queryContent } from '@/api/common/searchNav'
  import Identify from '@/components/identify/identification.vue'
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'help',
    components: {
      'search-nav': searchNav,
      'v-identify': Identify
    },
    data () {
      return {
        keyWord: this.$route.query.keyWord || '',
        getAccountFlag: getUserInfo().accountFlag,
        userId: getUserInfo().userId,
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
        }]
      }
    },
    created () {
      this.index = this.$route.path.split('/')[1] || '/'
    },
    mounted() {
      this.$nextTick(() => {
        // 判断是否登录,未登录不需要认证
        if (!this.userId) {
          return false
        }
        // 如果登录账号未认证，则显示认证弹框
        if (!this.getAccountFlag || this.getAccountFlag === '1') {
          this.$refs.identify.dialogVisible = true
        }
      })
      this.getClassfiyList()
      if (this.$route.path === '/') {
        this.showClass = true
      }
    },
    methods: {
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
      changeChildrenRoute(index) {
        this.$router.push(index)
        index === '/' ? this.showClass = true : this.showClass = false
      },
      searchGoods(params) {
        if (this.$route.name === 'goodsList') {
          this.$refs.goodsList.searchGoods(params)
        }
        this.$router.push({
          path: '/goodsList',
          query: params
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "index"
</style>
