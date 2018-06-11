<template>
  <div id="header">
    <div class="header-content">
      <div class="header-left">
        杭萧钢构（股票代码600477）旗下B2B平台
      </div>
      <div class="header-right">
        <ul class="list-item">
          <li class="vertical" v-if="userInfo.userId === '' || userInfo.userId === undefined || userInfo.userId === 'null'">
            <router-link to='/login' v-if="userInfo.userName !== '' && userInfo.userName !== undefined && userInfo.userName !== 'null'">{{ userInfo.userName }}, 您好</router-link>
            <router-link to='/login' class="login">登录</router-link>
            <router-link to='/register' v-if="userInfo.userName === '' || userInfo.userName === undefined || userInfo.userName === 'null'">免费注册</router-link>
          </li>
          <li class="vertical" v-if="userInfo.userId !== '' && userInfo.userId !== undefined && userInfo.userId !== 'null' &&  userInfo.companyStatus !=='3'">
            <div class="item name">
              <router-link to='/setting/accountSetting/'>{{ userInfo.userName ? userInfo.userName : ''}}</router-link>
            </div>
            <div class="item type">
              <span class="user-center">认证 <i class="el-icon-arrow-down"></i></span>
              <div class="down-user-set">
                <ul>
                  <li>
                    <router-link to='/setting/accountSetting/securitySetting'>用户设置</router-link>
                  </li>
                  <li>
                    <span @click="logOut()">退出登录</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--<router-link to='/help' class="help-center">帮助中心</router-link>-->
          </li>
          <li class="vertical" v-if="userInfo.companyFlag === '2' && userInfo.companyStatus ==='3' && userInfo.userId !== '' && userInfo.userId !== undefined && userInfo.userId !== 'null'" >
            <div class="item name">
              <router-link to='/setting/accountSetting/'>{{ userInfo.userName }}</router-link>
              <i class="vip-icon" v-if="userInfo.userVip === '10'"></i>
              <i class="vip-icon" v-if="userInfo.userVip === '20'"></i>
            </div>
            <div class="item type">
              <span class="user-center">需方中心 <i class="el-icon-arrow-down"></i></span>
              <div class="down-user-set">
                <ul>
                  <li>
                    <router-link to='/setting/buyer'>需求管理</router-link>
                  </li>
                  <li>
                    <router-link to='/setting/buyer/contract'>订单执行</router-link>
                  </li>
                  <li>
                    <router-link to='/setting/accountSetting/securitySetting'>用户设置</router-link>
                  </li>
                  <li>
                    <span @click="logOut()" style="color: #999999">退出登录</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--<router-link to='/help' class="help-center">帮助中心</router-link>-->
          </li>
          <li class="vertical" v-if="userInfo.companyFlag === '1' && userInfo.companyStatus ==='3' && userInfo.userId !== '' && userInfo.userId !== undefined && userInfo.userId !== 'null'">
            <div class="item name">
              <router-link v-if="userInfo.accountFlag === '1'" to='/identification'>{{ userInfo.userName }}</router-link>
              <router-link v-if="userInfo.accountFlag === '2'" to='/identification/result'>{{ userInfo.userName }}</router-link>
              <router-link v-if="userInfo.accountFlag === '3'" to='/setting/accountSetting/'>{{ userInfo.userName }}</router-link>
            </div>
            <div class="item type">
              <span class="user-center">供方中心<i class="el-icon-arrow-down"></i></span>
              <div class="down-user-set">
                <ul>
                  <li>
                    <router-link to='/setting/supplier/'>方案管理</router-link>
                  </li>
                  <li>
                    <router-link to='/setting/supplier/orderExecute'>订单执行</router-link>
                  </li>
                  <li>
                    <router-link to='/setting/accountSetting/securitySetting'>用户设置</router-link>
                  </li>
                  <li>
                    <span @click="logOut()">退出登录</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--<router-link to='/help' class="help-center">帮助中心</router-link>-->
          </li>
          <li class="vertical">
            <router-link to='/help' class="help-center">帮助中心</router-link>
          </li>
          <li class="vertical">
            <a @click="loadBuyer">采购需求</a>
            <router-link v-if="userInfo.accountFlag === '1' && userInfo.accountFlag !== '2'" to='/identification'>供方入驻</router-link>
            <!--<router-link v-if="userInfo.accountFlag === '2'" to='/identification/result'>供方入驻</router-link>-->
            <router-link v-if="userInfo.accountFlag === '1' && userInfo.accountFlag !== '2'" to='/identification'>需方入驻</router-link>
            <!--<router-link v-if="userInfo.accountFlag === '2'" to='/identification/result'>需方入驻</router-link>-->
          </li>
          <li style="padding-right: 0">
            <span>采购热线：400 826 7880</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getCustomerLevel, getUserId, getCompanyStatus, getCompanyName, getCompanyFlag, getAccountFlag, getPhoneNumber, removeCookies } from '@/utils/auth'
  import Cookies from 'js-cookie'
  import { logOut } from '@/api/login/login'
  import { getAcountFlag } from '@/api/person/identification'
  import { getUserInfo } from '@/utils/auth.js'
  import { configAccountFlag } from '@/utils/identify.js'

  export default {
    props: {
    },
    data () {
      return {
        userCookie: Cookies.get(),
        userInfo: {
          userName: getPhoneNumber() ? `${getPhoneNumber().substr(0, 3)}****${getPhoneNumber().substr(7)}` : '',
          companyName: getCompanyName(),
          userId: getUserId(),
          companyFlag: getCompanyFlag(),
          userVip: getCustomerLevel(),
          companyStatus: getCompanyStatus(),
          accountFlag: getAccountFlag()
        }
      }
    },
    methods: {
      logOut () {
        logOut().then(() => {
          removeCookies()
          window.location.href = '/'
        })
      },
      toNpwStatus() {
        configAccountFlag(this)
      },
      loadBuyer() {
        if (this.userInfo.userId) {
          getAcountFlag({
            userId: getUserInfo().userId
          }).then((res) => {
            if (res.data.code === 200) {
              this.toNpwStatus()
              if (res.data.data === '1') {
                this.$router.push('/identification')
              } else if (res.data.data === '2') {
                this.$router.push('/identification/result')
              } else if (res.data.data === '3') {
                if (this.userInfo.companyFlag === '1') {
                  this.$alert('供方不支持使用购物车，请更换为采购方身份登录', '不支持使用购物车', {
                    confirmButtonText: '确定'
                  })
                } else if (this.userInfo.companyFlag === '2') {
                  this.$router.push('/setting/buyer')
                }
              }
            }
          })
        } else {
          this.$router.push('/login')
        }
      }
    },
    created () {
      configAccountFlag(this)
    },
    components: {
    }
  }
</script>
<style lang="sass">
  @import "../../css/common/header/header"
</style>
