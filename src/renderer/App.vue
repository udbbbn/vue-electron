<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron'
  }
</script>

<style>
  /* CSS */
@import url('/dist/sprites/sprite.css');
@import '../../node_modules/reset-css/reset.css';
  body {
    font-family: "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    cursor: default;
    min-width: 450px;
    background-color: #fdfdfd;
    overflow: hidden;
  }

  html, body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
    /* 设置滚动条的样式 */

  ::-webkit-scrollbar {
    width: 1px;
  }
  /* 滚动槽 */

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #dddee1;
    border-radius: 10px;
  }
  /* 滚动条滑块 */

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #dddee1;
    -webkit-box-shadow: inset 0 0 6px #dddee1;
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: #dddee1;
  }
</style>
