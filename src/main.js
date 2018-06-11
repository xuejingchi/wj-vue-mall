// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import '@/css/base.css'
import '@/css/changeElement.scss'
import '@/css/iconfont.css'
import '@/css/iconfont.js'
// 过滤器
import * as custom from './filters/index.js'
import store from './store'
import 'babel-polyfill'
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.use(ElementUI)
// 使用vue-meta
Vue.use(VueMeta)
Vue.config.productionTip = false

// 上传图片地址
// Vue.prototype.FileUploadUrl = 'http://192.168.5.220:8081/node/file_upload'
// Vue.prototype.FileUploadUrl = 'http://47.98.232.30:8081/node/file_upload'
Vue.prototype.FileUploadUrl = 'http://mall.vandream.com:8081/node/file_upload'
// 服务器图片域名、项目路径
// Vue.prototype.ServerImgUrl = 'http://192.168.5.220:8081/'
// Vue.prototype.ServerImgUrl = 'http://47.98.232.30:8081/'
Vue.prototype.ServerImgUrl = 'http://mall.vandream.com:8081/'
// 商品图片地址路径
// Vue.prototype.goodsImgUrl = 'http://192.168.5.220:8081/'
// Vue.prototype.goodsImgUrl = 'http://47.98.232.30:8081/'
Vue.prototype.goodsImgUrl = 'http://mall.vandream.com:8081/'
// Vue.prototype.urlLink = 'http://192.168.5.220/'
// Vue.prototype.urlLink = 'http://47.98.232.30/'
Vue.prototype.urlLink = 'http://mall.vandream.com/'
// 全局变量
Vue.prototype.BaseDownloadUrl = process.env.BASE_API.slice(0, -3)

Vue.prototype.DownloadFile = (path, name) => {
  let linkTarget = document.createElement('a')
  linkTarget.target = '_blank'
  linkTarget.href = `${Vue.prototype.ServerImgUrl}${path}?fname=${name}`
  document.body.appendChild(linkTarget)
  linkTarget.click()
}
// 打开新窗口
Vue.prototype.OpenWindow = (url) => {
  let form = document.createElement('form')
  form.action = url
  form.target = '_blank'
  form.method = 'POST'
  document.body.appendChild(form)
  form.submit()
}

const _hmt = window._hmt || []
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path) {
    _hmt.push(['_setCustomVar', 1, `/#${to.fullPath}`, `/#${to.fullPath}`])
  }
  setTimeout(() => {
    (function () {
      // 每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      const hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?0ee719013635f1f882ccf74c9dd06893'
      hm.id = 'baidu_tj'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
