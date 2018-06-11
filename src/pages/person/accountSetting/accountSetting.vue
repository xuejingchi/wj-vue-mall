<template>
  <div class="account">
    <div class="account-body">
      <div class="account-content clearfix">
        <div class="account-left f-l">
          <el-menu
            :default-active="route"
            class="el-menu-vertical-demo" @select="selectNav">
            <el-menu-item v-for="item in childRoutes" :key="item.path" :index="item.path">{{ item.name }}</el-menu-item>
          </el-menu>
        </div>
        <div class="account-right f-l">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserInfo } from '@/utils/auth'
  export default {
    name: 'accountSetting',
    components: {
    },
    data() {
      return {
        childRoutes: [
          {
            path: '',
            name: '认证信息'
          },
          {
            path: 'shippingAddress',
            name: '收货地址'
          },
          // {
          //   path: 'subaccount',
          //   name: '子账号管理'
          // },
          {
            path: 'securitySetting',
            name: '安全设置'
          }
        ],
        route: 'authentication'
      }
    },
    mounted () {
      if (!getUserInfo().userId) {
        this.$router.push('/login')
      }
      if (this.$route.name === 'authentication') {
        this.route = ''
      } else {
        this.route = this.$route.name
      }
    },
    methods: {
      selectNav(key) {
        const accountFlag = getUserInfo().accountFlag
        if (accountFlag === '1' && key !== 'securitySetting') {
          this.$router.push('/identification/')
        } else {
          this.$router.push(`/setting/accountSetting/${key}`)
        }
      }
    },
    watch: {
      $route () {
        if (this.$route.name === 'authentication') {
          this.route = ''
        } else {
          this.route = this.$route.name
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "./account"
</style>
