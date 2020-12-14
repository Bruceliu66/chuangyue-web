import Vue from 'vue'

import transcode from './transcode'
import Card from './card/index.vue'
import DataTable from './data-table/index.vue'

export const filters: Record<string, any> = {
  transcode
}

export type Filter = 'transcode'

Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, filters[key])
})
