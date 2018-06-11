<template>
  <div class="supplier">
    <div class="supplier-body">
      <div class="supplier-content clearfix">
        <div class="supplier-left f-l">
          <el-menu
            :default-active="route"
            class="el-menu-demo" @select="selectNav">
            <el-menu-item index="" style="margin-top:10px"><i class="iconfont classify-icon">&#xe62f;</i>方案管理</el-menu-item>
            <el-menu-item index="lockGood"><i class="iconfont classify-icon">&#xe61c;</i>锁货通知</el-menu-item>
            <el-menu-item index="orderExecute"><i class="iconfont classify-icon">&#xe606;</i>订单执行</el-menu-item>
            <el-menu-item index="deliveryManagement"><i class="iconfont classify-icon">&#xe61b;</i>发货管理</el-menu-item>
            <!-- <el-submenu index="">
              <template slot="title">报表查询</template>
              <el-menu-item index="">订单执行情况</el-menu-item>
              <el-menu-item index="">发运签收情况</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </div>
        <div class="supplier-right f-l">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'supplier',
    components: {
    },
    data() {
      return {
        route: ''
      }
    },
    mounted() {
      if (this.$route.path.indexOf('lockGood') !== -1) {
        this.route = 'lockGood'
      } else if (this.$route.path.indexOf('orderExecute') !== -1) {
        this.route = 'orderExecute'
      } else if (this.$route.path.indexOf('deliveryManagement') !== -1) {
        this.route = 'deliveryManagement'
      } else if (this.$route.path.indexOf('project') !== -1) {
        this.route = ''
      }
    },
    methods: {
      selectNav(key) {
        this.$router.push(`/setting/supplier/${key}`)
      }
    },
    watch: {
      $route() {
        let str = this.$route.name.slice(0, 5)
        if (this.$route.name !== 'project') {
          this.route = this.$route.name
        }
        switch (str) {
          case 'proje':
            this.route = ''
            break
          case 'lockG':
            this.route = 'lockGood'
            break
          case 'order':
            this.route = 'orderExecute'
            break
          case 'deliv':
            this.route = 'deliveryManagement'
            break
          default:
            this.route = ''
            break
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "index"
</style>
