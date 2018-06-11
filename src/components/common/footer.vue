<template>
  <div class="footer" :class="home ? 'noBorder' : ''">
    <div class="footer-body">
      <div class="ad-progress" :class="home ? 'border' : ''">
        <img src="http://mall.vandream.com:8081/group1/M00/00/02/rBCwJFr0ErmANxpFAABKCd9P3yk959.png" alt="">
      </div>
      <div class="info clearfix" v-if="home">
        <div class="industry clearfix" v-for="data in newsData">
          <div class="title">{{ data.attr.title }}</div>
          <div v-for="list in data.attr.child">
            <div class="main-industry" v-if="list.styleType === 'news_img_link_css'">
              <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank"><img :src="`${ goodsImgUrl }${ list.attr.src }`" alt="" /></a>
              <div class="industry-title clearfix">
                <!--<div class="coin"></div>-->
                <div class="con">
                  <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank">
                    <div class="industry-title">{{ list.attr.title }}</div>
                    <div class="industry-content" style="-webkit-box-orient: vertical;">{{ list.attr.content }}</div>
                  </a>
                </div>
              </div>
            </div>
            <div class="industry-title clearfix right" v-if="list.styleType === 'news_content_link_css'">
              <!--<div class="coin"></div>-->
              <div class="con">
                <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank">
                  <div class="industry-title">{{ list.attr.title }}</div>
                  <div class="industry-content" style="-webkit-box-orient: vertical;">{{ list.attr.content }}</div>
                </a>
              </div>
            </div>
            <div class="industry-title clearfix right-line" v-if="list.styleType === 'news_str_link_css'">
              <!--<div class="coin-one"></div>-->
              <div class="con">
                <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank"><div class="industry-one">{{ list.attr.title }}</div></a>
              </div>
            </div>
          </div>
        </div>
        <div class="project-case" v-for="data in solutionData">
          <div class="case-title">{{ data.attr.title }}</div>
          <div v-for="list in data.attr.child">
            <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank">
              <div class="project-fir clearfix" v-if="list.styleType === 'solution_img_link_css'">
                <img :src="`${ goodsImgUrl }${ list.attr.src }`" alt="">
                <div>{{ list.attr.title }}</div>
              </div>
            </a>
            <a :href="`${ urlLink }#${ list.attr.url }`" target="_blank">
              <div class="project-title" v-if="list.styleType === 'solution_str_link_css'">{{ list.attr.title }}</div>
            </a>
          </div>
        </div>
      </div>
      <div class="enter clearfix" v-if="home">
        <a href="http://www.vandream.com/html/entrance.html" target="_blank">
          <div class="supplier">
            <div class="title">我是供应商</div>
            <div class="content">海外及国内海量项目聚集</div>
            <div class="btn">立即入驻</div>
          </div>
        </a>
        <a href="http://www.vandream.com/html/xuEntrance.html" target="_blank">
          <div class="buyer">
            <div class="title">我是采购商</div>
            <div class="content">一站式服务 可靠交付</div>
            <div class="btn">立即入驻</div>
          </div>
        </a>
      </div>
      <div class="footer-center">
        <div class="footer-center-content clearfix">
          <div class="footer-log f-l">
            <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriEKuAPMx-AAAnjCCfTpg799.png" alt="" width="100%">
          </div>
          <div class="footer-list f-l clearfix">
            <ul class="f-l list-item">
              <li class="item-title">新手指南</li>
              <li class="item">
                <a :href="`${urlLink}#/help`" class="item-router" target="_blank">搜索商品</a>
              </li>
              <li class="item">
                <a href="http://wpa.qq.com/msgrd?v=3&uin=2034919445&site=qq&menu=yes" class="item-router" target="_blank">在线询价</a>
              </li>
              <li class="item">
                <a href="http://wpa.qq.com/msgrd?v=3&uin=2034919445&site=qq&menu=yes" class="item-router" target="_blank">采购咨询</a>
              </li>
            </ul>
            <ul class="f-l list-item">
              <li class="item-title">交期管理</li>
              <li class="item">
                <a href="http://www.vandream.com/index.html" class="item-router" target="_blank">验厂验资</a>
              </li>
              <li class="item">
                <a href="http://www.vandream.com/index.html" class="item-router" target="_blank">交付保障</a>
              </li>
              <li class="item">
                <a href="http://www.vandream.com/index.html" class="item-router" target="_blank">专业签收</a>
              </li>
            </ul>
            <ul class="f-l list-item">
              <li class="item-title">关于我们</li>
              <li class="item">
                <a class="item-router" href="http://www.vandream.com/html/about.html" target="_blank">万郡绿建</a>
              </li>
              <li class="item">
                <a class="item-router" href="http://www.vandream.com" target="_blank">绿建新闻</a>
              </li>
              <li class="item">
                <a class="item-router" href="http://www.hxss.com.cn/" target="_blank">杭萧钢构</a>
              </li>
            </ul>
            <ul class="f-l list-item">
              <li class="item-title">联系我们</li>
              <li class="item">
                <a class="item-router" href="http://wpa.qq.com/msgrd?v=3&uin=2034919445&site=qq&menu=yes" target="_blank">在线客服</a>
              </li>
              <li class="item">
                <a class="item-router" href="http://www.vandream.com/html/entrance.html" target="_blank">供方入口</a>
              </li>
              <li class="item">
                <a class="item-router" href="http://www.vandream.com/html/about.html" target="_blank">人才招聘</a>
              </li>
            </ul>
            <ul class="f-l no-border list-item">
              <li class="item-title">服务说明</li>
              <li class="item">
                <a class="item-router" :href="`${ urlLink }#/protocol`" target="_blank">隐私声明</a>
              </li>
              <li class="item">
                <a class="item-router" :href="`${ urlLink }#/protocol`" target="_blank">产权保护</a>
              </li>
              <li class="item">
                <a class="item-router" :href="`${ urlLink }#/protocol`" target="_blank">法律声明</a>
              </li>
            </ul>
          </div>
          <div class="footer-info clearfix">
            <div class="info-img f-l">
              <img src="http://mall.vandream.com:8081/group1/M01/00/01/rBCwJFriC9SAdnlZAACIUSOyiEA348.png" alt="" width="100%">
            </div>
            <div class="info-txt f-l">
              <p>
                万郡绿建科技股份有限公司. <br>
                总部：杭州市上城区中河中路258号 <br>
                体验馆：浙江省萧山经济技术开发区红垦路305号
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>万郡绿建科技股份有限公司 | 浙公网安备 33010902001895号 | 浙ICP备 18006540号</p>
          <p style="margin-top: 12px;">© Copyright©2018-2028 万郡绿建VANDREAM  版权所持有</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { fetchGoodsList } from '@/api/reception/goods/goods'
  export default {
    props: {},
    data() {
      return {
        newsData: [],
        home: false,
        solutionData: [],
        url: ''
      }
    },
    created() {
    },
    mounted() {
      if (this.$route.path === '/') {
        this.home = true
      } else {
        this.home = false
      }
    },

    computed: {},
    methods: {},
    components: {},
    watch: {
      $route(to) {
        this.url = to.path
        this.url === '/' ? this.home = true : this.home = false
        if (this.home) {
          const newsData = {
            // 第一版
            // id: 99
            // 第二版
            id: 113
          }
          const solutionData = {
            // 第一版
            // id: 106
            // 第二版
            id: 120
          }
          // 行业资讯
          fetchGoodsList(newsData).then((res) => {
            this.newsData = res.data.data
          })
          // 解决方案
          fetchGoodsList(solutionData).then((res) => {
            this.solutionData = res.data.data
          })
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "../../css/common/footer/footer"
</style>
