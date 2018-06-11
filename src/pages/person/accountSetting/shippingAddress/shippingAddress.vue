<template>
  <div class="shop-address">
    <SettingTitle :msg='titleName'></SettingTitle>
    <div class="address-text clearfix">
      <div class="save-address">
        <p>已保存的收货地址:</p>
      </div>
      <div class="usual-address">
        <el-tooltip content="地址不能大于20条" placement="top" effect="light">
          <button class="add-address disabled" @click="maxLength" v-if="tableList.length >= 20">新增常用地址</button>
        </el-tooltip>
        <div class="add-address" v-if="tableList.length < 20">
          <router-link class="editor-btn" :to="{path:'/setting/accountSetting/modifyAddress', query: {type: 'add'}}">新增常用地址</router-link>
        </div>
      </div>
    </div>
    <div class="address-table">
      <el-table
        :data="tableList"
        style="width: 100%"
        v-loading="loading.tableLoading">
        <el-table-column
          prop="contacts"
          label="收货人">
        </el-table-column>
        <el-table-column
          prop="areas"
          label="所在地区">
        </el-table-column>
        <el-table-column
          prop="address"
          label="详细地址">
        </el-table-column>
        <el-table-column
          prop="postCode"
          label="邮编">
        </el-table-column>
        <el-table-column
          prop="contactNumber"
          label="手机／座机">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <span class="blue-btn">
              <router-link class="editor-btn" :to="{path:'/setting/accountSetting/modifyAddress',query: {id: scope.row.addressId, type: 'editor'}}">修改</router-link>
            </span>
            <span style="color:#1C6EEB">|</span>
            <el-button type="text" class="delete-btn blue-btn" @click="deleteAddress(scope)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button class="default-address" type="text" v-if="scope.row.isDefault === '1'">默认地址</el-button>
            <el-button class="set-default" v-if="scope.row.isDefault === '0'" @click="setDefault(scope)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import SettingTitle from '@/components/common/settingTitle'
import { getAddressList, deleteAddress, setDefaultAddress } from '@/api/person/address/address'
import { getUserInfo } from '@/utils/auth'
export default {
  name: 'shippingAddress',
  components: {
    SettingTitle: SettingTitle
  },
  data () {
    return {
      userInfo: {
        companyId: getUserInfo().companyId,
        userId: getUserInfo().userId,
      },
      tableList: [],
      titleName: '常用地址',
      loading: {
        tableLoading: false,
        defaultLoading: false,
        deleteLoading: false
      }
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress () {
      this.loading.tableLoading = true
      let params = {
        companyId: this.userInfo.companyId
      }
      getAddressList(params).then((response) => {
        if (response.data.code === 200) {
          let data = response.data.data
          this.tableList = data
          this.loading.tableLoading = false
        }
      })
    },
    setDefault (scope) {
      let params = {
        addressId: scope.row.addressId,
        companyId: this.userInfo.companyId,
        userId: this.userInfo.userId
      }
      setDefaultAddress(params)
        .then((response) => {
          if (response.data.code === 200) {
            this.getAddress()
          }
        })
    },
    deleteAddress (scope) {
      this.$confirm('是否删除本条地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          addressId: scope.row.addressId,
          companyId: this.userInfo.companyId,
          userId: this.userInfo.userId
        }
        deleteAddress(params).then((response) => {
          if (response.data.code === 200) {
            if (response.data.data === false) {
              this.$message({
                type: 'warning',
                message: '删除失败!'
              })
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.getAddress()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    maxLength () {

    }
  }
}
</script>
<style lang="sass">
  @import "./index"
</style>
