<template>
  <div class="page">
      {{ count }}
      <button @click="increment">自增</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      count: 0
    }
  },
  components: {

  },
  methods: {
    increment () {
      this.count++
    }
  }
}
</script>

<style scoped lang="scss">
</style>
