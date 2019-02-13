<template>
  <div class="page">
       <i class="icon icon-icon_redclose" @click="closeWin"></i>
       <i class="icon icon-minimize" @click="hideWin"></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
      closeWin() {
          this.$electron.remote.app.quit();
      },
      hideWin() {
          this.$electron.remote.getCurrentWindow().hide();
      }
  }
}
</script>

<style scoped lang="stylus">
.page
    width 98%
    height 25px
    line-height 25px
    padding 0 1%
    background-color #eee
    position absolute
    top 0
    left 0
    display flex
    align-items center
    -webkit-app-region drag
    .icon
        float left
        width 15px!important
        height 15px!important
        -webkit-app-region no-drag
</style>
