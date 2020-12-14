<template>
<div>
<el-form :inline="true" :model="form" size="small">
  <el-form-item>
    <el-button type="primary" @click="onSubmit">批次查询</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit } from 'vue-property-decorator'

@Component
export default class BookQueryForm extends Vue {
  @Emit() submit (params: any) {}

  form = {
    name: '',
    status: ''
  }

  onSubmit () {
    this.submit(this.form)
  }
}
</script>
