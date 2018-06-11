<template>
  <div class="solutionList">
    <div class="solution-list">
      <p class="solutionList-top">解决方案</p>
      <ul>
        <li v-for="item in solutionList.list">
          <div class="list-img">
            <img :src="`${ goodsImgUrl }${ item.pictureUrl }`" alt="">
          </div>
          <div class="list-content" @click="changeChildrenRoute(item.id)">
            <h1>{{item.title}}</h1>
            <p>{{item.briefIntroduction}}</p>
          </div>
          <div class="list-btn" @click="changeChildrenRoute(item.id)">查看详情</div>
        </li>
      </ul>
    </div>
    <div class="pageNav" v-if="pageMax">
      <div class="f-bg-m">
        <div class="u-turn-left" @click="goPage(solutionList.pageNo - 1)" v-if="solutionList.pageNo > 1">上一页</div>
        <div class="u-turn-left noClick" v-else>上一页</div>

        <ul>
          <li v-for="(item,i) in pageMax" @click="goPage(i+1)" :class="{'z-current':solutionList.pageNo === i+1}">{{item}}</li>
        </ul>

        <div class="u-turn-right" @click="goPage(solutionList.pageNo + 1)" v-if="solutionList.pageNo < pageMax">下一页</div>
        <div class="u-turn-right noClick" v-else>下一页</div>
      </div>
    </div>
  </div>
</template>

<script>
import { findHelpAndSolutionList } from '@/api/reception/solution/solution'
export default {
  name: 'solutionList',
  components: {
  },
  data () {
    return {
      solutionList: [],
      pageMax: ''
    }
  },
  created () {
    this.getSolutionList(1)
  },
  methods: {
    changeChildrenRoute(id) {
      let routeData = this.$router.resolve({
        path: '/solution/solutionDetail',
        query: {
          id: id,
          type: 1
        }
      })
      window.open(routeData.href, '_blank')
    },
    getSolutionList(num) {
      let pramas = {
        pageSize: 10,
        pageNo: num,
        type: 1
      }
      findHelpAndSolutionList(pramas)
        .then((response) => {
          if (response.status === 200) {
            this.solutionList = response.data.data
            this.pageMax = Math.ceil(this.solutionList.totalSize / this.solutionList.pageSize)
          }
        })
    },
    goPage(pageNo) {
      this.getSolutionList(pageNo)
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="sass">
  /*@import "index"*/
</style>
