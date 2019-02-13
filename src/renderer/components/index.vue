<template>
 <Row class="wrapper">
   <Col span="6">
    <left-bar></left-bar>
    <right-bar></right-bar>
   </Col>
 </Row>
</template>

<script>
  import leftBar from './leftBar'
  import rightBar from './rightBar'
  export default {
    name: 'index',
    components: {
      leftBar,
      rightBar
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    & > div {
      height: 100%;
    }
  }
</style>
