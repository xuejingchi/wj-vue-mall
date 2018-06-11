<template>
  <div class="buyer">
    <div class="buyer-body">
      <div class="supplier-content clearfix">
        <div class="supplier-left f-l">
          <div class="subtitle" style="color:#666666;"><i class="iconfont list-icon">&#xe61a;</i>需求管理</div>
          <el-menu
            :default-active="route"
            :active="route"
            class="el-menu-demo"
            @select="selectNav"
            @close="handleClose"
            :default-openeds="routeArr">
            <!--<el-menu-item v-for="item in childRoutes" :key="item.path" :index="item.path">{{ item.name }}</el-menu-item>-->
            <template>
              <el-menu-item index="" style="padding-left: 40px">发布需求</el-menu-item>
              <el-menu-item index="requirement" style="padding-left: 40px">需求记录</el-menu-item>
            </template>
            <el-menu-item index="contract" style="color: #666666"><i class="iconfont list-icon">&#xe606;</i>订单执行</el-menu-item>
          </el-menu>
        </div>
        <div class="supplier-right f-l">
          <div class="account-right f-l">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buyer',
    components: {
    },
    data() {
      return {
        route: 'publishRequirement',
        routeArr: this.route === '' || this.route === 'requirement' ? ['1'] : ['2']
      }
    },
    mounted() {
      if (this.$route.name === 'publishRequirement') {
        this.route = ''
      } else {
        if (this.$route.path.indexOf('requirement') !== -1) {
          this.route = 'requirement'
        } else if (this.$route.path.indexOf('contract') !== -1) {
          this.route = 'contract'
        }
      }
    },
    methods: {
      selectNav(key) {
        this.$router.push(`/setting/buyer/${key}`)
      },
      handleClose() {
        return false
      }
    },
  }
</script>
<style lang="sass">
  @import "index"
</style>
