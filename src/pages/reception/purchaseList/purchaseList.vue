<template>
  <div class="purchase-list" >
    <div class="shadow">
      <ul class="header">
        <li class="logo" @click="goHome"></li>
        <li class="line"></li>
        <li class="lable">会员中心</li>
        <li class="back">
          <div class="setting-nav-right" >
            <img src="../identification/imgs/identify_title.png" />
          </div>
        </li>
      </ul>
    </div>
    <login-model :mdShow="mdShow" ></login-model>
    <div class="purchase-list-main">
      <div class="purchase-list-titel">我的购物车：
        <span style="font-weight:900;">
          全部
          <span class="color-15 ">{{goodsAllNums}}</span>
          个商品
        </span>
      </div>
      <div class="purchase-list-left">
        <div class="purchase-list-left-th">
          <div class="purchase-list-left-th-chooes">选择</div>
          <div class="purchase-list-left-th-goods">商品</div>
          <div class="purchase-list-left-th-prices">参考价格</div>
          <div class="purchase-list-left-th-num">采购数量</div>
          <div class="purchase-list-left-th-set">操作</div>
        </div>
        <div v-show="disabledPu">
          <div v-for="(item, index) in dataList">
            <div class="purchase-list-left-brand">类目路径：{{item.categoryStrs[0]}} > {{item.categoryStrs[1]}} > {{item.categoryStrs[2]}}</div>
            <div v-for="(itemValue, indexValue) in item.items" class="purchase-list-odd">
              <div class="purchase-list-left-td" v-show="itemValue.status == '1' && itemValue.itemStatus == '40'" >
                <div class="purchase-list-left-th-chooes">
                  <span class="slect-btn" v-if="!itemValue.checkedDisabel" @click="checkedGoods(itemValue, item.items, indexValue)"></span>
                  <span class="checked" v-else @click="checkedGoods(itemValue, item.items, indexValue)"></span>
                </div>
                <div class="purchase-list-left-goods">
                  <div style="float:left;">
                    <img width="68px" height="68px" :src="itemValue.imagePath ? `${ ServerImgUrl }${ itemValue.imagePath }` : defaultImg" alt="图片加载失败">
                    <!-- <img width="68px" height="68px" src="../identification/imgs/no-buy.png" /> -->
                  </div>
                  <div style="float:left;height:68px;margin-left:16px">
                    <div style="width:245px;text-align:left;height:48px">{{itemValue.name}}（商品编码：{{itemValue.code}}）</div>
                    <div style="text-align:left">最小起订量{{itemValue.minOrderNum}}{{itemValue.unitName}}</div>
                  </div>
                </div>
                <div class="purchase-list-left-prices purchase-list-border">
                  <!-- <i class="vip"></i> -->
                  <!-- <i class="svip"></i> -->
                  <span v-if="itemValue.unitPrice === -1" class="color-28">议价</span>
                  <span v-else class="color-28">¥{{itemValue.unitPrice | showPriceToTwoDecimal }}</span>
                </div>
                <div class="purchase-list-left-num purchase-list-border">
                  <input class="purchase-list-input" type="number" v-model="itemValue.number" @change="checkNumber(itemValue)"/>
                  <span style="margin-left: 7px;">{{itemValue.unitName}}</span>
                </div>
                <div class="purchase-list-left-set purchase-list-border">
                  <span class="purchase-list-left-set-del" style="margin-right:5px">技术参数</span>
                  <span class="hover down" v-show="!itemValue.detailDisabel" @click="showDetail(itemValue, item.items, indexValue)"></span>
                  <span class="hover up" v-show="itemValue.detailDisabel" @click="showDetail(itemValue, item.items, indexValue)"></span>
                  <span class="purchase-list-left-set-del" @click="removeCart(itemValue)">删除</span>
                </div>
              </div>
              <div v-show="itemValue.detailDisabel">
                <div v-for="itemValueThree in getDataList(itemValue.params)" class="purchase-list-left-detalie-odd">
                  <div  v-for="itemFour in itemValueThree">
                    <div class="purchase-list-left-detalie clearfix">
                      <span class="purchase-lis-argumens f-l">{{itemFour.attributeName}} :</span>
                      <span class="purchase-lis-data f-l">{{itemFour.attributeValue}}</span>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                </div>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
          <div style="width:100%;height:1px;background:#E2E2E2;"></div>
          <div style="margin-top:25px" v-for="(item, index) in dataList">
            <div class="lose-efficacy" v-for="(itemValue, indexValue) in item.items">
              <div class="lose-title" v-show="itemValue.itemStatus != '40'">
                <p>已下架</p>
              </div>

              <div class="lose-content" v-show="itemValue.itemStatus != '40'">
                <div class="lose-content-txt">
                  类目路径:  {{item.categoryStrs[0]}} > {{item.categoryStrs[1]}} > {{item.categoryStrs[2]}}
                </div>
                <ul class="lose-list">
                  <li class="lose-item clearfix">
                    <div class="f-l txt">{{itemValue.name}}（商品编码：{{itemValue.itemNum}}）</div>
                    <div class="f-r remove" @click="removeCart2(itemValue)">移除</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-show="disabledPu">
          <div class="cart" :class="fixFit ? 'fix-fit' : ''" v-loading="loading">
            <div class="price">
              <div class="title">总计金额：</div>
              <div class="total-price" >¥{{allPriceCart | showPriceToTwoDecimal}}</div>
            </div>
            <div class="amount">数量：<span>{{allNumber}}</span></div>
            <div class="enter" @click="submitOrder()">立即下单</div>
          </div>
        </div>
        <div v-show="!disabledPu">
          <div class="disabledPu">
            <div style="text-align:center;padding-top:200px">
              <!--<div class="iconfont icon-shangpinliebiaokong" style="font-size:140px;color:#F18115"></div>-->
              <img width="132px" src="../identification/imgs/no-buy.png" />
              <div style="margin-top:20px;color:#666666;font-size:14px">暂无采购清单</div>
              <div class="goBuy" style="height:38px;line-height:38px" @click="goGoods">
                去采购</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { fetchCartList, createAdvanceOrder, fetchRemoveCart, modifyCart } from '@/api/reception/cart/cart'
  import defaultImg from '@/assets/reception/goodsList/no_img.jpg'
  import LoginModel from '@/components/common/loginModel.vue'
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        data: 'data',
        mdShow: false,
        defaultImg: defaultImg,
        disabledPu: true,
        carCount: 0,
        totalPrice: 0,
        goodsNums: 0,
        goodsAllNums: 0,
        itemValueStart: 0,
        detailDisabel: false,
        fixFit: false,
        loading: false,
        dataList: [],
        cartList: [],
        subList: [],
      }
    },
    computed: {
      allNumber () {
        let allCount = 0
        this.dataList.forEach((item) => {
          for (let i = 0; i < item.items.length; i++) {
            if (item.items[i].checkedDisabel === true) {
              allCount += Number(item.items[i].number)
            }
          }
        })
        return allCount
      },
      allPriceCart () {
        if (!this.dataList || !this.dataList.length) {
          return '￥0'
        }
        let allPrice = 0
        let notHasPirce = false
        this.dataList.forEach((item) => {
          for (let i = 0; i < item.items.length; i++) {
            if (item.items[i].checkedDisabel === true && item.items[i].unitPrice === -1) {
              notHasPirce = true
              return
            }
            if (item.items[i].checkedDisabel === true) {
              allPrice += Number(item.items[i].number * item.items[i].unitPrice)
            }
          }
        })
        return notHasPirce ? '议价' : `${allPrice}`
      }
    },
    components: {
      LoginModel
    },
    methods: {
      goHome () {
        this.$router.push({
          path: '/'
        })
      },
      goGoods () {
        this.$router.push({
          path: '/'
        })
      },
      // 展示详情页面
      showDetail (item, list, index) {
        let temp = item
        temp.detailDisabel = !temp.detailDisabel
        list.splice(index, 1, temp)
      },
      checkedGoods (item, list, index) {
        let temp = item
        temp.checkedDisabel = !temp.checkedDisabel
        list.splice(index, 1, temp)
      },
      getDataList (arr) {
        let arrNull = []
        if (arr == null) {
          return arrNull
        } else {
          let returnArr = []
          let lineArr = []
          for (let i = 0; i < arr.length; i++) {
            lineArr.push(arr[i])
            if (i === arr.length - 1) {
              returnArr.push(lineArr)
            } else if (lineArr.length >= 3) {
              returnArr.push(lineArr)
              lineArr = []
            }
          }
          return returnArr
        }
      },
      // 移除
      removeCart (item) {
        let params = {
          id: item.id,
          userId: getUserInfo().userId
        }
        fetchRemoveCart(params).then((res) => {
          if (res.data.code === 200) {
            this.getCarList()
          }
        })
      },

      removeCart2 (item) {
        let params = {
          id: item.id,
          userId: getUserInfo().userId
        }
        fetchRemoveCart(params).then((res) => {
          if (res.data.code === 200) {
            this.getCarList()
          }
        })
      },

      // 校验最小起订量
      checkNumber (itemValue) {
        this.itemValueStart = itemValue.minOrderNum
        let myreg = /^\+?[1-9][0-9]*$/
        if (!myreg.test(itemValue.number)) {
          this.$message.error('不能输入小数,只能是正整数！')
          itemValue.number = this.itemValueStart
        }
        if (itemValue.number < this.itemValueStart) {
          this.$message.error('采购数量不能低于起订量！！')
          itemValue.number = this.itemValueStart
        }
        if (itemValue.number > 99999) {
          this.$message.error('采购数量不能大于99999！！')
          itemValue.number = 99999
        }
        let parmas = {
          id: itemValue.id,
          userId: getUserInfo().userId,
          itemNo: itemValue.number
        }
        modifyCart(parmas).then(res => {
          if (res.data.code === 200) {
            // this.getCarList()
          }
        })
      },
      // getCarNum () {
      //   let params = {
      //     userId: getUserInfo().userId
      //   }
      //   fetchCartList(params).then((res) => {
      //     if (res.data.code === 200) {
      //       this.cartList = res.data.data
      //       this.totalPrice = res.data.data.totalPrice
      //       this.carCount = res.data.data.count
      //     }
      //   })
      // },
      getCarList () {
        let params = {
          userId: getUserInfo().userId,
          advanceOrderId: ''
        }
        fetchCartList(params).then(res => {
          if (res.data.code === 200 && res.data.data.cartItemLineListDTOList && res.data.data.cartItemLineListDTOList.length > 0) {
            this.disabledPu = true
            // let dataList = res.data.data.cartItemLineListDTOList
            // this.disabledPu = !!dataList.length
            this.dataList = res.data.data.cartItemLineListDTOList
            console.log('l:', this.dataList.length)
            this.goodsNums = this.dataList.length
            this.goodsAllNums = 0
            this.dataList.forEach((item) => {
              for (let i = 0; i < item.items.length; i++) {
                item.items[i].detailDisabel = false
              }
              for (let i = 0; i < item.items.length; i++) {
                item.items[i].checkedDisabel = false
              }
              this.goodsAllNums = this.goodsAllNums + item.items.length
            })
          } else {
            this.disabledPu = false
            this.goodsAllNums = 0
          }
        })
      },
      submitOrder () {
        this.subList = []
        this.dataList.forEach((item) => {
          for (let i = 0; i < item.items.length; i++) {
            if (item.items[i].checkedDisabel === true) {
              this.subList.push(item.items[i].itemLineId)
            }
          }
        })
        if (this.subList.length > 0) {
          let parmas = {
            itemLineIds: this.subList,
            userId: getUserInfo().userId
          }
          createAdvanceOrder(parmas).then(res => {
            if (res.data.code === 200) {
              this.$router.push({path: '/createOrder', query: {id: `${res.data.data}`}})
            }
          })
        } else {
          this.$message.error('已加入订单商品数量为0，不能提交订单,请勾中要加入的订单！')
        }
      },
      handleScroll() {
        const maxHeight = window.document.body.scrollHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (maxHeight - scrollTop < 1200) {
          // relative
          this.fixFit = true
        } else {
          this.fixFit = false
        }
      },
      confrimSubmit () {
        if (this.carCount === 0) {
          this.$message.error('已加入订单商品数量为0，不能提交订单！')
        } else {
          this.$router.push({ path: '/createOrder' })
        }
      },
    },
    created () {
      // this.getCarNum()
      this.getCarList()
    },
    mounted () {
      window.scroll(0, 1)
      const maxHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      console.log(maxHeight)
      if (maxHeight < 1050) {
        this.fixFit = true
      }
      window.addEventListener('scroll', this.handleScroll)
      // setTimeout(() => {
      //   this.mdShow = true
      // }, 1000)
    }
  }
</script>
<style lang="sass">
  @import "index"
</style>
