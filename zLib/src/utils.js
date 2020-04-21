// import CountUp from 'countup'

// /**
//  * 返回的实例countUpIns进行数据更新用法为countUpIns.update(newVal)
//  */

// export const countUpIns = (ele, start, end, decimals, duration, separator = true) => {
//   let options = {
//     useEasing: false,
//     useGrouping: true,
//     separator: separator ? ',' : ''
//   }
//   return new CountUp(ele, start, end, decimals || 0, duration || 1, options)
// }

/**
 * 初始化文件引用此方法用于全局注册组件
 * @param {*} filePath
 * @param {*} Vue
 */
// export const registerGlogalComps = (filePath, Vue) => {
//   if (!filePath) return
//   const requireComponent = require.context(filePath, false, /\.vue$/)
//   requireComponent.keys().forEach((item) => {
//     const component = requireComponent(item).default || requireComponent(item)
//     const name = component.name
//     if (!name) return
//     Vue.component(name, component.default || component)
//   })
// }

/**
 * 直接返回对于fmt的时间字符串，例如yyyy-MM-dd hh:mm:ss  y表示年 M表示月 d表示日期 h表示小时 m表示分钟 s表示秒 S表示毫秒
 * @param {*} fmt
 * @param {*} date
 */
export const getCurrentTime = (fmt, date) => {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 自定义的延时器，复写setTimeout方法，优先使用requestAnimationFrame
 */
// export const timeDelayFn = (fn, timeout) => {
//   let requestAnimationFrame = window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame
//   if (requestAnimationFrame) {
//     // let s = new Date().getTime()
//     const tmpFn = (start, timeout) => {
//       if (new Date().getTime() - start < timeout) {
//         requestAnimationFrame(() => {
//           tmpFn(start, timeout)
//         })
//       }
//     }
//   } else {
//     window.setTimeout(fn, timeout)
//   }
// }
export const timeDelayFn = ((win) => {
  const requestAnimationFrame = win.requestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.oRequestAnimationFrame ||
    win.msRequestAnimationFrame
  if (requestAnimationFrame) {
    return (fn, timeout) => {
      const now = Date.now
      const start = now()
      const loop = () => {
        now() - start >= timeout ? fn() : requestAnimationFrame(loop)
      }
      loop()
    }
  } else {
    return (fn, timeout) => { win.setTimeout(fn, timeout) }
  }
})(window)

/**
 * 金额格式互转，xxx,xxx,xxx.xx <--> xxxxxx.xx
 * @param {*} amount
 */
export const formatAmount = (amount) => {
  if (amount === 0 || amount === '0') {
    return 0
  }
  let t = amount - 0
  if (t) {
    return t.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  } else {
    // eslint-disable-next-line
    return amount.replace(/[^\d\.-]/g, '') - 0
  }
}

/**
 * 将字符串中制定子字符串全局替换为target
 */
export const replaceChildStr = (str, child, target) => {
  let reg = new RegExp(child, 'g')
  return str.replace(reg, target)
}

/**
 *获取数组中的最大值或最小值
 * @param {*} arr
 * @param {*} type
 */
export const getMostNum = (arr, type = 'max') => {
  return Math[type](...arr)
}

/**
 * setTimeout替代setInterval，避免阻塞
 * @export
 * @class InsteadSetInterval
 */
export class InsteadSetInterval {
  constructor(fn, timeout, immediately) {
    this.timer = null
    this.fn = fn
    this.immediately = immediately
    this.timeout = timeout
    this.isOff = false
    this.start()
  }
  doIt () {
    this.isOff = false
    return setTimeout(() => {
      this.fn()
      if (this.isOff) return
      this.timer = this.doIt(this.fn, this.timeout)
    }, this.timeout)
  }
  stop () {
    window.clearTimeout(this.timer)
    this.isOff = false
  }
  start () {
    this.timer && clearTimeout(this.timer)
    this.immediately && this.fn()
    this.timer = this.doIt()
  }
}

/**
 * 根据key名称来进行数组排序
 * @param {*} params.arr  目标数组
 * @param {*} params.key  排序依据
 * @param {*} params.flag  不传值或者true的情况下有大到小，false时由小到大
 */
export const sortArrayByKey = (params) => {
  let { arr, key, flag } = params
  return arr.sort((item1, item2) => {
    if (typeof item1 === 'object' || typeof item2 === 'object') {
      if (flag) {
        return item2[key] - item1[key]
      } else {
        return item1[key] - item2[key]
      }
    } else {
      if (flag) {
        return item2 - item1
      } else {
        return item1 - item2
      }
    }
  })
}

/**
 * 去掉arr中重复的元素
 * @param {*} arr
 * @param {*} fn 通过此方法决定hash值的key值
 */
export const removeRepeatItem = (arr, fn) => {
  let obj = {}
  arr.forEach((item) => {
    let key
    if (fn) {
      key = fn(item)
    } else {
      if (!(item instanceof Object)) {
        key = `tmp${item}`
      } else {
        key = JSON.stringify(item)
        console.error('为对hash值的key值进行定义')
      }
    }
    if (!obj[key]) {
      obj[key] = item
    }
  })
  return Object.values(obj)
}

/**
 * 取多个数组交集，先将多个数组放到同一个数组
 * @param {*} arr
 */
export const getInterSet = (arr) => {
  let obj = {}
  let interObj = {}
  arr.forEach((item) => {
    let key = JSON.stringify(item)
    if (obj[key]) {
      interObj[key] = item
    } else {
      obj[key] = item
    }
  })
  return Object.values(interObj)
}

/**
 * 取多个数组并集，先将多个数组放到同一个数组
 * @param {*} arr
 */
export const getUnionSet = arr => {
  return removeRepeatItem(arr)
}

/**
 * 取多个数组的差集，先将多个数组放到同一个数组
 * @param {*} arr
 */
export const getDiffSet = arr => {
  let transformItem = (item) => {
    let key = JSON.stringify(item)
    let tmp = {}
    tmp[key] = item
    return tmp
  }
  let interSet = getInterSet(arr).map((item) => {
    return transformItem(item)
  })
  let unionSet = getUnionSet(arr).map((item) => {
    return transformItem(item)
  })
  let diffSet = []
  for (let key in unionSet) {
    if (!interSet[key]) {
      diffSet.push(unionSet[key])
    }
  }
  return diffSet
}

/**
 * dom元素操作
 * @param {*} type add remove replace三种状态
 * @param {*} el  目标元素
 * @param {*} clsArr class数组
 */
export const updateClass = (el, type, clsArr) => {
  if (['add', 'remove', 'replace'].indexOf(type) === -1) return
  if (!el) return
  if (el.length) {
    el.forEach((item) => {
      item.classList[type](...clsArr)
    })
  } else {
    el.classList[type](...clsArr)
  }
}

/**
 * AE => bodymovin动画
 * @param {*} el 目标元素id
 * @param {*} path  动画json文件路径
 * @param {*} renderer 渲染模式: canvas/svg/html
 */
export const bodymovin = (el, path, renderer = 'svg') => {
  return window.bodymovin.loadAnimation({
    container: document.getElementById(el),
    renderer,
    loop: true,
    autoplay: true,
    path: path
  })
}

/**
 * 节流函数
 * @param {*} fn 回调函数
 * @param {*} delay  节流周期
 */
export const throttle = (fn, delay) => {
  let flag = true
  let timer = null
  return () => {
    if (!flag) return
    fn()
    flag = false
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      flag = true
    }, delay)
  }
}

/**
 * 页面整体缩放方法
 * @param {*} isScale false: 取消缩放； true: 设置缩放， 默认值false
 * @param {*} direction  缩放方向，默认值scaleY
 */
export const switchScale = (isScale = false, direction = 'Y') => {
  const win = window
  if (win.outerWidth > 1920) return
  const body = document.body
  if (!isScale) return (body.style.cssText = 'transform-origin: center center; transform: none')
  const { __BASE_WIDTH__, __BASE_HEIGHT__, screen: { width, height } } = win
  const scale = +(direction === 'Y' ? __BASE_WIDTH__ * height / (__BASE_HEIGHT__ * width) : __BASE_HEIGHT__ * width / (__BASE_WIDTH__ * height))
  body.style.cssText = `transform-origin: center center; transform: scale${direction}(${scale})`
}

/**
 * 判断某个css3样式浏览器是否支持
 * @param {*} style 样式属性
 */
export const supportCss3 = (style) => {
  const prefix = ['webkit', 'Moz', 'ms', 'o']
  const htmlStyle = document.documentElement.style
  function _toHumb (string) {
    return string.replace(/-(\w)/g, function ($0, $1) {
      return $1.toUpperCase()
    })
  }
  const humpString = [
    _toHumb(style),
    ...prefix.map(item => _toHumb(item + '-' + style))
  ]
  return humpString.some(item => item in htmlStyle)
}

/**
 * 控制接口请求最大并发数量
 * @param {*} array 待请求的接口队列
 * @param {*} limit 限制最大的请求并发量
 * @return 一个存储接口返回值的有序数组
 */
export const asyncPool = (array = [], limit = 1) => {
  const len = array.length
  if (!len) return Promise.resolve(array)
  let i = 0
  const results = []
  const pendingStack = []
  function enque () {
    if (i === len) return Promise.resolve(results)
    const fn = array[i++]
    const p = Promise.resolve(
      typeof fn === 'function' ? fn() : fn
    ).catch((err) => Promise.resolve(err))
    results.push(p)
    const p2 = p.then(() => pendingStack.splice(pendingStack.indexOf(p2), 1))
    pendingStack.push(p2)
    const next = pendingStack.length >= limit
      ? Promise.race(pendingStack)
      : Promise.resolve()
    return next.then(enque)
  }
  return enque().then((res) => Promise.all(res))
}


/**
 * LRU缓存算法
 * @param {*} max 最大缓存数量
 */
// export class LRUCache {
//   constructor(max) {
//     this.cache = new Map()
//     this.max = max
//   }
//   get (key) {
//     if (this.cache.has(key)) {
//       // 存在则先删后加进行更新
//       const temp = this.cache.get(key)
//       this.cache.delete(key)
//       this.cache.set(key, temp)
//       return temp
//     }
//     return -1
//   }
//   put (key, value) {
//     if (this.cache.has(key)) {
//       this.cache.delete(key)
//     } else (this.cache.size >= this.max) {
//       // 缓存超过最大值，则移除最近没有使用的，map.keys拿到的是keys生成器
//       this.cache.delete(this.cache.keys().next().value)
//     }
//     this.cache.set(key, value)
//   }
// }
