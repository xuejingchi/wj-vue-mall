<template>
  <div class="person-nav">
    <div class="person-nav-body">
        <div class="logo"></div>
        <div class="nav">
          <el-menu :default-active="route" class="el-menu-demo" mode="horizontal" @select="selectMenu">
            <el-menu-item index="buyer">需方中心</el-menu-item>
            <el-menu-item index="supplier">供方中心</el-menu-item>
            <el-menu-item index="accountSetting">账户中心</el-menu-item>
            <!--<el-menu-item index="message">消息</el-menu-item>-->
          </el-menu>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
    },
    data () {
      return {
        route: 'buyer'
      }
    },
    mounted() {
    },
    methods: {
      selectMenu (key, keyPath) {
        this.$router.push({path: `/setting/${key}`})
        this.route = key
      }
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="sass">
  @import "../../css/common/searchNav/index"
</style>
