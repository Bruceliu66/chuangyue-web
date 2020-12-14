import { NavigationGuard } from 'vue-router'
import Vue from 'vue'
import NP from 'nprogress'

const whiteList = ['/login', '/error/**'] // ant style wildcat

const frontGuard: NavigationGuard = function (to, from, next) {
  NP.start()
  const auth = Vue.prototype.$auth

  // 白名单或未设置权限， 不验证
  if (onWhiteList(to.path) || (!to.meta?.pid)) {
    next()
    return
  }

  // 权限控制
  auth.access(to.meta?.pid).then((pass: boolean) => {
    // if (pass) {
    //   next()
    // } else {
    //   next({ path: '/error/403' })
    //   NP.done()
    // }
    // 暂时没有做权限控制
    next()
  }).catch(() => {
    NP.done()
  })
}

function onWhiteList (path: string) {
  const convertRegEx = (expr: string) => {
    return new RegExp('^' +
      (expr || '')
        .replace(/\*\*/g, '#__#')
        .replace(/\*/g, '[^/]*')
        .replace(/#__#/g, '.*') +
      '$')
  }
  return whiteList.some(v => convertRegEx(v).test(path))
}

export default frontGuard
