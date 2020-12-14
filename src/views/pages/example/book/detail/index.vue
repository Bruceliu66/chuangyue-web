<template>
<div>
  <card>
    <pre>
      {{dataSource}}
    </pre>

    <div class="text-center mt-4">
      <el-button size="small" plain @click="onBack">返 回</el-button>
    </div>
  </card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Detail extends Vue {
  @Prop(String) id!: string

  dataSource: any = {}

  loading = false

  onBack () {
    this.$router.go(-1)
  }

  loadData () {
    this.loading = true
    this.$http.get(`/example/books/${this.id}`).then(data => {
      this.dataSource = data || {}
    })
  }

  @Watch('id', { immediate: true }) idChange () {
    this.loadData()
  }
}
</script>
