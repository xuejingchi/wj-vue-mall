<template>
  <div class="experienceCenter">
    <div class="banner-bg">
      <div class="banner-content clearfix">
        <div class="banner-img">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="vedio-play"></div>
                <video autoplay controls="controls" class="vedio">
                  <source  src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriG6mANjMrAZ1rER90YYk756.mp4" type="video/mp4"></source>
                </video>
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riG9OAJ8SsAAHdFLh-SfI523.jpg">
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriG9OATr3fAAG5yZUBumk790.jpg">
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riG9OAXnaKAALG1mXAaws103.jpg">
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriHCiAExokAAJJlXGNnEk023.jpg">
              </div>
              <div class="swiper-slide">
                <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riHCiAY_aNAAI64WZGUUY014.jpg">
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
          </div>
        </div>
        <div class="banner-txt">
          <h3>产品体验中心</h3>
          <span></span>
          <ul>
            <li>一站式高效体验服务</li>
            <li>22万平方米的产品体验中心</li>
            <li>全方位体验20000+供应商的新产品、新工艺、新技术、新材料</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-items">
      <ul class="clearfix">
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriHIOATLnoAAAem7G3FlA113.png" alt="">
          <h3>超大型产品体验空间</h3>
          <p>位于杭州的超大型线下体验中心，</p>
          <p>打造杭州传统企业转型升级的地</p>
          <p>标建筑。</p>
        </li>
        <li class="line"></li>
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riHIOAO3DHAAAyfZKWJEQ931.png" alt="">
          <h3>全方位品牌、产品展示</h3>
          <p>385个全建材类目展示</p>
          <p>独立的品牌展示展位，给予企业</p>
          <p>更多维度展示品牌的空间</p>
        </li>
        <li class="line"></li>
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriHIOAOEsdAAAmM8hQ10Y285.png" alt="">
          <h3>每天08:00-18:00</h3>
          <p>365天开馆，打造全国乃至</p>
          <p>世界的建筑博览会，为企业带</p>
          <p>来巨大的品牌效应</p>
        </li>
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriHTiALS6aAAAWOIW8LXI042.png" alt="">
          <h3>多样化互动交流</h3>
          <p>专业的服务团队，提供全覆式的交</p>
          <p>流体验，构建企业与企业，企业与</p>
          <p>平台之间的良性交流通道</p>
        </li>
        <li class="line"></li>
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwJFriHTiAQ-BJAAATiASopI0103.png" alt="">
          <h3>体验式选型选样</h3>
          <p>“体验至上，感受第一”，丰富的</p>
          <p>产品和品牌，满足企业不同需求</p>
        </li>
        <li class="line"></li>
        <li class="item">
          <img src="http://mall.vandream.com:8081/group1/M00/00/01/rBCwI1riHTiANibDAAAhN5aR-dI476.png" alt="">
          <h3>会议发布</h3>
          <p>3600平方的专属空间，为企业</p>
          <p>提供评审会、发布会、培训会、</p>
          <p>商讨会等会议会务需求</p>
        </li>
      </ul>
    </div>
    <div class="row"></div>
    <div class="map">
      <div>
        <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwI1riHNmABHgqAAcWmotz0Lk096.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'experienceCenter',
  components: {
  },
  props: ['valueIndex'],
  data () {
    return {
      bannerList: [
        {
          src: '<video autoplay controls="controls" id="vedio"><source  src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriG6mANjMrAZ1rER90YYk756.mp4" type="video/mp4"></source></video>'
        },
        {
          src: '<img src="http://mall.vandream.com:8081/group1/M00/00/11/wKgF2VrO_oGALaEUAAHdFLh-SfI918.jpg">'
        },
        {
          src: '<img src="http://mall.vandream.com:8081/group1/M00/00/11/wKgF2lrO_qOASoi3AAG5yZUBumk955.jpg">'
        },
        {
          src: '<img src="http://mall.vandream.com:8081/group1/M00/00/11/wKgF2VrO_reAcpcTAALG1mXAaws664.jpg">'
        },
        {
          src: '<img src="http://mall.vandream.com:8081/group1/M00/00/11/wKgF2lrO_uiASwVqAAJJlXGNnEk315.jpg">'
        },
        {
          src: '<img src="http://mall.vandream.com:8081/group1/M00/00/11/wKgF2VrO_vqAUGJ1AAI64WZGUUY566.jpg">'
        }
      ],
      play: false,
      swiper: ''
    }
  },
  created () {
  },
  mounted() {
    this.loop()
  },
  methods: {
    loop() {
      this.swiper = Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        disableOnInteraction: false,
        autoplay: 3000,
        simulateTouch: false,
        onInit: (swiper) => {
          swiper.stopAutoplay()
          this.vedioBanner()
        },
        onSlideChangeEnd: (swiper) => {
          console.log(swiper)
          swiper.startAutoplay()
          let vedio = document.getElementsByClassName('vedio')
          this.swiper = swiper.activeIndex
          if (swiper.activeIndex !== 1 && swiper.activeIndex !== 7) {
            swiper.startAutoplay()
            vedio[0].pause()
            vedio[1].pause()
            vedio[0].currentTime = 0
            vedio[1].currentTime = 0
            vedio[0].setAttribute('class', 'vedio none')
            vedio[1].setAttribute('class', 'vedio none')
            this.play = 3000
          } else if (swiper.activeIndex === 1) {
            swiper.stopAutoplay()
            vedio[1].pause()
            vedio[0].play()
            vedio[0].setAttribute('class', 'vedio')
            vedio[0].addEventListener('ended', function () {
              vedio[0].currentTime = 0
              swiper.startAutoplay()
              vedio[0].pause()
            })
            vedio[0].onended = function () {
              console.log(1111111111)
              vedio[0].currentTime = 0
              swiper.startAutoplay()
            }
            if (vedio[0].ended) {
              console.log(222222)
            }
          } else if (swiper.activeIndex === 7) {
            swiper.stopAutoplay()
            vedio[0].pause()
            vedio[1].play()
            vedio[1].setAttribute('class', 'vedio')
            vedio[1].addEventListener('ended', function () {
              vedio[1].currentTime = 0
              swiper.startAutoplay()
              vedio[1].pause()
            })
          }
        }
      })
    },
    vedioBanner () {
      window.onload = function () {
        let vedio = document.getElementsByClassName('vedio')
        let play = document.getElementsByClassName('vedio-play')
        vedio[0].onpause = function () {
          play[0].style.display = 'block'
        }
        vedio[0].onplaying = function () {
          play[0].style.display = 'none'
        }
        vedio[1].onpause = function () {
          play[1].style.display = 'block'
        }
        vedio[1].onplaying = function () {
          play[1].style.display = 'none'
        }
        play[0].onclick = function () {
          vedio[0].play()
          play[0].style.display = 'none'
        }
        play[1].onclick = function () {
          vedio[1].play()
          play[1].style.display = 'none'
        }
      }
    }
  },
  watch: {
  }
}
</script>
<style lang="sass">
  @import "experienceCenter"
</style>
