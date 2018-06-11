import Vue from 'vue'
import Router from 'vue-router'
import identification from './identification'
import reception from './reception'
import setting from './setting'
import loginRoutes from './login'
Vue.use(Router)

// 各模块路由
let routes = [
  // 商城模块
  reception,
  // 个人设置模块
  setting,
  // 会员认证模块
  identification
]
// 与登录模块合并
routes = routes.concat(loginRoutes)

export default new Router({
  'linkActiveClass': 'active',
  // 路由数组
  routes: routes
  // mode: 'history'
})
