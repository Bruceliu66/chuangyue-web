import { Controller, RequestMapping, ResData } from '@pat-fet/mock-server'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class auth extends Controller {
  @RequestMapping({ url: '/login', method: 'post' })
  login (req, res, context) {
    return null
  }

  @RequestMapping({ url: '/logout', method: 'post' })
  logout (req, res, context) {
    return null
  }

  @RequestMapping({ url: '/401', method: 'post' })
  s401 (req, res, context) {
    return new ResData(401, 'session失效', null)
  }

  @RequestMapping({ url: '/auth/info', method: 'get' })
  getInfo (req, res, context) {
    return {
      name: '张三',
      username: '13041344544'
    }
  }
}
