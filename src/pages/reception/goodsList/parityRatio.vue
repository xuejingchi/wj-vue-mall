<template>
  <div class="parity-ratio">
    <div class="menu-title">
      <p>
        当前位置: <router-link :to="{path: '/'}">首页</router-link> > 比价器
      </p>
    </div>
    <div class="use-introduce clearfix">
      <div class="f-l img">
        <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riH4qAYoBbAABSPP3WLxk287.png" alt="" width="433px">
      </div>
      <div class="f-l txt">
        <h3>如何使用对比器：</h3>
        <div class="progress-bar clearfix">
          <div class="bar-item">
            <p>
              1. 加入需要对比的商品 <br>
              （最多可以加入8个）
            </p>
          </div>
          <div class="bar-item">
            <p>
              2.通过左右移动对商品技 <br>
              术参数价格进行对比
            </p>
          </div>
          <div class="bar-item tp">
            <p>3. 选中的商品加入采购清单</p>
          </div>
        </div>
      </div>
    </div>
    <div class="contrast-box" v-if="itemList.length">
      <div class="box-label">
        <div class="box-label-top">
          <div class="title first">
            <el-checkbox v-model="checked.show">高亮不同项</el-checkbox>
            <el-checkbox v-model="checked.hide">隐藏相同项</el-checkbox>
          </div>
          <div class="title">销售区域</div>
          <div class="title">最小起订量</div>
        </div>
        <p class="params">技术参数</p>
        <div class="box-label-body">
          <p v-for="spec in specList" v-if="spec.identical && checked.hide ? false : true">{{spec.specName}}</p>
        </div>
      </div>
      <div class="box-body">
        <div class="box-body2" :style="{width: `${itemList.length*240}px`}">
          <div class="list-container" v-for="(items, index) in itemList" :key="index">
            <div class="item first">
              <div class="close-item" @click="deleteGoods(items.itemId)">
                <span class="iconfont">&#xe605;</span>
              </div>
              <h3 class="item-title" :title="items.itemName">{{items.itemName}}</h3>
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
              <div class="btn clearfix">
                <div class="left f-l" @click="moveGoods(1,index)">
                  <span></span>
                </div>
                <div class="center f-l" @click="addList(items.itemId)">加入购物车</div>
                <div class="right f-l" @click="moveGoods(2,index)">
                  <span></span>
                </div>
              </div>
            </div>
            <div class="item">{{items.saleArea}}</div>
            <div class="item">{{items.minOrderNum}}</div>
            <div class="empty"></div>
            <ul class="params-list" v-for="item in items.newSpecMap">
              <li v-show="item.identical && checked.hide ? false : true" :class="(!item.identical) && checked.show ? 'high-light' : ''">{{item.value}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="params-background"></div>
    </div>
    <div class="project-left" v-if="itemList.length > 4"></div>
    <div class="project-right" v-if="itemList.length > 4"></div>
    <div v-if="!itemList.length" class="no-contrast">
      <div class="img"></div>
      <p class="des">没有需要对比的商品</p>
    </div>
    <login-model :mdShow="showLoginBox" @modelStatusChange="modelStatusChange" @loginSuccess="loginSuccess"></login-model>
  </div>
</template>
<script>
  import LoginModel from '@/components/common/loginModel.vue'
  import * as funSets from '@/api/reception/goodsList'
  import { fetchAddCart } from '@/api/reception/cart/cart'
  import { getUserInfo } from '@/utils/auth'
  import { configAccountFlag } from '@/utils/identify.js'
  export default {
    name: 'parityRatio',
    data () {
      return {
        userInfo: getUserInfo(),
        showLoginBox: false,
        checked: {
          show: false,
          hide: false
        },
        itemIdList: null,
        itemList: [], // 商品信息列表
        specList: [], // 商品技术参数列表
        highlight: false
      }
    },
    beforeMount() {
      this.itemIdList = JSON.parse(window.localStorage.getItem('itemIdList'))
      let params = {
        itemIdList: this.itemIdList,
        userId: this.userInfo.userId
      }
      funSets.findListItemInfo(params).then(
        res => {
          if (res.data.code === 200) {
            let itemList = res.data.data.itemList
            let specList = res.data.data.specList
            for (let i = 0; i < itemList.length; i++) {
              let newSpecMap = []
              for (let j = 0; j < specList.length; j++) {
                let obj = {
                  itemId: '',
                  value: '',
                  identical: ''
                }
                obj.identical = specList[j].identical
                for (let n = 0; n < specList[j].specMap.length; n++) {
                  if (itemList[i].itemId === specList[j].specMap[n].itemId) {
                    obj = specList[j].specMap[n]
                    obj.identical = specList[j].identical
                  }
                }
                newSpecMap.push(obj)
              }
              itemList[i].newSpecMap = newSpecMap
            }
            this.itemList = itemList
            this.specList = specList
          }
          // console.log(9999, res.data.data)
        }
      ).catch(
        err => {
          this.$message.error(err)
        }
      )
    },
    computed: {
    },
    methods: {
      // 删除要比对的商品
      deleteGoods(itemId) {
        let arr = this.itemList.filter(
          items => {
            return items.itemId !== itemId
          }
        )
        this.itemList = arr
      },
      // 左右移动商品 n: 1~左 2~右
      moveGoods(n, index) {
        let str = JSON.stringify(this.itemList)
        const list = JSON.parse(str)
        const t = list[index]
        if (n === 1) {
          list[index] = list[index - 1]
          list[index - 1] = t
        } else {
          list[index] = list[index + 1]
          list[index + 1] = t
        }
        this.itemList = list
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
      // 登陆成功后操作
      loginSuccess() {
        window.location.reload()
      },
      modelStatusChange(newVal) {
        this.showLoginBox = newVal
      }
    },
    components: {
      LoginModel
    }
  }
</script>
<style lang="sass">
  @import "parityRatio"
</style>
