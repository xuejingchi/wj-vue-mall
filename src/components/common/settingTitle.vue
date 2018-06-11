<template>
  <div class="address-title clearfix">
    <span class="decorate"></span>
    <h3 class="title-text">{{ msg }}</h3>
  </div>
</template>
<script type="text/ecmascript-6">
  // import {getCarNum} from '@/api/common/searchNav'
  export default {
    props: ['msg'],
    data () {
      return {
      }
    },
    mounted() {
    },
  }
</script>
<style lang="sass">
  @import "../../css/common/setting/settingTitle"
</style>
