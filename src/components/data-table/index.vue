<template>
<div :class="[$style.container]" v-loading="loading">
  <el-table @selection-change="onSelectionChange" @sort-change="onSortChange" :data="rows" :row-key="rowKey" ref="table" v-bind="props" size="medium">
    <slot>
      <template v-for="column in renderedColumns">
        <template v-if="$scopedSlots[column.prop]">
          <el-table-column :key="column.prop" v-bind="column">
            <slot :name="column.prop" :row="row" :column="column" slot-scope="{row}"></slot>
          </el-table-column>
        </template>
        <el-table-column :key="column.prop" v-bind="column" v-else></el-table-column>
      </template>
    </slot>
  </el-table>
  <div :class="[$style.footer]">
    <div>
      <span v-if="checkedRows && checkedRows.length > 0" :class="[$style.checkedText]"><span>共选择 <span :class="[$style.checkedNum]">{{checkedRows && checkedRows.length}}</span> 项</span></span>
    </div>
    <el-pagination
    v-if="pageable"
    :class="[$style.pagination]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
    :total="total"
    :page-size="size"
    :current-page="page"
    @size-change="onSizeChange"
    @current-change="onPageChange"/>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref, Watch, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import DataIterator from './DataIterator'
import { TableColumnDef } from './type'

@Component
export default class DataTable extends mixins(DataIterator) {
  @Prop(Array) columns!: TableColumnDef[]

  // 多选相关
  @Prop(Array) checkedRows!: any[]

  @Prop(String) rowKey!: string

  @Emit('update:checkedRows') updateCheckedRows (rows: any[]) {}

  // 合计相关
  @Prop(Boolean) showSummary!: boolean

  @Prop(String) sumText!: string

  @Prop(Function) summaryMethod!: (args: { columns: any[]; data: any[] }) => string[]

  @Prop(String) height!: string

  @Prop(String) maxHeight!: string

  @Ref() table!: any

  localCheckedRows: any[] = []

  updating = false

  get actualCheckedRows () {
    return this.checkedRows || this.localCheckedRows
  }

  set actualCheckedRows (rows: any[]) {
    this.localCheckedRows = rows
    if (!this.updating) this.updateCheckedRows(rows)
  }

  get renderedColumns () {
    return (this.columns || []).map(v => Object.assign(new TableColumnDef(), v))
  }

  get props () {
    return {
      border: true,
      showSummary: this.showSummary,
      sumText: this.sumText,
      summaryMethod: this.summaryMethod,
      height: this.height,
      maxHeight: this.maxHeight
    }
  }

  onPageChange (page: number) {
    this.load(this.params, page, this.size)
  }

  onSizeChange (size: number) {
    this.page = 1
    this.load(this.params, this.page, size)
  }

  onSelectionChange (val: any[]) {
    this.actualCheckedRows = val || []
  }

  onSortChange ({ column, prop, order }: any) {
    if (order === 'ascending') {
      this.sorter = { prop, asc: true }
    } else if (order === 'descending') {
      this.sorter = { prop, asc: false }
    } else {
      this.sorter = null
    }
    this.load(this.params, 1, this.size)
  }

  @Watch('checkedRows', { immediate: true }) checkedRowsChange () {
    if (!this.checkedRows || !this.table || this.updating) return
    if (this.checkedRows !== this.localCheckedRows) {
      this.updating = true
      const items = this.checkedRows.slice()
      this.table.clearSelection()
      items.forEach((v: any) => {
        this.table.toggleRowSelection(v, true)
      })
      this.updating = false
    }
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  margin: 20px 0;

  :global {
    .el-table th {
      background-color: $bg-head-color;
    }
    .el-table thead {
      color: $text-regular-color;
    }

    .el-table{
      font-size: 14px;
      border-radius: 2px;
    }

    .el-table td{
      padding: 8px 0;
    }
    .el-table th{
      padding: 8px 0;
    }
  }
}

.footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkedText {
  color: $text-secondary-color;
  font-size: 12px;
}

.checkedNum {
  color: $text-regular-color;
}

.pagination {
}
</style>
