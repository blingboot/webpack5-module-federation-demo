<template>
  <section class="module-federation">
    <h1>webpack5 module-federation</h1>
    <br />
    <component :is="remoteButton" alertValue="这是来自使用页面的消息" />
    <br />
    <component :is="remoteInput" />
  </section>
</template>

<script>
export default {
  name: 'module-federation',
  mixins: [],
  components: {},
  props: {},
  computed: {},
  watch: {},
  data() {
    return {
      remoteButton: null,
      remoteInput: null
    }
  },
  created() {},
  mounted() {
    this.getRemoteComp()
    this.getRemoteLib()
  },
  methods: {
    // 异步方式
    async getRemoteComp() {
      await this.asyncJsonp('../../zComp/dist/zComp.js')
      console.log('zComp chunk loaded')
      const buttonFactory = await zComp.get('myButton')
      this.remoteButton = buttonFactory().default

      const inputFactory = await zComp.get('myInput')
      this.remoteInput = inputFactory().default
    },
    async getRemoteLib() {
      await this.asyncJsonp('../../zLib/dist/zLib.js')
      console.log('zLib chunk loaded')
      const factory = await zLib.get('utils')
      const utils = factory()
      utils.timeDelayFn(() => {
        console.log('from remote utils fn log')
      }, 2000)
    },
    asyncJsonp: (() => {
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
  },
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
