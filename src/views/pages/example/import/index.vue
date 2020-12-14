<template>
<div>
  <card>
    <import-query-form @submit="onQuery"></import-query-form>
  </card>

  <card>
  <el-form :inline="true" :model="form" size="small">
    <el-form-item>
      <el-button type="primary" @click="onDownload">下载模板</el-button>
      <el-button type="primary" @click="onImportExecl">导入数据</el-button>
      <el-button type="primary" @click="exportResult">导出结果</el-button>
    </el-form-item>
  </el-form>
  </card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit } from 'vue-property-decorator'

@Component
export default class Import extends Vue {
  @Emit() submit (params: any) {}

  form = {
    name: '',
    status: ''
  }

  onDownload () {
    this.$http.post('/case/exportPingAnCaseTemplate')
  }

  onImportExecl () {
    const params = Object.assign({ filePath: 'C:/Users/王成/Desktop/pingan.xls' }, this.form)
    this.$http.post('/case/importPingAnCase', params)
  }

  onExportResult () {
    this.submit(this.form)
  }
}

</script>
