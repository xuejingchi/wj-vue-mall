<template>
  <div id="app">
    <el-container>
      <v-header></v-header>
      <el-main>
        <router-view />
        <v-suspenion></v-suspenion>
      </el-main>
      <el-footer style="padding: 0">
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script type='text/ecmascript-6'>
import header from '@/components/common/header.vue'
import footer from '@/components/common/footer.vue'
import suspenion from '@/components/common/suspensionBar.vue'
export default {
  name: 'App',
  components: {
    'v-footer': footer,
    'v-header': header,
    'v-suspenion': suspenion
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    next({})
  }
}
</script>

<style lang="scss" scope>
  @media screen and (max-width: 1200px) {
    #app {
      width: 1200px;
    }
  }
</style>
