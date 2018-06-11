<template>
  <div class="file-toast-model">
    <el-dialog
      class="file-toast-dialog"
      :title="'上传失败'"
      :visible.sync="dialogVisible"
      width="450px">
      <div class="toast-main-box">
        <div class="left-part-icon"></div>
        <div class="right-part-text">
          <p class="toast-text-title">上传失败！</p>
          <p class="toast-text-desc">请检查您的附件类型和大小是否符合系统要求</p>
          <div class="toast-bottom-btn">
            <button @click="dialogVisible = false">取消</button>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'publish-toast',
    data() {
      return {
        dialogVisible: false
      }
    },
    created() {
    },
    methods: {
      showDialog () {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="sass">
  @import "toast"
</style>
