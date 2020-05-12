<template>
  <section class="module-federation">
    <h1>the zComp page</h1>
    <myButton alertValue="local-button" />
  </section>
</template>

<script>
import myButton from './myButton'
import { timeDelayFn } from 'zLib/utils'

export default {
  name: 'module-federation',
  mixins: [],
  components: { myButton },
  props: {},
  computed: {},
  watch: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    timeDelayFn(() => {
      console.log(666)
    }, 2000)
  },
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang='less' scoped>
.module-federation {
  color: aqua;
  h1 {
    font-size: 30px;
  }
}
</style>
