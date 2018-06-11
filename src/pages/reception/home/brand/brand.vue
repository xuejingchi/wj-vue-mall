<template>
  <div class="brand">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'brand',
  components: {
  },
  beforeRouteUpdate (to, from, next) {
    console.log('to: ', to)
    next()
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="sass">
  /*@import "index"*/
</style>
