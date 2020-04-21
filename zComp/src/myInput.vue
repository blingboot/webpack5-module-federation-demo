<template>
  <section class="my-input">
    <input type="text" v-model="msg" placeholder="随便输入些什么" />
  </section>
</template>

<script>
export default {
  name: 'my-input',
  mixins: [],
  components: {},
  props: {},
  computed: {},
  watch: {
    msg(to) {
      console.log(to)
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  created() {},
  mounted() {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang='less' scoped>
.my-input {
}
</style>
