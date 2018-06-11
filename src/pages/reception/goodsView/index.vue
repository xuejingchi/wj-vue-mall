<template>
  <div class="goods-view-bg">
    <div class="goods-view-main">
      <!-- 产品详情信息 -->
      <section class="goods-detail-info">
        <div class="detail-info-imgs">
          <div class="main-carousel" :style="{ backgroundImage: 'url(' + activeImgUrl + ')' }"></div>
          <!-- 预览图 -->
          <div class="detail-info-previews">
            <div class="previews-left-btn" :class="{ disabled: imgShowIndex === 0 }" @click="showPrevImg()"></div>
            <div class="swiper-container">
              <div class="swiper-wrapper" :style="swiperStyleObj">
                <div class="swiper-slide" v-if="itemInfo.imageList && itemInfo.imageList.length" v-for="(item, index) in itemInfo.imageList" @click="changeImgShow(item, index)" :style="{ backgroundImage: 'url(' + item.picExFileid || defaultImg + ')' }">
                  <!--<img :src="item">-->
                  <!--<span>{{ item }}</span>-->
                </div>
              </div>
            </div>
            <div class="previews-right-btn" :class="{ disabled: !itemInfo.imageList || !itemInfo.imageList.length || imgShowIndex === itemInfo.imageList.length - 1 }" @click="showNextImg()"></div>
          </div>
        </div>
        <div class="detail-info-main">
          <!-- 标题 -->
          <p class="detail-info-name">
            {{ itemInfo.name }}
          </p>
          <!-- 价格模块 -->
          <div class="detail-info-price">
            <div class="detail-price-lines">
              <p class="detail-price-unit">
                <span class="detail-price-key">价      格：</span>
                <span class="detail-price-value" v-if="hasOnlyPrice" :class="{ blacked: isLogin && userInfo.customerLevel && userInfo.customerLevel !== '00' }">￥{{ itemInfo.price | showPriceToTwoDecimal }}</span>
                <span class="detail-price-value" v-if="!hasOnlyPrice" :class="{ blacked: isLogin && userInfo.customerLevel && userInfo.customerLevel !== '00' }">￥{{ minPrice | showPriceToTwoDecimal }} - {{ maxPrice | showPriceToTwoDecimal }}</span>
                <span class="detail-price-key detail-count-unit">计价单位：</span>
                <span class="detail-unit-value">{{ itemInfo.unit }}</span>
              </p>
              <p class="detail-info-code">
                <span class="detail-price-key detail-price-code">商品编码：</span>
                <span class="detail-code-value">{{ itemInfo.itemNum }}</span>
              </p>
            </div>
            <!-- 已登录 -->
            <div v-if="isLogin && userInfo.customerLevel && userInfo.customerLevel !== '00'" class="detail-member-box">
              <div class="detail-login-price">
                <span v-if="userInfo.customerLevel === '20'" class="vip-price-label">VIP会员价格：</span>
                <span v-if="userInfo.customerLevel === '10'" class="vip-price-label detail-level-price">高级会员价格：</span>
                <span class="vip-price-num">￥{{ itemInfo.memberPrice | showPriceToTwoDecimal }}</span>
              </div>
            </div>
          </div>
          <!-- 供货区域 -->
          <div class="detail-info-area">
            <span class="detail-area-label">供货区域：</span>
            <select class="detail-area-select" v-model="areaCode" name="" id="" disabled="disabled">
              <option v-for="areaObj in itemInfo.area" :value="areaObj.areaCode">{{ areaObj.areaName }}</option>
            </select>
          </div>
          <!-- 价格参数 -->
          <div class="price-params-list">
            <div v-for="param in itemInfo.attributes" class="price-params-item clearfix">
              <div class="params-item-label" :title="param.name">{{ param.name }}：</div>
              <div class="params-value-list">
                <li v-if="item.name" v-for="(item, index) in param.values" class="params-value-item">
                  {{ item.name }}
                </li>
              </div>
            </div>
          </div>
          <!-- 采购数量 -->
          <div class="detail-order-num">
            <span class="order-num-label min-order-num">最小起订量：</span>
            <span class="order-num-count">{{ itemInfo.minQuantity }}</span>
            <span class="order-num-label">{{ itemInfo.unit }}</span>
          </div>
          <section class="detail-info-footer">
            <!-- 下单加购物车按钮 -->
            <div class="detail-order-btns">
            </div>
          </section>
        </div>
      </section>
      <!-- 技术参数 -->
      <section v-if="techData && techData.length" class="detail-tech-params">
        <nav class="detail-nav">
          <p class="nav-left-title">技术参数</p>
          <div class="nav-right-block"></div>
        </nav>
        <div class="tech-params-wrapper">
          <ul class="tech-parames-line" v-for="params in comTechData">
            <li class="tech-parames-item" v-for="item in params">
              <span class="tech-params-left">{{ item.attributeName }}：</span>
              <span class="tech-params-right">{{ item.attributeValue }}</span>
            </li>
          </ul>
        </div>
      </section>
      <!-- 商品详情 -->
      <section v-if="detailData && detailData.itemDescDTOList && detailData.itemDescDTOList.length" class="detail-info-detail">
        <nav class="detail-nav">
          <p class="nav-left-title">详细描述</p>
          <div class="nav-right-block"></div>
        </nav>
        <div v-if="detailData && detailData.itemDescDTOList && detailData.itemDescDTOList.length" class="info-detail-desc">
          <!--{{ detailData }}-->
          <div v-for="item in detailData.itemDescDTOList" class="info-detail-item">
            <p class="info-detail-title">{{ item.descTitle }}</p>
            <p class="info-detail-text">{{ item.descText }}</p>
          </div>
          <div v-if="detailData.imageDTOList && detailData.imageDTOList.length" style="margin-top: 20px;">
            <div v-for="item in detailData.imageDTOList">
              <img v-if="item.picExFileid" :src="`${ServerImgUrl}${item.picExFileid || defaultImg}`" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import Swiper from 'swiper'
import defaultImg from '@/assets/reception/goodsList/no_img.jpg'
import { getItemBaseInfo, getSkuAttributeList, getItemInfoDetail } from '@/api/reception/goodsDetail'
import { getUserInfo, setUserInfo, getCompanyFlag } from '@/utils/auth.js'
export default {
  name: 'goodsView',
  data () {
    return {
      showBtn: false,
      openBtn: '',
      canOperate: true,
      defaultImg: defaultImg,
      // 需要登录
      needLogin: false,
      // 是否认证
      companyFlag: getCompanyFlag(),
      num: 2,
      price: 688.03432,
      // 已登录
      isLogin: getUserInfo().hasOwnProperty('userId'),
      memberVip: true,
      memberHigh: false,
      imgShowIndex: 0,
      imgSwiper: null,
      techData: [],
      itemId: this.$route.query.itemId,
      areaCode: this.$route.query.areaCode || '',
      userInfo: getUserInfo(),
      itemInfo: {
        'imageList': [],
        'info': {}
      },
      // 已被选中的对象
      hasSelectedValues: {},
      detailData: '详情页数据',
      minPrice: 0,
      maxPrice: 0
    }
  },
  computed: {
    query () {
      return {
        itemId: this.itemId,
        areaCode: this.areaCode,
        userId: this.userInfo.userId
      }
    },
    /*
    * 计算后的技术参数
    * */
    comTechData () {
      let returnArr = []
      let lineArr = []
      for (let i = 0; i < this.techData.length; i++) {
        lineArr.push(this.techData[i])
        if (i === this.techData.length - 1) {
          returnArr.push(lineArr)
        } else if (lineArr.length >= 4) {
          returnArr.push(lineArr)
          lineArr = []
        }
      }
      return returnArr
    },
    /*
    * 当前显示图片
    * */
    activeImgUrl () {
      if (!this.itemInfo.imageList || !this.itemInfo.imageList.length) {
        return ''
      }
      return this.itemInfo.imageList[this.imgShowIndex].picExFileid
    },
    /*
    * 图片滑动样式
    * */
    swiperStyleObj () {
      if (this.imgShowIndex >= 5) {
        const translateX = (this.imgShowIndex - 4) * 70
        return {
          transform: `translate(-${translateX}px, 0)`
        }
      }
    },
    /*
    * 有确定的价格
    * */
    hasOnlyPrice () {
      let hasPrice = true
      if (!this.itemInfo.attributes || !this.itemInfo.attributes.length) {
        return hasPrice
      }
      this.itemInfo.attributes.forEach(attribute => {
        if (this.configEveryFalse(attribute.values)) {
          hasPrice = false
        }
        // attribute.values.forEach(value => {
        //   if (!value.selected) {
        //     hasPrice = false
        //   }
        // })
      })
      if (!hasPrice) {
        this.getPriceSection()
      }
      // return hasPrice
      return true
    }
  },
  mounted () {
    // 加载数据
    this.loadData()
  },
  methods: {
    /*
    * 判断是否全为false
    * */
    configEveryFalse (arr) {
      let flag = true
      arr.forEach(item => {
        if (item.selected) {
          flag = false
        }
      })
      return flag
    },
    /*
    * 加载数据
    * */
    loadData () {
      this.canOperate = true
      // 基础数据
      getItemBaseInfo(this.query).then(res => {
        if (res.data.code === 200) {
          let itemInfo = res.data.data.itemInfo
          // 更新会员等级
          if (itemInfo.customerLevel) {
            let userInfo = getUserInfo()
            userInfo.customerLevel = itemInfo.customerLevel
            setUserInfo(JSON.stringify(userInfo))
          }
          // 修改选中的值 undefined ---> false
          itemInfo.attributes.forEach(attribute => {
            attribute.values.forEach(value => {
              if (value.selected) {
                this.hasSelectedValues[attribute.name] = value.values
                // 如果存在 selected为true 且 enable 为false的参数，则将操作按钮置灰
                if (!value.enable) {
                  this.canOperate = false
                }
              }
            })
          })
          // 计价单位
          itemInfo.showUnit = itemInfo.unit && itemInfo.unit.length >= 6 ? `${itemInfo.unit.slice(0, 5)}...` : itemInfo.unit
          // 添加图片前缀路径
          if (itemInfo.imageList && itemInfo.imageList.length) {
            if (itemInfo.imageList.length > 5) {
              itemInfo.imageList = itemInfo.imageList.slice(0, 5)
            }
            itemInfo.imageList.forEach(item => {
              item.picExFileid = this.ServerImgUrl + item.picExFileid
            })
          } else {
            itemInfo.imageList = [{
              picExFileid: this.defaultImg
            }]
          }
          // 默认供货区域
          if (itemInfo.area && itemInfo.area.length) {
            itemInfo.area.forEach(item => {
              if (item.default) {
                this.areaCode = item.areaCode
              }
            })
          }
          itemInfo.minQuantity = itemInfo.minQuantity || 1
          this.itemInfo = itemInfo
          this.num = itemInfo.minQuantity
          // 判断选项是否可选
          if (this.itemInfo.attributes && this.itemInfo.attributes.length) {
            this.configParamEnable(this.itemInfo.attributes)
          }
        }
      }, err => {
        console.log('err', err)
      })
      // 技术参数
      getSkuAttributeList({
        itemId: this.itemId
      }).then(res => {
        if (res.data.code === 200) {
          this.techData = []
          res.data.data.forEach(item => {
            if (item.attributeName) {
              this.techData.push(item)
            }
          })
        }
      }, err => {
        console.log('err', err)
      })
      // 详情数据
      getItemInfoDetail({
        itemId: this.itemId
      }).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data
          data.imageDTOList.sort((item1, item2) => {
            return parseInt(item1.picOrder, 10) - parseInt(item2.picOrder, 10)
          })
          this.detailData = data
        }
      })
    },
    /*
    * 切换图片预览
    * */
    changeImgShow (url, index) {
      this.imgShowIndex = index
    },
    /*
    * 展示上一个图片
    * */
    showPrevImg () {
      if (this.imgShowIndex === 0) {
        return
      }
      this.imgShowIndex -= 1
    },
    /*
    * 展示下一个图片
    * */
    showNextImg () {
      if (this.imgShowIndex === this.itemInfo.imageList.length - 1) {
        return
      }
      this.imgShowIndex += 1
    },
    /*
    * 获取两个数组的交集数组
    * */
    getIntersection (arr1, arr2) {
      if (!arr1.length || !arr2.length) {
        return []
      }
      let returnArr = []
      arr1.forEach(item1 => {
        arr2.forEach(item2 => {
          if (item1 === item2) {
            returnArr.push(item2)
          }
        })
      })
      return returnArr
    },
    /*
    * 重置已选内容
    * */
    resetSelected (arr) {
      arr.forEach(item => {
        item.selected = false
      })
    },
    /*
    * 判断选项是否可选
    * */
    configParamEnable (attributes) {
      for (let i = 0; i < attributes.length; i++) {
        let values = this.getSelectedValues(attributes[i])
        this.disableOtherParam(values, i, attributes)
      }
    },
    /*
    * 获取单条下选中的values
    * */
    getSelectedValues (attribute) {
      let values = []
      attribute.values.forEach(item => {
        if (item.selected) {
          values = item.values
        }
      })
      return values
    },
    /*
    * 使其他的不可选
    * */
    disableOtherParam (configValues, configIndex, attributes) {
      // 遍历原数组
      attributes.forEach((attribute, index) => {
        // 与其他并列项做比较
        if (configIndex !== index) {
          attribute.values.forEach(value => {
            if (!this.getIntersection(value.values, configValues).length) {
              value.enable = false
            }
            // 前端不需要判断是否选中状态
            // if (value.selected && !this.getIntersection(value.values, configValues).length) {
            //   value.selected = false
            // }
          })
        }
      })
    },
    /*
    * 获取价格区间
    * */
    getPriceSection () {
      let minPrice = 0
      let maxPrice = 0
      this.itemInfo.attributes.forEach(attribute => {
        attribute.values.forEach(value => {
          if (value.minPrice > minPrice) {
            minPrice = value.minPrice
          }
          if (value.maxPrice < maxPrice) {
            maxPrice = value.maxPrice
          }
        })
      })
      this.minPrice = minPrice
      this.maxPrice = maxPrice
    },
  },
  components: {
  }
}
</script>

<style lang="sass">
  @import "./index"
</style>
