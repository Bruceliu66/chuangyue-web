<template>
<card :class="[$style.container]" v-loading="loading">
<el-form :model="form" size="small" label-position="top" ref="fm" v-if="loaded">
  <el-form-item label="批次号" prop="name" required>
    <el-input v-model="form.name" placeholder="请输入批次号" clearable></el-input>
  </el-form-item>
  <el-form-item label="委托方"  prop="author" required>
    <el-input v-model="form.author" placeholder="请输入委托方" clearable></el-input>
  </el-form-item>
  <el-form-item label="催收区域"  prop="publishDate" required>
    <el-date-picker v-model="form.publishDate" :format="dateFormat" :value-format="dateFormat" placeholder="请选择催收区域" clearable></el-date-picker>
  </el-form-item>
  <el-form-item label="委案日期"  prop="status" required>
    <el-select v-model="form.status" placeholder="状态" clearable>
      <dict-option name="status"></dict-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <div class="text-center">
      <el-button plain @click="onBack">返 回</el-button>
      <el-button type="primary" :loading="submitting" @click="onSubmit">保 存</el-button>
    </div>
  </el-form-item>
</el-form>
</card>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit, Prop, Watch } from 'vue-property-decorator'
import { dateFormat } from '@/config/other'
import { ElForm } from 'element-ui/types/form'

@Component
export default class EditBook extends Vue {
  @Prop() id!: string

  @Ref() fm!: ElForm

  form = {
    name: '',
    author: '',
    publishDate: '',
    status: ''
  }

  dateFormat = dateFormat

  loading = false

  loaded = false

  submitting = false

  onBack () {
    this.$router.go(-1)
  }

  onSubmit () {
    this.fm.validate().then(valid => {
      if (!valid) return
      const params = Object.assign({ id: this.id }, this.form)
      const url = this.id ? `/example/books/${this.id}` : '/example/books'
      this.submitting = true
      this.$http.post(url, params).then(() => {
        this.$message.success('保存成功')
        this.$router.push('/example/book')
      }).finally(() => {
        this.submitting = false
      })
    })
  }

  loadData () {
    if (!this.id) {
      this.loaded = true
    } else {
      this.loading = false
      this.$http.get(`/example/books/${this.id}`).then(data => {
        const { id = '', name = '', author = '', publishDate = '', status = '' } = data || {}
        Object.assign(this.form, { id, name, author, publishDate, status })
      }).finally(() => {
        this.loading = false
        this.loaded = true
      })
    }
  }

  @Watch('id', { immediate: true }) idChange () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: calc(100vh - 160px);
}
</style>
