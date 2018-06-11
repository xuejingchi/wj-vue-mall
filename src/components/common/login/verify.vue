<template>
  <div v-if="needVerify">
    <div class="verify-img-wrapper">
      <img class="verify-move-img" :style="{ top: `${slideTop}px` }" :src="moveImgSrc" alt="">
      <img class="verify-backg-img" :src="backgImgSrc" />
    </div>
    <div class="verify-move-box" style="margin-top:20px;">
      <div class="move-back-line"></div>
      <div class="verify-slide-text" ref="sliderWrap">拖动滑块验证</div>
      <div :style="{ left: `${slideLeft}px` }" @click="sliderClicked" @mousedown="sliderMouseDown" @mousemove="sliderMove" ref="moveSlider" class="move moveBefore" v-move></div>
    </div>
  </div>
</template>

<script>
import { getJigsaw, verifyJigsaw } from '@/api/reception/register/register'
export default {
  name: 'verifyComponent',
  props: {
    phoneNumber: {
      type: String
    }
  },
  data () {
    return {
      canDrag: false,
      readySubmit: false,
      slideLeft: 0,
      needVerify: true,
      slideTop: 0,
      moveImgSrc: '',
      backgImgSrc: ''
    }
  },
  directives: {
    move(el) {
      var X
      el.onmousedown = function (e) {
        X = e.clientX - el.offsetLeft
        document.onmousemove = function (e) {
          let endx = e.clientX - X
          el.className = 'move moveBefore'
          el.style.left = `${endx}px`
          el.parentNode.parentNode.querySelector('.verify-move-img').style.transform = `translate(${endx}px, 0)`
          let width = el.parentNode.offsetWidth - el.offsetWidth
          el.parentNode.children[0].style.width = `${endx}px`
          el.parentNode.children[1].innerHTML = '拖动滑块验证'
          // 临界值小于
          if (endx <= 0) {
            el.style.left = '0px'
            el.parentNode.children[0].style.width = '0px'
            el.parentNode.parentNode.querySelector('.verify-move-img').style.transform = 'translate(0, 0)'
          }
          // 临界值大于
          if (parseInt(el.style.left, 10) >= width) {
            el.parentNode.parentNode.querySelector('.verify-move-img').style.transform = `translate(${width}px, 0)`
            el.style.left = `${width}px`
            el.parentNode.children[0].style.width = `${width}px`
          }
          document.onmouseup = function () {
            document.onmousemove = null
            el.click()
          }
        }
      }
    }
  },
  created () {
    this.loadJigsaw()
  },
  methods: {
    /*
    * 滑块被鼠标按下
    * */
    sliderMouseDown () {
      // 可拖动
      this.canDrag = true
    },
    /*
    * 滑块被点击
    * */
    sliderClicked () {
      if (!this.readySubmit) {
        return false
      }
      this.readySubmit = false
      this.canDrag = false
      this.sendData()
    },
    /*
    * 获取拼图
    * */
    loadJigsaw () {
      let params = {
        phoneNumber: this.phoneNumber
      }
      getJigsaw(params).then(res => {
        if (res.data.code === 200) {
          this.moveImgSrc = `data:image/png;base64,${res.data.data.drawImg.replace(/(\\n|")/g, '')}`
          this.backgImgSrc = `data:image/png;base64,${res.data.data.tarImg.replace(/(\\n|")/g, '')}`
          this.slideTop = res.data.data.pointY
        }
      })
    },
    /*
    * 发送请求
    * */
    sendData () {
      verifyJigsaw({
        pointX: this.slideLeft,
        phoneNumber: this.phoneNumber
      }).then(res => {
        console.log(res)
        if (res && res.data && res.data.code === 200) {
          this.$message({
            message: '验证成功！',
            type: 'success'
          })
          setTimeout(() => {
            // 通知父组件验证成功
            this.$emit('verifySuccess')
          }, 300)
          // this.needVerify = false
        } else {
          this.resetVerifyBlock()
        }
      }, err => {
        console.log(err)
      })
    },
    /*
    * 重置验证码模块
    * */
    resetVerifyBlock () {
      let moveSlider = this.$refs.moveSlider
      moveSlider.style.left = '0'
      moveSlider.parentNode.children[0].style.width = '0px'
      moveSlider.parentNode.parentNode.querySelector('.verify-move-img').style.transform = 'translate(0, 0)'
      this.loadJigsaw()
    },
    sliderMove () {
      if (!this.canDrag) {
        return false
      }
      this.readySubmit = true
      let left = this.$refs.moveSlider.offsetLeft
      this.slideLeft = left
    }
  }
}
</script>

<style lang="scss">
.verify-img-wrapper {
  position: relative;
  width: 300px;
  height:200px;
  .verify-move-img {
    position: absolute;
    left: 0;
  }
  .verify-backg-img {
    width: 100%;
  }
}

.verify-move-box {
  position: relative;
  background-color: #e8e8e8;
  width: 292px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  .verify-slide-text {
    position: absolute;
    top: 0px;
    width: 292px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
  .move-back-line {
    background-color: #7ac23c;
    height: 34px;
    width: 0px;
  }
  .move{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 34px;
    border: 1px solid #ccc;
    cursor: move;
  }
  .moveBefore{
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
  }
  .moveSuccess{
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
  }
}
</style>
