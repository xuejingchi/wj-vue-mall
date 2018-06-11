<template>
  <div class="hp">
    <div class="bg">
      <div class="hp-header">
        <div class="first-nav clearfix">
          <el-carousel height="310px" :interval="5000">
            <el-carousel-item>
              <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riCN-AF6BVAAMfbVuSfVI858.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriCN-AXBIEAAJ9UUCRhqU225.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riCN-AApDOAAL-z-EWBjY728.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
              <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriCSqAOgD2AAJavz26CqM814.jpg" alt="">
            </el-carousel-item>
          </el-carousel>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riCWiAAiJ_AACMJbULshY759.jpg" alt="">
                <div>冰岛雷克雅未克音乐会议中心</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriCWiAFgc7AAB4rH6F_jc591.jpg" alt="">
                <div>法兰克福空铁中心</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riCWiAanxAAACstpqlmP8874.jpg" alt="">
                <div>杭州东站</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriCbGAHfmNAACpeW4ZTRQ530.jpg" alt="">
                <div>绿城九龙仓柳岸晓风</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riCbGAV_gyAACxT5xdTmc092.jpg" alt="">
                <div>跑马场</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriCbGAH3tvAACJZOaKFWU421.jpg" alt="">
                <div>钱江世纪城人才专项用房</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riCfyAd25YAAB7a2Ytx9k497.jpg" alt="">
                <div>圣地天堂洲际大饭店</div>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriCfyAXMQmAACVEXmBd5Q576.jpg" alt="">
                <div>万郡·大都城</div>
              </div>
            </div>
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
          </div>
        </div>
        <div class="first-right clearfix">
          <div class="login" v-if="userInfo.userId === '' || userInfo.userId === 'null' || userInfo.userId === undefined">
            <img class="header clearfix" src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriyLaAUCcJAAAIecCjQQ8937.png" />
            <div class="welcome clearfix">
              <div class="hello" v-if="userInfo.userName !== 'null' && userInfo.userName !== undefined && userInfo.userName !== ''">{{ userInfo.userName }}</div>
              <div class="hello"><span v-if="userInfo.userName !== 'null' || userInfo.userName !== undefined || userInfo.userName !== ''">Hi，</span>欢迎来到万郡绿建</div>
              <div class="title" v-if="userInfo.userName === 'null' || userInfo.userName === undefined || userInfo.userName === ''">绿色建材 一站式采购</div>
            </div>
            <div class="opeation clearfix">
              <div class="register-btn"><router-link :to="{path:'/register'}">免费注册</router-link></div>
              <div class="login-btn"><router-link :to="{path:'/login'}">登录</router-link></div>
            </div>
          </div>
          <div class="login" style="text-align: center" v-if="userInfo.userId !== '' && userInfo.userId !== 'null' && userInfo.userId !== undefined">
            <img  style="float: none" class="header clearfix" src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riEeGAaYf5AAATyb7cE90388.png" />
            <p style="margin-top:16px;font-size: 14px;color: #333333;">
              {{ userInfo.userName }}
              <i v-if="userInfo.userVip === '10'" style="vertical-align: middle"><img src="http://mall.vandream.com:8081/group1/M00/00/00/rBCwI1rhp2mACjnSAAAFsZ4wu8o180.png" alt="" width="14px"></i>
              <i v-if="userInfo.userVip === '20'" style="vertical-align: middle"><img src="http://mall.vandream.com:8081/group1/M00/00/00/rBCwJFrhp7CAegUjAAAGMuQj0nU232.png" alt="" width="14px"></i>
              <span style="font-size: 12px;color: #1D6EEB;" @click="logOut()">[退出]</span>
            </p>
            <p v-if="userInfo.companyStatus !== '3'" style="font-size: 13px;color: #333333;">
              您还没有完成认证
              <router-link v-if="userInfo.accountFlag === '1'" :to="{path: '/identification/'}" style="font-size: 13px;color: #F18115;margin-top: 3px">   去认证</router-link>
              <router-link v-if="userInfo.accountFlag === '2'" :to="{path: '/identification/result'}" style="font-size: 13px;color: #F18115;margin-top: 3px">   认证中</router-link>
            </p>
            <p v-if="(userInfo.userVip === '00' && userInfo.accountFlag === '3') || (userInfo.companyFlag === '1' && userInfo.userVip === '00')" style="font-size: 13px;color: #333333;margin-top: 3px">万郡绿建竭诚为您服务</p>
            <p v-if="userInfo.userVip === '10' || userInfo.userVip === '20'" style="font-size: 13px;color: #333333;margin-top: 3px">
              您是万郡绿建<span v-if="userInfo.userVip === '10'">高级</span><span v-if="userInfo.userVip === '20'">vip</span>会员
            </p>
          </div>
          <div class="content" v-for="data in bulletinData">
            <div class="title">
              <span>{{ data.attr.title }}</span>
            </div>
            <div class="content-list">
              <div class="single-content clearfix" v-for="list in data.attr.child">
                <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank">
                  <div class="point"></div>
                  <div class="name">{{ list.attr.title }}</div>
                  <div class="date">{{ list.attr.time }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad"></div>
    <div class="item-list">
      <!-- 第一版 -->
      <!--<div class="item" v-for="item in data">-->
        <!--<div class="title">-->
          <!--<span>{{ item.attr.floor }}</span>-->
          <!--<span>{{ item.attr.name }}</span>-->
        <!--</div>-->
        <!--<div class="item-content clearfix">-->
          <!--<div v-for="list in item.attr.child">-->
            <!--<div class="img-title" v-if="list.styleType === 'category_img_link_css'">-->
              <!--<a :href="list.attr.url"><img :src="list.attr.src" alt="" /></a>-->
            <!--</div>-->
            <!--<div class="item-group" v-if="list.styleType === 'model_css'">-->
              <!--<div v-for="group in list.attr.child">-->
                <!--<div class="group-img-first clearfix" v-if="group.styleType === 'category_img_title_link_css'">-->
                  <!--<div class="group-name">-->
                    <!--<a :href="group.attr.url"><div class="title">{{ group.attr.name }}</div></a>-->
                    <!--<div class="normal">常用采购品类</div>-->
                  <!--</div>-->
                  <!--<a :href="group.attr.url"><img :src="group.attr.src" alt="" /></a>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="group-list-first">-->
                <!--<div class="detail clearfix" v-for="(groupList, index) in list.attr.child" v-if="index !== 0">-->
                  <!--<div class="point"></div>-->
                  <!--<a :href="groupList.attr.url"><div class="name">{{ groupList.attr.name }}</div></a>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="brand-group" v-if="list.styleType === 'brand_model_css'">-->
              <!--<div class="title">{{ list.attr.name }}</div>-->
              <!--<div class="brand-content clearfix">-->
                <!--<div v-for="(group, index) in list.attr.child">-->
                  <!--<div class="brand-detail" v-if="group.styleType === 'category_brand_link_css'">-->
                    <!--<img :src="group.attr.src" alt="">-->
                    <!--<div class="name">{{ group.attr.title }}</div>-->
                    <!--<div class="content">{{ group.attr.content }}</div>-->
                    <!--<a :href="group.attr.url"><div class="detail">查看品牌详情</div></a>-->
                  <!--</div>-->
                  <!--<div class="f-l brand-detail-log" v-if="group.styleType === 'category_img_link_css'">-->
                    <!--<div class="log-item" v-if="index !== 0">-->
                      <!--<a :href="group.attr.url"><img :src="group.attr.src" alt="" /></a>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!-- 第二版 -->
      <div class="item2" v-for="item in data">
        <div class="title">{{ item.attr.floor }} {{ item.attr.name }}</div>
        <div class="item-content clearfix">
          <div class="main-item" v-for="data in item.attr.child" v-if="data.styleType === 'category_img_str_model_css'">
            <img v-for="detail in data.attr.child" v-if="detail.styleType === 'category_img_link_css'" :src="`${ goodsImgUrl }${ detail.attr.src }`" alt="">
            <div v-for="detail in data.attr.child" v-if="detail.styleType === 'category_str_model_css'" class="list clearfix">
              <div class="data" v-for="name in detail.attr.child"><a :href="`${ urlLink }#${ name.attr.url }`" target="_blank">{{ name.attr.name }}</a></div>
            </div>
          </div>
          <div class="item-list" v-for="list in item.attr.child" v-if="list.styleType === 'category_item_model_css'">
            <div class="item" v-for="data in list.attr.child">
              <a :href="`${ urlLink }#${ data.attr.url }`" target="_blank">
                <img :src="`${ goodsImgUrl }${ data.attr.src}`" alt="">
                <div class="name">{{ data.attr.itemName }}</div>
                <div class="price" v-if="userInfo.customerLevel === '00' || userInfo.customerLevel === undefined">￥{{ data.attr.marketPrice | showPriceToTwoDecimal}} <span style="color: #888;font-size: 13px;font-family: PingFangSC-Regular;">/{{ data.attr.unit }}</span></div>
                <div class="price" v-if="userInfo.customerLevel === '10'">￥{{ data.attr.superPrice | showPriceToTwoDecimal}} <span style="color: #888;font-size: 13px;font-family: PingFangSC-Regular;">/{{ data.attr.unit }}</span></div>
                <div class="price" v-if="userInfo.customerLevel === '20'">￥{{ data.attr.vipPrice | showPriceToTwoDecimal}} <span style="color: #888;font-size: 13px;font-family: PingFangSC-Regular;">/{{ data.attr.unit }}</span></div>
                <div class="warning" v-if="!userInfo.userId">会员价登录可见</div>
              </a>
            </div>
          </div>
          <div class="brand-list clearfix" v-for="brand in item.attr.child" v-if="brand.styleType === 'category_brand_model_css'">
            <a v-for="(data, index) in brand.attr.child" :href="`${ urlLink }#${ data.attr.url }`" target="_blank">
              <img :src="`${ goodsImgUrl }${ data.attr.src }`" alt=""><div v-if="index !== brand.attr.child.length - 1" class="border-l"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <v-identify ref="identify"></v-identify>
  </div>
</template>

<script>
import { fetchGoodsList } from '@/api/reception/goods/goods'
import { getUserInfo, removeCookies, setAccountFlag } from '@/utils/auth'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { logOut } from '@/api/login/login'
import { getAcountFlag } from '@/api/person/identification'
import Identify from '@/components/identify/identification.vue'
export default {
  name: 'hp',
  components: {
    'v-identify': Identify
  },
  data () {
    return {
      data: [],
      bulletinData: [],
      userInfo: {
        userName: getUserInfo().phoneNumber ? `${getUserInfo().phoneNumber.substr(0, 3)}****${getUserInfo().phoneNumber.substr(7)}` : '',
        companyName: getUserInfo().companyName,
        userId: getUserInfo().userId,
        userType: getUserInfo().companyFlag,
        userVip: getUserInfo().customerLevel,
        companyStatus: getUserInfo().companyStatus,
        accountFlag: getUserInfo().accountFlag
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 判断企业状态
      this.configAccountStatus()
    })
    this.loop()
    const data = {
      id: 0
    }
    const bulletinData = {
      // 第一版
      // id: 114
      // 第二版
      id: 128
    }
    fetchGoodsList(data).then((res) => {
      this.data = res.data.data
    })
    // 网站公告
    fetchGoodsList(bulletinData).then((res) => {
      this.bulletinData = res.data.data
    })
  },
  methods: {
    /*
    * 判断企业状态
    * */
    configAccountStatus () {
      // 判断是否登录,未登录不需要认证
      if (!getUserInfo().userId) {
        return false
      }
      getAcountFlag({
        userId: getUserInfo().userId
      }).then(res => {
        if (res.data.code === 200) {
          setAccountFlag(res.data.data)
          // 如果登录账号未认证，则显示认证弹框
          if (res.data.data === '1') {
            this.$refs.identify.dialogVisible = true
          }
        }
      })
    },
    loop() {
      Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 8,
        loop: true
      })
    },
    logOut () {
      logOut().then(() => {
        removeCookies()
        window.location.href = '/'
      })
    }
  }
}
</script>
<style lang="sass">
  @import "index"
</style>
