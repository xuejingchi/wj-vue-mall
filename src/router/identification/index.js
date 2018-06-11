const identifyIndex = r => require.ensure([], () => r(require('@/pages/reception/identification/index.vue')), 'identifyIndex')
const identifyRoot = r => require.ensure([], () => r(require('@/pages/reception/identification/root/root.vue')), 'identifyRoot')
const identifyIntroBuyer = r => require.ensure([], () => r(require('@/pages/reception/identification/intro/buyer.vue')), 'identifyIntroBuyer')
const identifyIntroProvider = r => require.ensure([], () => r(require('@/pages/reception/identification/intro/provider.vue')), 'identifyIntroProvider')
const identifyCheckBuyer = r => require.ensure([], () => r(require('@/pages/reception/identification/check/buyer.vue')), 'identifyCheckBuyer')
const identifyCheckProvider = r => require.ensure([], () => r(require('@/pages/reception/identification/check/provider.vue')), 'identifyCheckProvider')
const identifyResult = r => require.ensure([], () => r(require('@/pages/reception/identification/result/index.vue')), 'identifyResult')

export default {
  path: '/identification',
  component: identifyIndex,
  children: [{
    path: '/',
    component: identifyRoot
  }, {
    path: 'intro/provider',
    component: identifyIntroProvider
  }, {
    path: 'intro/buyer',
    component: identifyIntroBuyer
  }, {
    path: 'check/buyer',
    component: identifyCheckBuyer
  }, {
    path: 'check/provider',
    component: identifyCheckProvider
  }, {
    path: 'result',
    component: identifyResult
  }]
}
