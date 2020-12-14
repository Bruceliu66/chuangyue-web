<template>
<div>
  <el-option v-for="(v, k) in items" :key="k" :label="v" :value="k"></el-option>
</div>
</template>

<script lang="ts">

import { getDictionary } from '@/config/dictionary'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class DictOption extends Vue {
  @Prop(String) name!: string

  get items () {
    return getDictionary(this.name) || {}
  }
}
</script>
