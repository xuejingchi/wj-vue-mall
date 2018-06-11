const Setting = r => require.ensure([], () => r(require('@/pages/person/index')), 'setting')
const AccountSetting = r => require.ensure([], () => r(require('@/pages/person/accountSetting/accountSetting')), 'accountSetting')
const Authentication = r => require.ensure([], () => r(require('@/pages/person/accountSetting/authentication/authentication')), 'authentication')
const ShippingAddress = r => require.ensure([], () => r(require('@/pages/person/accountSetting/shippingAddress/shippingAddress')), 'shippingAddress')
const Subaccount = r => require.ensure([], () => r(require('@/pages/person/accountSetting/subaccount/subaccount')), 'subaccount')
const AddSubaccount = r => require.ensure([], () => r(require('@/pages/person/accountSetting/subaccount/addSubaccount')), 'addSubaccount')
const ModifySubaccount = r => require.ensure([], () => r(require('@/pages/person/accountSetting/subaccount/modifySubaccount')), 'modifySubaccount')
const ModifyAddress = r => require.ensure([], () => r(require('@/pages/person/accountSetting/shippingAddress/modifyAddress')), 'modifyAddress')
const SecuritySettings = r => require.ensure([], () => r(require('@/pages/person/accountSetting/securitySettings/securitySettings')), 'securitySettings')
const Buyer = r => require.ensure([], () => r(require('@/pages/person/buyer/buyer')), 'buyer')
const Project = r => require.ensure([], () => r(require('@/pages/person/supplier/projectManagement/project')), 'project')
const UploadProject = r => require.ensure([], () => r(require('@/pages/person/supplier/projectManagement/uploadProject')), 'uploadProject')
const LockGoodList = r => require.ensure([], () => r(require('@/pages/person/supplier/lockGoods/list')), 'lockGoodList')
const LockGoodsDetail = r => require.ensure([], () => r(require('@/pages/person/supplier/lockGoods/detail')), 'lockGoodsDetail')
const OrderExecute = r => require.ensure([], () => r(require('@/pages/person/supplier/orderExecute/order')), 'orderExecute')
const OrderExecuteDetail = r => require.ensure([], () => r(require('@/pages/person/supplier/orderExecute/detail/index')), 'orderExecuteDetail')
const DeliveryManagement = r => require.ensure([], () => r(require('@/pages/person/supplier/deliveryManagement/deliveryManagement')), 'deliveryManagement')
const DeliveryOperate = r => require.ensure([], () => r(require('@/pages/person/supplier/deliveryManagement/deliveryOperate')), 'deliveryOperate')
const DeliveryManagementDetail = r => require.ensure([], () => r(require('@/pages/person/supplier/deliveryManagement/deliveryState')), 'deliveryManagementDetail')
const Supplier = r => require.ensure([], () => r(require('@/pages/person/supplier/supplier')), 'supplier')
const PublishRequirement = r => require.ensure([], () => r(require('@/pages/person/buyer/requirement/publish/index')), 'publishRequirement')
const RequirementDetail = r => require.ensure([], () => r(require('@/pages/person/buyer/requirement/detail/index')), 'RequirementDetail')
const RequirementList = r => require.ensure([], () => r(require('@/pages/person/buyer/requirement/requirementList')), 'requirementList')
const ContractList = r => require.ensure([], () => r(require('@/pages/person/buyer/contract/contractList')), 'contractList')
const ReceiptInvoice = r => require.ensure([], () => r(require('@/pages/person/buyer/contract/detail/receiptInvoice')), 'receiptInvoice')
const BuyerNoticeOfInvoice = r => require.ensure([], () => r(require('@/pages/person/buyer/contract/detail/noticeOfInvoice')), 'noticeOfInvoice')
const Message = r => require.ensure([], () => r(require('@/pages/person/message/message')), 'message')
const SupplierNoticeOfInvoice = r => require.ensure([], () => r(require('@/pages/person/supplier/deliveryManagement/noticeOfInvoice')), 'noticeOfInvoice')
// 需方 --- 订单付款
const ContractPayment = r => require.ensure([], () => r(require('@/pages/person/buyer/contract/payment/index')), 'contractPayment')
// 需方 --- 发货单详情
const ContractDeliveryDetail = r => require.ensure([], () => r(require('@/pages/person/buyer/contract/delivery/detail/index')), 'contractDeliveryDetail')

export default {
  path: '/setting',
  component: Setting,
  children: [
    {
      path: 'accountSetting',
      component: AccountSetting,
      children: [
        {
          path: '/',
          name: 'authentication',
          component: Authentication
        },
        {
          path: 'shippingAddress',
          name: 'shippingAddress',
          component: ShippingAddress
        },
        {
          path: 'subaccount',
          name: 'subaccount',
          component: Subaccount
        },
        {
          path: 'addSubaccount',
          name: 'addSubaccount',
          component: AddSubaccount
        },
        {
          path: 'modifySubaccount',
          name: 'modifySubaccount',
          component: ModifySubaccount
        },
        {
          path: 'securitySetting',
          name: 'securitySetting',
          component: SecuritySettings
        },
        {
          path: 'modifyAddress',
          name: 'modifyAddress',
          component: ModifyAddress
        }
      ]
    },
    {
      path: 'supplier',
      component: Supplier,
      children: [
        // 方案管理
        {
          path: '/',
          name: 'project',
          meta: {
            title: '方案管理'
          },
          component: Project
        },
        {
          path: 'projectManagement/uploadProject',
          name: 'project',
          component: UploadProject
        },
        // 锁货通知
        {
          path: 'lockGood',
          name: 'lockGood',
          meta: {
            title: '锁货通知'
          },
          component: LockGoodList
        },
        {
          path: 'lockGood/lockGoodsDetail',
          name: 'lockGoodsDetail',
          meta: {
            title: '锁货详情'
          },
          component: LockGoodsDetail
        },
        // 订单执行
        {
          path: 'orderExecute',
          name: 'orderExecute',
          meta: {
            title: '订单执行'
          },
          component: OrderExecute
        },
        {
          path: 'orderExecute/detail',
          name: 'orderExecuteDetail',
          meta: {
            title: '订单详情'
          },
          component: OrderExecuteDetail
        },
        // 发货管理
        {
          path: 'deliveryManagement',
          name: 'deliveryManagement',
          meta: {
            title: '发货管理'
          },
          component: DeliveryManagement
        },
        {
          path: 'deliveryManagement/noticeOfInvoice',
          name: 'deliveryNotice',
          component: SupplierNoticeOfInvoice
        },
        {
          path: 'deliveryManagement/deliveryState',
          name: 'deliveryState',
          component: DeliveryManagementDetail
        },
        {
          path: 'deliveryManagement/DeliveryOperate',
          name: 'deliveryOperate',
          component: DeliveryOperate
        },
      ]
    },
    {
      path: 'buyer',
      component: Buyer,
      children: [
        {
          path: '/',
          name: 'publishRequirement',
          component: PublishRequirement
        },
        {
          path: 'requirement',
          name: 'requirement',
          component: RequirementList
        },
        {
          path: 'contract',
          name: 'contract',
          component: ContractList
        },
        {
          path: 'contract/receiptInvoice',
          name: 'receiptInvoice',
          component: ReceiptInvoice
        },
        {
          path: 'contract/noticeOfInvoice',
          // name: 'noticeOfInvoice',
          component: BuyerNoticeOfInvoice
        },
        {
          path: 'requirement/detail',
          name: 'requirementDetail',
          component: RequirementDetail
        },
        {
          path: 'contract/payment',
          name: 'contractPayment',
          component: ContractPayment
        },
        {
          path: 'contract/delivery/detail',
          name: 'contractDeliveryDetail',
          component: ContractDeliveryDetail
        }
      ]
    },
    {
      path: 'message',
      name: 'message',
      component: Message
    },
  ]
}
