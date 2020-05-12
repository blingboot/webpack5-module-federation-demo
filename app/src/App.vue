<template>
  <section class="module-federation">
    <h1>webpack5 module-federation</h1>
    <br />
    <remoteButton class="btn" alertValue="这是来自使用页面的消息" />
    <br />
    <remoteInput
      type="text"
      maxlength="10"
      show-word-limit
      placeholder="随便输入点什么"
      v-model="inputValue"
    />
  </section>
</template>

<script>
const asyncJsonp = (() => {
  const cacheMap = {}
  return (path, delay = 120) => {
    if (!path || cacheMap[path]) return
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.charset = 'utf-8'
      script.timeout = delay
      script.src = path

      const onScriptComplete = event => {
        script.onerror = script.onload = null
        clearTimeout(timeout)
        if (event.type === 'load') {
          cacheMap[path] = true
          return resolve()
        }
        const error = new Error()
        error.name = 'Loading chunk failed.'
        error.type = event.type
        error.url = path
        reject(error)
      }

      const timeout = setTimeout(() => {
        onScriptComplete({ type: 'timeout', target: script })
      }, delay * 1000)

      script.onerror = script.onload = onScriptComplete
      document.head.appendChild(script)
    })
  }
})()

import remoteButton from 'zComp/myButton'

export default {
  name: 'module-federation',
  mixins: [],
  components: {
    remoteInput: async () => {
      await asyncJsonp('../../zComp/dist/zComp-remote-entry.js')
      const inputFactory = await zComp.get('EleInput')
      return inputFactory().default
    },
    remoteButton
  },
  props: {},
  computed: {},
  watch: {},
  data() {
    return {
      inputValue: ''
    }
  },
  created() {},
  mounted() {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang='less' scoped>
.module-federation {
  color: aqua;
  .btn {
    font-size: 40px;
  }
}
</style>
