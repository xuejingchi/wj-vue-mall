<template>
  <div class="verify">
    <img class="small-img" :style="`left:${left};top:${height}px;`" :src="smallImgUrl" alt="">
    <img class="big-img" :src="staticImgUrl" alt="" />
    <!--<div class="slide-area" style="position:absolute;width: 100%;height: 30px;z-index: 3"></div>-->
    <el-slider
      v-model="value"
      @change="endingNum"
      :show-tooltip="false"
    >
    </el-slider>
  </div>
</template>

<script>
export default {
  name: 'verify',
  props: ['staticImgUrl', 'stateNum', 'smallImgUrl', 'heightNum'],
  data() {
    return {
      value: 10,
      left: 0,
      height: this.heightNum
    }
  },
  methods: {
    endingNum() {
      // 移动结束触发
      this.$emit('endingState', this.left)
    }
  },
  watch: {
    stateNum(curVal) {
      if (curVal < 10) {
        curVal = 10
      } else if (curVal > 90) {
        curVal = 90
      }
      this.value = curVal
      this.left = `${curVal * 3 - 30}px`
    },
    value(val) {
      this.$emit('on-result-change', val)
    }
  }
}
</script>
<style lang="scss">
  .verify{
    overflow:hidden;
    width:300px;
    position:relative;
    border:1px solid red;
    float:left;
    .slide-area{
      border:1px solid #ccc;
    }
    .small-img{
      width:60px;
      height:60px;
      position:absolute;
    }
    .big-img{
      width: 300px;
      height:200px;
    }
    .el-slider{
      border:1px solid green;
      /*background:green;*/
      .el-slider__runway{
        background:#fff;
        margin:0 0;
        height:40px;
        .el-slider__bar{
          /*background:#fff;*/
          height:38px;
          top:1px;
        }
        .el-slider__button-wrapper{
          border:1px solid green;
          width:60px;
          top:1px;
          height:38px;
          border-radius:2px;
          background:#ccc;
          .el-slider__button{
            display:none;
          }
        }
      }
    }
  }
</style>

