import Vue from 'vue'

import Breadcrumb from './breadcrumb/index.vue'
import Card from './card/index.vue'
import DataTable from './data-table/index.vue'
import DictOption from './dict-option/index.vue'

const components: Record<string, any> = {
  Breadcrumb,
  Card,
  DataTable,
  DictOption
}

Object.keys(components).forEach((key: string) => {
  Vue.component(key, components[key])
})
