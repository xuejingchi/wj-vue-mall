const Login = r => require.ensure([], () => r(require('@/pages/reception/login/login')), 'login')
const Register = r => require.ensure([], () => r(require('@/pages/reception/register/register')), 'register')
const Protocol = r => require.ensure([], () => r(require('@/pages/reception/register/protocol')), 'protocol')
const Forget = r => require.ensure([], () => r(require('@/pages/reception/login/forget')), 'forget')
const ChangePsd = r => require.ensure([], () => r(require('@/pages/person/changePassWord/changePsd')), 'changePsd')
const ChangePhone = r => require.ensure([], () => r(require('@/pages/person/changePhone/changePhone')), 'changePhone')

export default [{
  path: '/login',
  name: 'login',
  meta: {
    notKeepAlive: true,
    title: '登录'
  },
  component: Login
},
{
  path: '/register',
  name: 'register',
  meta: {
    notKeepAlive: true,
    title: '注册'
  },
  component: Register
},
{
  path: '/forget',
  name: 'forget',
  meta: {
    title: '忘记密码'
  },
  component: Forget
},
{
  path: '/protocol',
  name: 'protocol',
  meta: {
    title: '忘记密码'
  },
  component: Protocol
},
{
  path: '/changePsd',
  name: 'changePsd',
  component: ChangePsd,
  meta: {
    keepAlive: false,
    title: '修改密码'
  }
},
{
  path: '/changePhone',
  name: 'changePhone',
  component: ChangePhone,
  meta: {
    keepAlive: false,
    title: '修改手机号'
  }
}]
