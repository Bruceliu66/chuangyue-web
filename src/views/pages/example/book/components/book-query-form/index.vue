<template>
<div>
<el-form :inline="true" :model="form" size="small">
  <el-form-item label="批次号">
    <el-input v-model="form.name" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  <el-form-item label="委托方">
    <el-select v-model="form.status" clearable>
      <dict-option name="status"></dict-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查 询</el-button>
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
