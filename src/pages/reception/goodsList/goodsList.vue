<template>
  <div class="search">
    <!--<SearchNav :keyWord="searchParams.keyWord"></SearchNav>-->
    <div class="goods-list">
      <ul class="crumbs">
        <li>当前位置:</li>
        <li><router-link :to="{path: '/'}">首页</router-link>></li>
        <li>
          <p @click="crumbsClick(crumbs.levelOne.categoryId)" v-if="crumbs.levelTwo !== undefined && crumbs.levelTwo !== null">
            {{crumbs.levelOne.categoryName}}>
          </p>
          <p v-else>{{crumbs.levelOne.categoryName}}</p>
        </li>
        <li v-if="crumbs.levelTwo !== undefined && crumbs.levelTwo !== null">
          <p @click="crumbsClick(crumbs.levelTwo.categoryId)" v-if="crumbs.levelThree !== undefined && crumbs.levelThree !== null">
            {{crumbs.levelTwo.categoryName}}>
          </p>
          <p v-else>{{crumbs.levelTwo.categoryName}}</p>
        </li>
        <li v-if="crumbs.levelThree !== undefined && crumbs.levelThree !== null">{{crumbs.levelThree.categoryName}}</li>
      </ul>
      <div class="parameters">
        <div class="list" v-if="category.length">
          <p class="lable">分类:</p>
          <ul id="categoryId">
            <li :class="{active: -1 === categoryActive}" @click="categoryClick(-1)">全部</li>
            <li v-for="(item, index) in category" @click="categoryClick(item.categoryId)" :class="{active: item.categoryId === categoryActive}">{{item.categoryName}}</li>
          </ul>
          <div class="btn">
            <p class="more" v-if="category.length > 7" @click="moreValue('categoryId', category.length)">
              更多 <i id="categoryId_i" class="el-icon-arrow-down"></i>
            </p>
          </div>
        </div>
        <div class="list" v-if="parameters.length !== 0" v-for="(items,index1) in parameters" >
          <p class="lable">{{items.specName}}:</p>
          <ul :id="'list1_'+index1">
            <li v-for="(item) in items.specValues"   @click="paramClick(items.specName, item)" :class="{active: items.activeLi === item}">
              {{item}}
            </li>
          </ul>
          <div class="btn" v-if="items.specValues.length > 7">
            <p class="more" @click="moreValue(index1, items.specValues.length, 1)">
              更多 <i class="el-icon-arrow-down" :id="'icon1_'+index1"></i>
            </p>
          </div>
        </div>
        <div id="more-list" v-if="parameters2.length !==0" v-show="showParameters2" class="list" v-for="(items,index1) in parameters2" >
          <p class="lable">{{items.specName}}:</p>
          <ul :id="'list2_'+index1">
            <li v-for="(item) in items.specValues"   @click="paramClick(items.specName, item)" :class="{active: items.activeLi === item}">
              {{item}}
            </li>
          </ul>
          <div class="btn" v-if="items.specValues.length > 7">
            <p class="more" @click="moreValue(index1, items.specValues.length, 2)">
              更多 <i class="el-icon-arrow-down" :id="'icon2_'+index1"></i>
            </p>
          </div>
        </div>
      </div>
      <div class="more-btn" v-if="parameters.length2" @click="moreCategory">
        更多项目展开<span><i id="more-btn_i" class="el-icon-arrow-down"></i></span>
      </div>
      <div class="goods-container">
        <div class="sort">
          <p class="sort-1" :class="{sortActive: 'sort-1' === sortActive}" @click="defaultSort">默认排序</p>
          <div class="sort-2" :class="{sortActive: 'sort-2' === sortActive}">
            <span>按价格排序</span>
            <ul class="btn">
              <li @click="riseAndFall(1)" :class="{priceIcon: 'rise'=== riseOrFall}"><i class="iconfont icon-sanjiao"></i></li>
              <li @click="riseAndFall(2)" :class="{priceIcon: 'fall'=== riseOrFall}"><i class="iconfont icon-sanjiao-copy"></i></li>
            </ul>
          </div>
          <p class="sort-3">共 <span>{{totalSize}}</span> 件商品</p>
        </div>
        <div class="goods">
          <ul class="label">
            <li class="label-1">商品信息</li>
            <li class="label-2">技术参数</li>
            <li class="label-3">
              <div>
                <i v-if="userInfo.customerLevel === '20' || userInfo.customerLevel === '10'" :class="userInfo.customerLevel === '20' ? 'vip-icon-20' : 'vip-icon-10'"></i>
                <span>价格</span>
              </div>
            </li>
            <li class="label-4">计量单位</li>
          </ul>
          <div v-if="itemList.length" class="goods-box" v-for="items in itemList">
            <ul class="msg" @click="toDetail(items.itemId)">
              <li>
                <img :src="items.pictureUrl ? `${ ServerImgUrl }${ items.pictureUrl }` : defaultImg" alt="图片加载失败">
              </li>
              <li>
                <span :title="items.itemShortName !== undefined && items.itemShortName !== null ? items.itemShortName : items.itemName">{{items.itemShortName !== undefined && items.itemShortName !== null ? items.itemShortName : items.itemName}}</span>
              </li>
            </ul >
            <div class="params" @click="toDetail(items.itemId)">
              <ul class="top">
                <li v-for="item in items.specList">
                  <span>{{item.name}}</span>
                  <p class="value" :title="item.value">{{item.value}}</p>
                </li>
              </ul>
            </div>
            <div class="price" v-if="userInfo.customerLevel === '20' || userInfo.customerLevel === '10'" @click="toDetail(items.itemId)">
              <p v-if="items.minMemberPrice === items.maxMemberPrice && (items.minMemberPrice > 0)">
                <span>￥{{items.maxMemberPrice  | showPriceToTwoDecimal }}</span>
              </p>
              <p v-if="(items.minMemberPrice > 0) && (items.maxMemberPrice > 0) && (items.minMemberPrice !== items.maxMemberPrice)">
                <span>￥{{items.minMemberPrice  | showPriceToTwoDecimal }}</span>
                <span>~</span>
                <span>￥{{items.maxMemberPrice  | showPriceToTwoDecimal }}</span>
              </p>
              <p v-if="items.minMemberPrice == -1 || items.maxMemberPrice == -1 || items.minMemberPrice == null || items.maxMemberPrice == null">
                <span>议价</span>
              </p>
            </div>
            <div class="price" v-else @click="toDetail(items.itemId)">
              <p v-if="items.minPrice === items.maxPrice && (items.minPrice > 0)">
                <span>￥{{items.maxPrice  | showPriceToTwoDecimal }}</span>
              </p>
              <p v-if="(items.minPrice > 0) && (items.maxPrice > 0) && (items.minPrice !== items.maxPrice)">
                <span>￥{{items.minPrice  | showPriceToTwoDecimal }}</span>
                <span>~</span>
                <span>￥{{items.maxPrice  | showPriceToTwoDecimal }}</span>
              </p>
              <p v-if="items.minPrice == -1 || items.maxPrice == -1 || items.minPrice == null || items.maxPrice == null">
                <span>议价</span>
              </p>
            </div>
            <p class="unit" @click="toDetail(items.itemId)">
              <span>{{items.unitName}}</span>
            </p>
            <div class="add-btn">
              <button :style="{'margin-top': ''}" @click="addList(items.itemId)">加入购物车</button>
              <p v-if="1" @click="findSpuItemList(items.spuId)">对比</p>
            </div>
          </div>
          <div v-if="noData" class="no-goods">
            <div class="img"></div>
            <ul class="des">
              <li>没有找到相关的商品</li>
              <li>请调整条件重新搜索</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="itemList.length" class="goods-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :page-size="searchParams.pageSize"
          :current-page="searchParams.pageNum"
          @current-change="pageChange"
          :total="totalSize">
        </el-pagination>
      </div>
      <login-model :mdShow="showLoginBox" @modelStatusChange="modelStatusChange" @loginSuccess="loginSuccess"></login-model>
    </div>
    <div class="contrast-price" v-if="spuGoodsList.length" :style="contrast.showBody ? {'height': '200px'} : null">
      <div class="top" :style="contrast.showBody ? {'border-bottom': '1px solid #E2E2E2'} : null">
        <p class="p1">
          需要对比的商品 <span>({{spuGoodsList.length}})</span>
        </p>
        <p class="p3" @click="showContrast">
          {{contrast.tips}} <i :class="contrast.showBody ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
        </p>
        <p class="p2" @click="clearContrast">清空对比</p>
      </div>
      <div class="body">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="items in spuGoodsList" @click="selectGoods(items)">
              <img :src="items.pictureUrl ? `${ ServerImgUrl }${ items.pictureUrl }` : defaultImg" alt="">
              <div :title="items.itemName">{{items.itemName}}</div>
              <i></i>
              <p v-if="!items.active">
                <span>
                  <svg width="16" height="16" class="icon" aria-hidden="true">
                    <use v-if="!items.active" xlink:href="#icon-xiangqingweixuanzhong"></use>
                  </svg>
                </span>
              </p>
              <p v-if="items.active" class="active">
                <span>
                  <svg width="16" height="16" class="icon" aria-hidden="true">
                    <use v-if="items.active" xlink:href="#icon-Groupx-"></use>
                  </svg>
                </span>
              </p>
            </div>
          </div>
          <div class="white-left"></div>
          <div class="white-right"></div>
          <div class="swiper-button-next swiper-button-white iconfont icon-you"></div>
          <div class="swiper-button-prev swiper-button-white iconfont icon-zuo"></div>
        </div>
        <button @click="beginContrast">开始对比</button>
      </div>
    </div>
  </div>
</template>
<script>
  import LoginModel from '@/components/common/loginModel.vue'
  import defaultImg from '@/assets/reception/goodsList/no_img.jpg'
  import * as funSets from '@/api/reception/goodsList'
  import { fetchAddCart } from '@/api/reception/cart/cart'
  import { getUserInfo } from '@/utils/auth'
  import { configAccountFlag } from '@/utils/identify.js'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: 'goodsList',
    data () {
      return {
        userInfo: getUserInfo(),
        defaultImg: defaultImg,
        showLoginBox: false,
        searchParams: {
          userId: getUserInfo().userId,
          categoryId: '', // 类目 id
          keyWord: '', // 搜索关键字
          type: '', // 搜索类型
          brandId: '', // 品牌ID
          pageSize: 15, // 每页 条数
          pageNum: 1, // 当前页数
          sortBy: '', // 排序方式 DESC~倒序 ASC~正序
          spec: null, // 技术参数筛选
        },
        crumbs: {
          levelOne: {
            categoryName: null
          }
        },
        category: [],
        categoryActive: -1, // 当前分类列表active状态的id
        // 一直显示parameters
        parameters0: [], // 加工后 parameters
        parameters: [],
        // 更多parameters
        parameters2: [],
        showParameters2: false, // 显示更多参数
        //  商品列表信息
        itemList: [],
        // 总条数
        totalSize: 0,
        //  排序active状态
        sortActive: 'sort-1',
        // 价格升降序 active状态
        riseOrFall: '',
        // 加入采购清单传入参数
        addParams: {},
        // 已选中参数
        selectedParams: [],
        // 比价
        contrast: {
          showBody: true,
          tips: '展开'
        },
        // 获取SPU下商品请求参数
        spuParams: {
          spuId: null
        },
        // SPU下商品列表
        spuGoodsList: [],
        // 商品IdList
        itemIdList: [],
        // 搜索为空时显示
        noData: false
      }
    },
    computed: {
    },
    beforeCreate () {
      // document.title = this.$route.query.keyWord
    },
    created () {
      // document.title = this.$route.query.keyWord
      // console.log('233', this.$route.meta.title)
      // console.log('123', this.$route.query.keyWord)
    },
    methods: {
      // 初始化数据
      clearOldData() {
        this.category = []
        // this.itemList = []
        this.crumbs = {
          levelOne: {
            categoryName: null
          }
        }
      },
      // 搜索商品  pageChange 1 ~ 翻页搜索
      searchGoods(params, pageChange) {
        this.clearOldData()
        if (pageChange !== 1) {
          this.searchParams.pageNum = 1
        }
        if (params !== '') {
          this.searchParams.keyWord = params.keyWord
          this.searchParams.type = params.type
          // 进入商品列表后搜索时
          if (params.keyWord || params.btn) {
            this.searchParams.categoryId = ''
          }
          // 商品分类点击时
          if (params.id) {
            this.searchParams.categoryId = params.id
            this.searchParams.type = 'CATEGORY'
            this.crumbs.levelOne.categoryName = params.key
          }
        }
        // 首页点击商品分类
        let key = this.$route.query.key
        if (key) {
          this.crumbs.levelOne.categoryName = key
        }
        // 存取搜索参数至hash中（刷新页面时使用）
        let query = {}
        if (this.searchParams.categoryId) {
          query.id = this.searchParams.categoryId
        }
        if (this.searchParams.keyWord) {
          query.keyWord = this.searchParams.keyWord
        }
        this.$router.push({
          query: query
        })
        funSets.search(this.searchParams).then(
          res => {
            let data = res.data.data
            this.totalSize = data.totalSize
            if (data.crumbs !== undefined && data.crumbs !== null && data.crumbs.levelOne !== null) {
              this.crumbs = data.crumbs
            }
            if ((data.crumbs.levelOne === null) && (this.searchParams.categoryId === '')) {
              this.crumbs.levelOne.categoryName = this.searchParams.keyWord
            }
            if (data.category !== undefined && data.category !== null) {
              this.category = data.category
            }
            let parameters = data.parameters
            if (parameters !== undefined && parameters !== null) {
              this.changeParameters(parameters)
              this.concatParam(parameters)
              let pLength = this.parameters0.length
              if (pLength > 4) {
                this.parameters = this.parameters0.slice(0, 4)
                this.parameters2 = this.parameters0.slice(4)
              } else {
                this.parameters = this.parameters0
              }
            } else {
              this.parameters = []
              this.parameters2 = []
            }
            this.itemList = data.itemList
            if (data.itemList.length) {
              this.noData = false
            } else {
              this.noData = true
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 加工parameters
      changeParameters(parameters) {
        for (let a = 0; a < parameters.length; a++) {
          let values = parameters[a].specValues
          values.unshift('全部')
          parameters[a].specValues = values
          parameters[a].activeLi = '全部'
        }
      },
      // 合并parameters & selectedParams
      concatParam(parameters) {
        let selectedParams = this.selectedParams
        for (var i = 0; i < selectedParams.length; i++) {
          for (var j = 0; j < parameters.length; j++) {
            if (selectedParams[i].specName === parameters[j].specName) {
              parameters[j].activeLi = selectedParams[i].activeLi
            }
          }
        }
        this.parameters0 = parameters
      },
      // 分类列表点击事件
      categoryClick(categoryId) {
        this.categoryActive = categoryId
        if (categoryId !== -1) {
          this.searchParams.categoryId = categoryId
        } else {
          delete this.searchParams.categoryId
          this.parameters = []
          this.parameters2 = []
        }
        this.searchParams.type = 'CATEGORY'
        this.searchGoods('')
      },
      // 参数列表点击事件
      paramClick(name, item) {
        let selectedParams = this.selectedParams
        this.searchParams.type = ''
        if (!selectedParams.length) {
          selectedParams.push({
            specName: name,
            activeLi: item
          })
        } else {
          let n = selectedParams.filter((obj) => {
            return obj.specName === name
          })
          if (!n.length) {
            selectedParams.push({
              specName: name,
              activeLi: item
            })
          }
          for (var i = 0; i < selectedParams.length; i++) {
            if (selectedParams[i].specName === name) {
              selectedParams[i].activeLi = item
            }
          }
        }
        let spec = {} // 传入参数
        for (let n = 0; n < selectedParams.length; n++) {
          if (selectedParams[n].activeLi !== '全部') {
            spec[selectedParams[n].specName] = selectedParams[n].activeLi
          }
        }
        this.searchParams.spec = spec
        this.searchGoods('')
      },
      // 获取某列表下更多参数
      moreValue(id, length, list) {
        let curId, iId
        if (list === 1) {
          curId = `list1_${id}`
          iId = `icon1_${id}`
        } else if (list === 2) {
          curId = `list2_${id}`
          iId = `icon2_${id}`
        } else {
          curId = id
          iId = `${id}_i`
        }
        let ul = document.getElementById(curId)
        let i = document.getElementById(iId)
        if (ul.offsetHeight > 44) {
          ul.style.height = '44px'
          ul.scroll(0, 0)
          ul.style.overflow = 'hidden'
          i.className = 'el-icon-arrow-down'
        } else if (length > 7) {
          let h = (Math.floor(length / 7) + 1) * 34 + 10
          if (h > 186) {
            ul.style.overflow = 'auto'
          }
          ul.style.height = `${h}px`
          i.className = 'el-icon-arrow-up'
        }
      },
      // 获取更多列表
      moreCategory() {
        this.showParameters2 = !this.showParameters2
        let i = document.getElementById('more-btn_i')
        i.className = !this.showParameters2 ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
      },
      //  默认排排序
      defaultSort() {
        this.sortActive = 'sort-1'
        this.riseOrFall = ''
        this.searchParams.sortBy = ''
        delete this.searchParams.orderBy
        this.searchGoods('')
      },
      //  按价格排序 ~ 升序/降序 num: 1~升序 2~降序
      riseAndFall(num) {
        this.sortActive = 'sort-2'
        this.searchParams.orderBy = 'salePrice'
        if (num === 1) {
          this.riseOrFall = 'rise'
          this.searchParams.sortBy = 'ASC'
        } else {
          this.riseOrFall = 'fall'
          this.searchParams.sortBy = 'DESC'
        }
        this.searchGoods('')
      },
      // 商品技术参数排序
      paramSort(itemList) {
        for (let i = 0; i < itemList.length; i++) {
          if (itemList[i].specList !== undefined && itemList[i].specList !== null) {
            let arr1 = [] //  计价参数 数组
            let arr2 = [] //  非计价参数 数组
            let arr = itemList[i].specList
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].priceFlag) {
                arr1.push(arr[j])
              } else {
                arr2.push(arr[j])
              }
            }
            itemList[i].specList = arr1.concat(arr2)
            // if (itemList[i].specList.length) {
            //   itemList[i].specList.length = 4
            // }
          }
        }
        return itemList
      },
      // 加入采购清单
      addList(itemId) {
        let token = !!getUserInfo().token
        if (!token) {
          this.showLoginBox = true
        } else {
          let companyFlag = getUserInfo().companyFlag
          if (companyFlag === '1') {
            this.$alert('供方不支持使用购物车，请更换为采购方身份登录', '不支持使用购物车', {
              confirmButtonText: '确定',
            })
            return
          }
          configAccountFlag(this).then(() => {
            let userId = getUserInfo().userId
            let data = {
              userId: userId,
              itemId: itemId,
              areaCode: null,
              count: null
            }
            fetchAddCart(data).then(
              res => {
                if (res.data.code === 200) {
                  let num = res.data.data
                  if (num === 200) {
                    this.$alert('<div class="content"><p class="img"><i class="iconfont icon-zhuyi"></i></p><ul class="des"><li>加入失败！</li><li>您的购物车太久没有清理，</li><li>无法添加商品</li></ul></div>', '加入失败',
                      {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true,
                        customClass: 'goods-alert'
                      }
                    )
                  } else {
                    this.$store.commit('addPurchaseList', num)
                    this.$alert('已加入购物车', '购物车', {
                      confirmButtonText: '确定',
                    })
                  }
                }
              }
            ).catch(
              err => {
                this.$message.error(err)
              }
            )
          }, () => {})
        }
      },
      // 翻页
      pageChange(currentPage) {
        this.searchParams.pageNum = currentPage
        this.searchGoods('', 1)
      },
      // 跳转至详情页
      toDetail(id1) {
        let route = this.$router.resolve({
          path: '/goodsDetail',
          query: {
            itemId: id1
          },
        })
        window.open(route.href, '_blank')
      },
      // 面包屑点击事件
      crumbsClick(categoryId) {
        this.searchParams.categoryId = categoryId
        this.searchParams.keyWord = ''
        this.searchParams.type = 'CATEGORY'
        // this.$store.commit('updateSearchValue', '')
        this.$emit('changeKeyWord', '')
        this.searchGoods('')
      },
      // 监听子组件状态改变
      modelStatusChange(newVal) {
        this.showLoginBox = newVal
      },
      // 登陆成功后操作
      loginSuccess() {
        window.location.reload()
      },
      // 展开对比商品列表
      showContrast() {
        this.contrast.showBody = !this.contrast.showBody
        this.contrast.showBody ? this.contrast.tips = '收起' : this.contrast.tips = '展开'
      },
      // 清空对比
      clearContrast() {
        this.spuGoodsList = []
        this.spuParams.spuId = null
      },
      // swiper 函数
      loop() {
        Swiper('.swiper-container', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 7,
          loop: false,
          // onInit: (swiper) => {
          // },
        })
      },
      // 获取SPU下商品列表
      findSpuItemList(spuId) {
        if (this.spuParams.spuId === spuId) {
          this.$message.warning('该商品已加入对比！')
          return
        } else {
          this.spuParams.spuId = spuId
        }
        funSets.findSpuItemList(this.spuParams).then(
          res => {
            if (res.data.code === 200) {
              let spuGoodsList = res.data.data
              if (spuGoodsList.length) {
                this.spuGoodsList = []
                for (let i = 0; i < spuGoodsList.length; i++) {
                  spuGoodsList[i].active = false
                }
                let arr = spuGoodsList
                this.spuGoodsList = arr
                setTimeout(() => {
                  this.loop()
                }, 300)
              }
            }
          }
        ).catch(
          err => {
            this.$message.error(err)
          }
        )
      },
      // 选择要比对商品
      selectGoods(items) {
        items.active = !items.active
      },
      // 开始对比
      beginContrast() {
        let itemIdList = []
        let spuGoodsList = this.spuGoodsList
        for (let i = 0; i < spuGoodsList.length; i++) {
          if (spuGoodsList[i].active === true) {
            itemIdList.push(spuGoodsList[i].itemId)
          }
        }
        if (itemIdList.length > 8) {
          this.$message({
            message: '最多可以加入8个商品对比',
            type: 'warning',
            // duration: 0
          })
          return
        }
        if (itemIdList.length === 0) {
          this.$message({
            message: '请选择至少1个需要对比的商品！',
            type: 'warning',
            // duration: 0
          })
          return
        }
        let idList = JSON.stringify(itemIdList)
        window.localStorage.setItem('itemIdList', idList)
        let route = this.$router.resolve({
          path: '/goodsList/parityRatio',
          query: {
          }
        })
        window.open(route.href, '_blank')
      }
    },
    beforeMount () {
      let query = this.$route.query
      this.crumbs = {
        levelOne: {
          categoryName: query.keyWord
        }
      }
      this.searchParams.keyWord = query.keyWord
      this.searchParams.type = query.type
      this.searchParams.categoryId = query.id
      let haveId = query.id !== undefined ? 1 : 0
      if (!haveId) {
        this.searchParams.categoryId = ''
      } else {
        this.searchParams.keyWord = ''
        this.searchParams.type = 'CATEGORY'
        this.crumbs.levelOne.categoryName = query.key
      }
      this.searchGoods('')
    },
    mounted() {
      this.$nextTick(() => {
        this.$on('searchGoods', () => {
          this.searchGoods()
        })
      })
    },
    watch: {
      // $route () {
      //   let query = this.$route.query
      //   let haveId = query.id !== undefined ? 1 : 0
      //   if (haveId) {
      //     this.searchParams.categoryId = query.id
      //   }
      //   this.searchGoods('')
      // }
    },
    components: {
      LoginModel,
      // SearchNav
    }
  }
</script>
<style lang="scss" scoped>
  .search{
    overflow:hidden;
    .goods-list {
      overflow:hidden;
      width:1200px;
      margin-left:calc(50% - 600px);
      .crumbs {
        overflow:hidden;
        li{
          float:left;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          margin-right:10px;
          height:50px;
          line-height:50px;
        }
      }
      .parameters{
        overflow:hidden;
        background: #FFFFFF;
        border: 1px solid #E2E2E2;
        border-bottom:0px;
        .list{
          overflow:hidden;
          border-bottom:1px solid #E2E2E2;
          p,ul{
            float:left;
          }
          .lable{
            font-size: 12px;
            color: #666666;
            width:84px;
            margin:10px 12px;
            height:24px;
            line-height:24px;
          }
          ul{
            overflow:hidden;
            max-height:186px;
            height:44px;
            margin-top:3px;
            width:930px;
            li{
              float:left;
              height:34px;
              line-height:17px;
              width:93px;
              margin-right:37px;
              margin-top:10px;
              font-size: 12px;
              color: #333333;
            }
            li.active{
              color: #F18115;
            }
          }
          .btn{
            overflow:hidden;
            width:158px;
            padding:0 20px;
            .more{
              float:right;
              margin:10px 0px;
              height:24px;
              line-height:22px;
              text-align:center;
              background: #FFFFFF;
              border: 1px solid #E2E2E2;
              border-radius: 2px;
              width:56px;
              padding-left:7px;
              /*span{*/
              /*height:22px;*/
              /*line-height:22px;*/
              /*font-size: 12px;*/
              /*color: #666666;*/
              /*}*/
              /*i{*/
              /*background:#ccc;*/
              /*width:10px;*/
              /*height:6px;*/
              /*margin-top:8px;*/
              /*margin-left:4px;*/
              /*}*/
            }
          }
        }
      }
      .more-btn{
        width:200px;
        height:38px;
        margin-left:calc(50% - 100px);
        background: #FDFDFD;
        border: 1px solid #E2E2E2;
        border-top:0px;
        padding:10px 50px;
        font-size: 12px;
        color: #666666;
        span{
          border:1px solid #D0CECE;
          border-radius:8px;
          line-height:12px;
          text-align:center;
          margin-left: 4px;
          padding: 0 1px;
        }
        /*span{*/
        /*width:72px;*/
        /*height:17px;*/
        /*line-height:17px;*/
        /*font-size: 12px;*/
        /*color: #666666;*/
        /*}*/
        /*i{*/
        /*height:16px;*/
        /*width:16px;*/
        /*border: 1px solid #D0CECE;*/
        /*margin-left:8px;*/
        /*border-radius:8px;*/
        /*}*/
      }
      .goods-container{
        width:1200px;
        margin-top:20px;
        margin-left:calc(50% - 600px);
        .sort{
          width:1200px;
          height:40px;
          background: #F5F5F5;
          border: 1px solid #E2E2E2;
          font-size: 12px;
          p,.sort-2{
            float:left;
            line-height:38px;
            height:38px;
            color: #666666;
          }
          .sort-1{
            width:100px;
            text-align:center;
            border-right:1px solid #E2E2E2;
          }
          .sort-2{
            width:100px;
            padding-left:14px;
            color: #666666;
            span,.btn{
              float:left;
            }
            .btn{
              height:38px;
              width:16px;
              margin-left:6px;
              padding-top:8px;
              li{
                height:12px;
                line-height:13px;
                color:#DADADA;
                .iconfont{
                  font-size:14px;
                }
              }
              .priceIcon{
                color: #F18115;
              }
            }
          }
          .sort-3{
            float:right;
            margin-right:20px;
            color: #606160;
            span{
              color: #F18115;
            }
          }
          .sortActive{
            color: #F18115;
            border-right:1px solid #E2E2E2;
            background: #FFFFFF;
          }
        }
        .goods{
          margin-top:12px;
          overflow:hidden;
          min-height: 356px;
          .label{
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            width:1200px;
            height:36px;
            li{
              float:left;
              font-size: 12px;
              color: #212020;
              height:34px;
              line-height:34px;
              text-align:center;
            }
            .label-1{
              width:320px;
            }
            .label-2{
              width:466px;
            }
            .label-3{
              width:188px;
              div{
                overflow:hidden;
                display:inline-block;
                .vip-icon-20,.vip-icon-10{
                  margin:9px 5px 0 0px;
                  float:left;
                  width:17px;
                  height:17px;
                  background-size:contain;
                  background-image: url('../../../assets/reception/goodsDetail/vip_member@2x.png');
                }
                .vip-icon-10{
                  background-image: url('../../../assets/reception/goodsDetail/high_member@2x.png');
                }
                span{
                  float:left;
                  line-height:34px;
                }
              }
            }
            .label-4{
              width:80px;
            }
          }
          .goods-box{
            overflow:hidden;
            width:1200px;
            background: #FFFFFF;
            box-shadow: inset 0 -1px 0 0 #E2E2E2;
            .msg,.params,.price,.unit,.add-btn{
              float:left;
              height:90px;
              border-left:1px dotted #D2D2D2;
            }
            .msg{
              width:320px;
              border:0px;
              li{
                float:left;
                margin:10px 0;
                position: relative;
                height:70px;
                img{
                  display:block;
                  width:70px;
                  height:70px;
                  border: 1px solid #e2e2e2;
                  /*background-image:url(../../../assets/reception/goodsList/no_img.jpg);*/
                  /*background-repeat: no-repeat;*/
                  /*background-size:contain;*/
                }
                span{
                  width:220px;
                  display:inline-block;
                  margin-left:16px;
                  line-height:20px;
                  font-size: 12px;
                  color: #333333;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  left:0px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  -webkit-line-clamp:3;
                }
              }
            }
            .params{
              width:466px;
              overflow:hidden;
              ul{
                width:466px;
                height:90px;
                li{
                  float:left;
                  height:45px;
                  width:233px;
                  line-height:45px;
                  span,p{
                    float:left;
                    height:44px;
                    line-height:45px;
                    font-size: 12px;
                  }
                  span{
                    width:100px;
                    color: #666666;
                    padding:0 10px;
                    text-align:right;
                    background: #F8F8F8;
                  }
                  p{
                    color: #333333;
                    padding:0 14px;
                    width:132px;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                  }
                }
                li:first-child,li:nth-child(2){
                  border-bottom:1px dotted #E2E2E2;
                  span{
                    height:44px;
                  }
                }
              }
              /*.top{*/
              /*li{*/
              /*span{*/
              /*height:44px;*/
              /*}*/
              /*}*/
              /*border-bottom:1px dotted #E2E2E2;*/
              /*}*/
            }
            .price{
              width:187px;
              font-size: 14px;
              color: #FF2834;
              line-height:90px;
              text-align:center;
              display:table;
              p{
                display:table-cell;
                vertical-align:middle;
                span{
                  line-height:17px;
                  display:block;
                }
              }
            }
            .unit{
              width:80px;
              font-size: 12px;
              color: #333333;
              position:relative;
              span{
                display:block;
                width:52px;
                margin-left:14px;
                line-height:16px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                text-align:center;
              }
            }
            .add-btn{
              height:90px;
              button{
                width:90px;
                height:30px;
                margin-top:15px;
                margin-left:24px;
                line-height:28px;
                background-image: linear-gradient(-180deg, #FF615B 0%, #FF2E29 100%);
                border: 1px solid #FF5F59;
                border-radius: 2px;
                font-size: 12px;
                color: #FFFFFF;
              }
              p{
                margin-left:24px;
                margin-top:6px;
                width:60px;
                height:30px;
                line-height:28px;
                background: #FFF9F0;
                border: 1px solid #FF2834;
                border-radius: 2px;
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #FF2834;
                text-align:center;
              }
            }

          }
          .no-goods{
            width:1200px;
            height:300px;
            background: #FFFFFF;
            border: 1px solid #E7E7E7;
            margin-top:10px;
            .img,.des{
              float:left;
            }
            .img{
              width:147px;
              height:135px;
              background:url(../../../assets/reception/goodsList/no_list@2x.png) no-repeat;
              background-size:contain;
              margin-right:40px;
              margin-left:396px;
              margin-top:77px;
            }
            .des{
              overflow:hidden;
              li:first-child{
                font-size: 24px;
                color: #333333;
                line-height:34px;
                height:34px;
                margin-top:116px;
              }
              li:last-child{
                font-size: 16px;
                color: #666666;
                line-height:22px;
                height:22px;
              }
            }
          }
        }
      }
      .goods-pagination{
        margin-top:40px;
        text-align:center;
        margin-bottom:20px;
      }
    }
    .contrast-price{
      position:fixed;
      background:#fff;
      z-index:9999;
      bottom:0px;
      height:40px;
      overflow:hidden;
      width:1200px;
      box-shadow: 0 0 6px rgba(0,0,0,0.20);
      margin-left:calc(50% - 600px);
      border:1px solid #E2E2E2;
      .top{
        height:40px;
        border-bottom:1px solid #E2E2E2;
        background: #F3F3F3;
        p{
          height:39px;
          line-height:39px;
          text-align:center;
          font-family: PingFangSC-Medium;
          font-size: 14px;
        }
        .p1{
          height:40px;
          line-height:40px;
          background: #FFFFFF;
          width:170px;
          float:left;
          color: #333333;
          border-right:1px solid #E2E2E2;
          span{
            font-size: 12px;
            color: #000000;
          }
        }
        .p2,.p3{
          float:right;
        }
        .p2{
          width:80px;
          color: #999999;
          margin-right:20px;
        }
        .p3{
          width:60px;
          color: #666666;
          margin-right:20px;
        }
      }
      .body{
        height:160px;
        padding:20px 0px;
        .swiper-container {
          float:left;
          width: 1024px;
          height: 120px;
          /*border:1px solid red;*/
          padding:0px 20px;
          margin-left:20px;
          .swiper-wrapper{
            background:#fff;
            .swiper-slide {
              background: #fff;
              /*width:134px;*/
              padding:0 10px;
              padding-top:3px;
              text-align: center;
              position:relative;
              img {
                width: 72px;
                height: 72px;
                display:block;
                position:absolute;
                right:34px;
                top:3px;
              }
              div {
                position:absolute;
                right:15px;
                top:80px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #333333;
                line-height: 16px;
                width:110px;
                margin-top:6px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow:hidden;
                text-overflow:ellipsis;
                -webkit-line-clamp:2;
              }
              i{
                display:block;
                position:absolute;
                height:90px;
                border: 1px dotted #E2E2E2;
                top:4px;
                right:0px;
              }
              p{
                position:absolute;
                width:78px;
                height:78px;
                border:2px solid #E2E2E2;
                right:31px;
                top:0px;
                span{
                  float:right;
                  color:#E2E2E2;
                  margin-top:57px;
                  font-size:16px;
                }
              }
              .active{
                border:2px solid #2CAF64;
                span{
                  color:#2CAF64;
                }
              }
            }
            .swiper-slide:last-child{
              i{
                display:none;
              }
            }
          }
          .swiper-button-next, .swiper-button-prev {
            top: 40%;
            width: 28px;
            height: 43px;
            background-color: rgba(0, 0, 0, 0.4);
            background-size: 15px 30px;
            background:#fff;
            line-height:43px;
            color:#E0E0E0;
            font-size:28px;
          }
          .swiper-button-next {
            right: 0px;
          }
          .swiper-button-prev {
            left: 0px;
          }
          .white-left,.white-right{
            position:absolute;
            width:28px;
            height:120px;
            background:#fff;
            top:0px;
            z-index:9;
          }
          .white-left{
            left:0px;
          }
          .white-right{
            right:0px;
          }
        }
        button{
          width:120px;
          height:40px;
          line-height:38px;
          ont-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          float:right;
          background-image: linear-gradient(-180deg, #FF615B 0%, #FF2E29 100%);
          border: 1px solid #FF5F59;
          border-radius: 2px;
          margin-right:20px;
          margin-top:28px;
        }
      }
    }
  }
</style>
