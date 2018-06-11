<template>
  <div class="solutionDetail">
    <div class="other-case">
      <p>其他相关</p>
      <ul>
        <li v-for="item in solutionList.list" @click="changeId(item.id)">{{item.title}}</li>
      </ul>
    </div>
    <div class="case-content">
      <h1>{{solutionDetail.title}}</h1>
      <img :src="`${ goodsImgUrl }${ solutionDetail.pictureUrl }`" alt="" class="topImg">
      <!--<div>{{solutionDetail.briefIntroduction}}</div>-->
      <p v-for="item in solutionDetail.informationDetailList">
        <span>{{item.subTitle}}</span>
        <span v-if="item.detailedIntroduction">
          <span v-for="list in item.detailedIntroduction.split('^')" class="spanList">{{list}}</span>
        </span>
        <img v-if="item.imgUrl" :src="`${ goodsImgUrl }${ item.imgUrl }`" alt="" class="subImg">
      </p>
    </div>
  </div>
</template>

<script>
  import { findHelpAndSolutionList, getInformationDetail } from '@/api/reception/solution/solution'
  export default {
    name: 'solutionDetail',
    components: {},
    data () {
      return {
        solutionList: [],
        solutionDetail: []
      }
    },
    created () {
      this.getSolutionList(1)
      this.getSolutionDetail()
    },
    methods: {
      getSolutionList(num) {
        let pramas = {
          pageSize: 10,
          pageNo: num,
          type: 2
        }
        findHelpAndSolutionList(pramas)
          .then((response) => {
            if (response.status === 200) {
              this.solutionList = response.data.data
            }
          })
      },
      getSolutionDetail() {
        let pramas = {
          id: this.$route.query.id
        }
        getInformationDetail(pramas)
          .then((response) => {
            if (response.status === 200) {
              this.solutionDetail = response.data.data
            }
          })
      },
      changeId(num) {
        this.$router.push({
          query: {
            id: num
          }
        })
        this.getSolutionDetail()
      }
    }
  }
</script>
<style lang="sass">
  /*@import "index"*/
</style>
