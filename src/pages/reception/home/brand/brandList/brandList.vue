<template>
  <div class="brandList">
    <div class="brand-nav">
      当前位置: <router-link :to="{path: '/'}">首页</router-link> > 品牌
    </div>
    <ul class="brandList-ul">
      <li v-for="item in brandList.list">
        <div class="list-img">
          <img :src="`${ goodsImgUrl }${ item.logoUrl }`" alt="">
        </div>
        <div class="list-content" @click="changeChildrenRoute(item.brandId)">
          <h1>{{item.brandName}}</h1>
          <!--<h2>{{item.introduce}}</h2>-->
          <p>{{item.brandIntroductionNotes}}</p>
        </div>
        <div class="list-btn" @click="changeChildrenRoute(item.brandId)">查看详情</div>
      </li>
    </ul>
    <div class="pageNav" v-if="pageMax">
      <div class="f-bg-m">
        <div class="u-turn-left" @click="goPage(brandList.pageNo - 1)" v-if="brandList.pageNo > 1">上一页</div>
        <div class="u-turn-left noClick" v-else>上一页</div>

        <ul>
          <li v-for="(item,i) in pageMax" @click="goPage(i+1)" :class="{'z-current':brandList.pageNo === i+1}">{{item}}</li>
        </ul>

        <div class="u-turn-right" @click="goPage(brandList.pageNo + 1)" v-if="brandList.pageNo < pageMax">下一页</div>
        <div class="u-turn-right noClick" v-else>下一页</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { findBrandList } from '@/api/reception/brand/brandList'
  export default {
    name: 'brandList',
    data () {
      return {
        brandList: [],
        pageMax: ''
      }
    },
    created () {
      this.getBrandList(1)
    },
    methods: {
      changeChildrenRoute(id) {
        // this.$router.push(`/brand/brandDetail?brandId=${id}`)
        let routeData = this.$router.resolve({
          path: '/brand/brandDetail',
          query: {
            brandId: id
          }
        })
        window.open(routeData.href, '_blank')
      },
      getBrandList(num) {
        let pramas = {
          pageSize: 10,
          pageNo: num
        }
        findBrandList(pramas)
          .then((response) => {
            if (response.status === 200) {
              this.brandList = response.data.data
              this.pageMax = Math.ceil(this.brandList.totalSize / this.brandList.pageSize)
            }
          })
      },
      goPage(pageNo) {
        this.getBrandList(pageNo)
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style scoped>

</style>
