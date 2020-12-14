<template>
<div>
  <card>
    <book-query-form @submit="onQuery"></book-query-form>
  </card>

  <card>
    <div class="text-right">
      <el-button size="small" type="primary" @click="onCreate">新增</el-button>
      <el-button size="small" type="danger" :disabled="checkedRows.length < 1">删除</el-button>
    </div>
    <data-table api="/example/books/paged" :columns="columns" :checkedRows.sync="checkedRows" row-key="id" ref="dt">
      <template v-slot:opt="{row}">
        <el-button size="mini" type="text" @click="onView(row)">详情</el-button>
        <el-button size="mini" type="text" @click="onEdit(row)">编辑</el-button>
        <el-button size="mini" type="text" @click="onDelete(row)">删除</el-button>
      </template>
    </data-table>
  </card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import BookQueryForm from './components/book-query-form/index.vue'
import { columns } from './config'

@Component({
  components: { BookQueryForm }
})
export default class Book extends Vue {
  @Ref() dt!: any

  columns = columns

  checkedRows: any[] = []

  onQuery (params: any = {}) {
    this.dt.query(params)
  }

  onRefresh () {
    this.dt.refresh()
  }

  onView (row: any) {
    this.$router.push(`/example/book/detail/${row.id}`)
  }

  onCreate () {
    this.$router.push('/example/book/create')
  }

  onEdit (row: any) {
    this.$router.push(`/example/book/edit/${row.id}`)
  }

  onDelete (row: any) {
    this.$confirm('确定删除该项', '删除').then(() => {
      this.$http.delete(`/example/books/${row.id}`).then(() => {
        this.$message.success('删除成功')
        this.onRefresh()
      })
    })
  }

  mounted () {
    this.onQuery()
  }
}
</script>
