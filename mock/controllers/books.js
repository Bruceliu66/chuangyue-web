import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class books extends Controller {
  @RequestMapping({ url: '/example/books', method: 'get' })
  query (req, res, context) {
    return delayResp(this.collection.find())
  }

  @RequestMapping({ url: '/example/books/paged', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  @RequestMapping({ url: '/example/books/:id', method: 'get' })
  get (req, res, context) {
    const id = req.params.id
    return delayResp(this.collection.find({ id })[0])
  }

  @RequestMapping({ url: '/example/books', method: 'post' })
  create (req, res, context) {
    const body = req.body
    const id = String(Math.random()).substr(-8)
    const model = Object.assign({ id }, body || {})
    this.collection.insert(model)
    return delayResp(id)
  }

  @RequestMapping({ url: '/example/books/:id', method: 'post' })
  update (req, res, context) {
    const { id } = req.params || {}
    const body = req.body
    const origin = this.collection.find({ id })[0]
    if (!origin) throw new Error(`not found book [${id}]`)
    const model = Object.assign(origin, body || {})
    this.collection.update(model)
    return delayResp(id)
  }

  @RequestMapping({ url: '/example/books/:id', method: 'delete' })
  delete (req, res, context) {
    const { id } = req.params || {}
    const origin = this.collection.find({ id })[0]
    if (!origin) throw new Error(`not found book [${id}]`)
    this.collection.remove(origin)
    return delayResp(id)
  }
}
