<template>
  <ul class="crumbs">
    <li>当前位置:</li>
    <li><router-link :to="{path: '/'}">首页</router-link>></li>
    <li>
      <router-link v-if="crumbs.levelTwo !== undefined" :to="{ path: 'goodsList', query: { id: crumbs.levelOne.categoryId }}">
        {{crumbs.levelOne.categoryName}}>
      </router-link>
      <p v-else>{{crumbs.levelOne.categoryName}}</p>
    </li>
    <li v-if="crumbs.levelTwo !== undefined">
      <router-link v-if="crumbs.levelThree !== undefined" :to="{ path: 'goodsList', query: { id: crumbs.levelTwo.categoryId }}">
        {{crumbs.levelTwo.categoryName}}>
      </router-link>
      <p v-else>{{crumbs.levelTwo.categoryName}}</p>
    </li>
    <li v-if="crumbs.levelThree !== undefined">{{crumbs.levelThree.categoryName}}</li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['crumbs'],
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {
    },
    methods: {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>
  .crumbs {
    overflow:hidden;
    li{
      float:left;
      font-size: 14px;
      color: #666666;
      margin-right:10px;
      height:50px;
      line-height:50px;
    }
  }
</style>
