<template>
  <div class="authentication">
    <div class="title">认证信息</div>
    <div class="form">
      <table>
        <tr>
          <th>
            <div class="name">企业名称：</div>
          </th>
          <th>
            <div class="info">{{ data.companyName }}</div>
          </th>
        </tr>
        <tr v-if="data.certificateType === '0'">
          <th>
            <div class="name">营业执照编码：</div>
          </th>
          <th>
            <div class="info">{{ data.businessLicense }}</div>
          </th>
        </tr>
        <tr v-if="data.certificateType === '1'">
          <th>
            <div class="name">统一社会信用码：</div>
          </th>
          <th>
            <div class="info">{{ data.registerCreditCode }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业法人：</div>
          </th>
          <th>
            <div class="info">{{ data.businessEntity }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业注册地址：</div>
          </th>
          <th>
            <div class="info">{{ data.registeredAddress }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业类型：</div>
          </th>
          <th>
            <div class="info">{{ data.companyType }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业经营范围：</div>
          </th>
          <th>
            <div class="info">{{ data.businessScope }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业联系人：</div>
          </th>
          <th>
            <div class="info">{{ data.contact }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">企业联系人电话：</div>
          </th>
          <th>
            <div class="info">{{ data.contactNumber }}</div>
          </th>
        </tr>
        <tr>
          <th>
            <div class="name">经营区域：</div>
          </th>
          <th>
            <div class="info">{{ data.businessArea }}</div>
          </th>
        </tr>
        <tr v-if="!buyer">
          <th>
            <div class="name">企业类别：</div>
          </th>
          <th>
            <div class="info">{{ data.supplierType }}</div>
          </th>
        </tr>
        <tr v-if="buyer">
          <th>
            <div class="name">企业类别：</div>
          </th>
          <th>
            <div class="info">{{ data.customerType }}</div>
          </th>
        </tr>
        <tr v-if="!buyer">
          <th>
            <div class="name">主营产品：</div>
          </th>
          <th>
            <div class="info">{{ data.mainProduct }}</div>
          </th>
        </tr>
        <tr v-if="0">
          <th>
            <div class="name">认证等级：</div>
          </th>
          <th>
            <div class="info">{{ data.certificationGrade }}
            </div>
          </th>
        </tr>
        <tr v-if="!buyer">
          <th>
            <div class="name">管理品牌：</div>
          </th>
          <th>
            <div class="info">{{ data.brand }}</div>
          </th>
        </tr>
        <tr v-if="buyer">
          <th>
            <div class="name">会员等级：</div>
          </th>
          <th>
            <div class="info">{{ data.memberRating }}
            </div>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchAuthInfo } from '@/api/person/auth/auth'
import { getUserInfo } from '@/utils/auth'
import { configAccountFlag } from '@/utils/identify'
export default {
  name: 'authentication',
  components: {
  },
  data () {
    return {
      buyer: true,
      data: ''
    }
  },
  mounted () {
    configAccountFlag(this).then(() => {
      const parmas = {
        userId: getUserInfo().userId,
        companyId: getUserInfo().companyId
      }
      fetchAuthInfo(parmas).then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.data = data
          data.brand ? this.buyer = false : this.buyer = true
        } else {
        }
      })
    })
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="sass">
  @import "index"
</style>
