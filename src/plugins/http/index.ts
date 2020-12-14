import Vue from 'vue'
import HttpPlugin from './src'

Vue.use(HttpPlugin, {
  expiredHandler: function (url: string) {
    const auth = Vue.prototype.$auth
    if (auth) auth.toLogin(url, false)
  },
  requestHandler (cfg: any) {
    // TODO
  }
})
