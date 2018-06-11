const GoodsList = r => require.ensure([], () => r(require('@/pages/reception/goodsList/goodsList')), 'goodslist')
const ParityRatio = r => require.ensure([], () => r(require('@/pages/reception/goodsList/parityRatio')), 'parityRatio')
const GoodsDetail = r => require.ensure([], () => r(require('@/pages/reception/goodsDetail/index.vue')), 'goodsDetail')
const GoodsView = r => require.ensure([], () => r(require('@/pages/reception/goodsView/index.vue')), 'goodsView')
const CreateOrder = r => require.ensure([], () => r(require('@/pages/reception/createOrder/createOrder')), 'createOrder')
const PurchaseList = r => require.ensure([], () => r(require('@/pages/reception/purchaseList/purchaseList')), 'purchaseList')
const ShoppingCart = r => require.ensure([], () => r(require('@/pages/reception/shoppingCart/shoppingCart')), 'shoppingCart')
const receptionIndex = r => require.ensure([], () => r(require('@/pages/reception/index')), 'receptionIndex')
const HomePage = r => require.ensure([], () => r(require('@/pages/reception/home/homepage')), 'homePage')
const Hp = r => require.ensure([], () => r(require('@/pages/reception/home/hp/hp')), 'hp')
const Brand = r => require.ensure([], () => r(require('@/pages/reception/home/brand/brand')), 'brand')
const BrandDetail = r => require.ensure([], () => r(require('@/pages/reception/home/brand/brandDetail/brandDetail')), 'brandDetail')
const BrandList = r => require.ensure([], () => r(require('@/pages/reception/home/brand/brandList/brandList')), 'brandList')
const Solution = r => require.ensure([], () => r(require('@/pages/reception/home/solution/solution')), 'solution')
const SolutionList = r => require.ensure([], () => r(require('@/pages/reception/home/solution/solutionList/solutionList')), 'solutionList')
const SolutionDetail = r => require.ensure([], () => r(require('@/pages/reception/home/solution/solutionDetail/solutionDetail')), 'solutionDetail')
const ExperienceCenter = r => require.ensure([], () => r(require('@/pages/reception/home/experience/experienceCenter')), 'experienceCenter')
const SupplyChain = r => require.ensure([], () => r(require('@/pages/reception/home/supplyChain/supplyChain')), 'supplyChain')
const Help = r => require.ensure([], () => r(require('@/pages/reception/home/help/help')), 'help')
const HelpList = r => require.ensure([], () => r(require('@/pages/reception/home/help/helpList/helpList')), 'helpList')
const HelpDetail = r => require.ensure([], () => r(require('@/pages/reception/home/help/helpDetail/helpDetail')), 'helpDetail')
const Construction = r => require.ensure([], () => r(require('@/components/common/constructioning')), 'constructioning')

export default {
  path: '/',
  meta: {
    title: '万郡绿建'
  },
  component: receptionIndex,
  children: [
    {
      path: '/',
      meta: {
        title: '首页'
      },
      component: HomePage,
      children: [
        {
          path: '',
          component: Hp
        },
        {
          path: '/goodsList',
          name: 'goodsList',
          meta: {
            title: '商品列表'
          },
          component: GoodsList
        },
        {
          path: '/goodsList/parityRatio',
          name: 'parityRatio',
          component: ParityRatio
        },
        {
          path: '/goodsDetail',
          name: 'goodsDetail',
          meta: {
            title: '商品详情'
          },
          component: GoodsDetail
        },
        {
          path: '/goodsView',
          name: 'goodsView',
          meta: {
            title: '商品详情'
          },
          component: GoodsView
        },
        {
          path: '/construction',
          name: 'construction',
          component: Construction
        },
        {
          path: '/brand',
          component: Brand,
          children: [
            {
              path: '/',
              meta: {
                title: '品牌'
              },
              component: BrandList
            },
            {
              path: 'brandDetail',
              meta: {
                title: '品牌详情'
              },
              component: BrandDetail
            }
          ]
        },
        {
          path: '/solution',
          component: Solution,
          children: [
            {
              path: '/',
              meta: {
                title: '解决方案'
              },
              component: SolutionList
            },
            {
              path: 'solutionDetail',
              meta: {
                title: '解决方案'
              },
              component: SolutionDetail
            }
          ]
        },
        {
          path: '/news',
          meta: {
            title: '新闻资讯'
          },
          component: Solution,
          children: [
            // {
            //   path: '/',
            //   component: SolutionList
            // },
            {
              path: 'newsDetail',
              meta: {
                title: '新闻咨询'
              },
              component: SolutionDetail
            }
          ]
        },
        {
          path: '/bulletin',
          meta: {
            title: '网站公告'
          },
          component: Solution,
          children: [
            {
              path: 'bulletinDetail',
              meta: {
                title: '网站公告'
              },
              component: SolutionDetail
            }
          ]
        },
        {
          path: '/experienceCenter',
          meta: {
            title: '体验中心'
          },
          component: ExperienceCenter
        },
        {
          path: '/supplyChain',
          meta: {
            title: '供应链金融'
          },
          component: SupplyChain
        }
      ]
    },
    {
      path: 'help',
      component: Help,
      children: [
        {
          path: '/',
          meta: {
            title: '帮助中心'
          },
          component: HelpList
        },
        {
          path: 'helpDetail',
          meta: {
            title: '帮助中心'
          },
          component: HelpDetail
        }
      ]
    },
    {
      path: '/createOrder',
      name: 'createOrder',
      meta: {
        title: '创建订单'
      },
      component: CreateOrder
    },
    {
      path: '/purchaseList',
      meta: {
        title: '采购订单列表'
      },
      name: 'purchaseList',
      component: PurchaseList
    },
    {
      path: '/shoppingCart',
      meta: {
        title: '采购订单列表'
      },
      name: 'shoppingCart',
      component: ShoppingCart
    }
  ]
}
