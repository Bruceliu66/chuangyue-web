import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import Vue from 'vue'

export interface HttpOptions {
  baseURL?: string; // /api
  withCredentials?: boolean; // false
  timeout?: number; // 30 * 1000
  successCode?: string | number; // 200
  expiredCode?: string | number; // 401
  expiredHandler?: (url: string) => void; // 失效处理函数
  requestHandler?: (cfg: AxiosRequestConfig) => void;
}

export default class Http {
  inst: AxiosInstance

  constructor (options: HttpOptions = {}) {
    this.inst = axios.create({
      baseURL: options.baseURL || '/api',
      withCredentials: !!options.withCredentials,
      timeout: options.timeout || 1000 * 30
    })
    this.addRequestInterceptor(options)
    this.addResponseInterceptor(options)
  }

  private addRequestInterceptor (options: HttpOptions) {
    this.inst.interceptors.request.use(req)

    function req (cfg: AxiosRequestConfig): any {
      if (options.requestHandler) options.requestHandler(cfg)
      return cfg
    }
  }

  private addResponseInterceptor (options: HttpOptions) {
    const vm = this as any
    this.inst.interceptors.response.use(res,resErr)

    function res (response: AxiosResponse): any {
      if (response.status === 200) {
        if (Object.prototype.toString.call(response.data) !== '[object Object]') return Promise.resolve(response.data) // TODO 可进一步优化
        const { code, message, data } = response.data
        if (+code === +(options.successCode || 200)) return Promise.resolve(data)
        else if (+code === +(options.expiredCode || 401)) {
          if (options.expiredHandler) {
            options.expiredHandler(data)
          } else if (Vue.prototype.$auth) {
            Vue.prototype.$auth.toLogin(data, false)
          } else vm.message(message)
          return Promise.reject(response)
        } else {
          vm.message(message)
          return Promise.reject(response)
        }
      } else {
        vm.message(response.statusText)
        return Promise.reject(response)
      }
    }
    function resErr(error : any){
      vm.message(error)
      return Promise.reject(error)
    }
  }

  private message (msg: string) {
    if (Vue.prototype.$notify) {
      Vue.prototype.$notify({
        title: '警告',
        message: msg,
        type: 'warning'
      })
    } else {
      alert(Text)
    }
  }

  getUri (config?: AxiosRequestConfig): string {
    return this.inst.getUri(config)
  }

  request<T = any> (config: AxiosRequestConfig): Promise<T> {
    return this.inst.request(config)
  }

  get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.get(url, config)
  }

  delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.delete(url, config)
  }

  head<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.head(url, config)
  }

  post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.post(url, data, config)
  }

  put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.put(url, data, config)
  }

  patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.inst.patch(url, data, config)
  }
}
