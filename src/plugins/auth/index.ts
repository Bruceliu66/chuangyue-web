import { Principle, LoginParams } from './src/Auth'
import Vue from 'vue'
import AuthPlugin from './src'
import { toArray } from '@/utils/data'

Vue.use(AuthPlugin, {
  single: false, // 是否单点登录模式
  principleLoader: function (): Promise<Principle> {
    const http = Vue.prototype.$http
    const all = [http.get('/auth/info')]
    return Promise.all(all).then(([user]: any) => {
      return {
        user: {
          username: user.username,
          cname: user.name,
          ...user
        },
        roles: [],
        authorities: []
      }
    })
  },
  logoutHandler: function (): Promise<string> {
    const http = Vue.prototype.$http
    return http.post('/logout')
  },
  loginHandler: function (params: LoginParams): Promise<any> {
    const http = Vue.prototype.$http
    return http.post('/login', {}, { params })
  }
})
