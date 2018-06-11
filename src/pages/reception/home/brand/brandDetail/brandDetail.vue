<template>
  <div class="brandDetail">
    <div class="brand-nav">
      当前位置: <router-link :to="{path: '/'}">首页</router-link> > 品牌 > {{brandDetail.brandName}}
    </div>
    <div class="detail-title">
      <div class="detail-img">
        <img :src="`${ goodsImgUrl }${ brandDetail.logoUrl }`" alt="">
      </div>
      <div class="detail-content">
        <h1>{{brandDetail.brandName}}</h1>
        <p>公司网址：<a :href="brandDetail.website" target="_blank">{{brandDetail.website}}</a></p>
        <p>成立时间：{{brandDetail.foundYear}}</p>
      </div>
      <div class="detail-note">{{brandDetail.brandIntroductionNotes}}</div>

    </div>

    <div class="brand-story">
      <p class="story-title">
        {{brandDetail.brandStoryTitle}}
      </p>
      <p class="story-con" v-for="item in brandStoryNotes">
        {{item}}
      </p>
      <p class="story-con" v-html="brandDetail.brandStoryNotes"></p>
    </div>
  </div>
</template>

<script>
  import { getBrandDetailById } from '@/api/reception/brand/brandList'
  export default {
    name: 'brandDetail',
    components: {
    },
    data () {
      return {
        brandDetail: [],
        brandStoryNotes: []
      }
    },
    // watch: {
    //
    // },
    created () {
      let pramas = {
        brandId: this.$route.query.brandId
      }
      getBrandDetailById(pramas)
        .then((response) => {
          if (response.status === 200) {
            this.brandDetail = response.data.data
            // if (this.brandDetail.brandStoryNotes) {
            //   this.brandStoryNotes = this.brandDetail.brandStoryNotes.split('^')
            // }
          }
        })
    },
    methods: {
    }
  }
</script>
<style lang="sass">
  /*@import "index"*/
</style>
