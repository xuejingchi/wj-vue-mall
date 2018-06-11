<template>
  <div class="identify-router-page">
    <nav class="identify-router-nav">
      <div class="identify-nav-main">
        <div class="setting-nav">
          <div class="setting-nav-body clearfix">
            <div @click="backHp" class="logo f-l"></div>
            <div class="setting-nav-right f-l">
              <img src="./imgs/identify_title.png" />
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="identift-router-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'identifyIndex',
  data () {
    return {}
  },
  methods: {
    backHp() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
  @import "./index"
</style>
