<template>
<div>
  <card title="页面结构">
    <el-tree :data="pages" default-expand-all :class="[$style.tree]">
      <span slot-scope="{ data }" :class="[$style.label]">
        <span>
          <span>
            <el-link type="success" v-if="$auth.accessSync(data.path)">{{ data.title }}</el-link>
            <el-link type="danger" v-else>{{ data.title }}</el-link>
          </span>
          <span class="ml-6" style="color: #999; font-size: 12px;">
            <span>全标识: {{data.path}}</span>
            <span class="ml-6" v-if="data.router">路由地址: {{data.router.path}}</span>
          </span>
        </span>
        <span>
          <el-tag size="mini" effect="dark" type="info" :class="[invisibleCls(!data.menu)]">菜单</el-tag>
          <el-tag size="mini" effect="dark" type="danger" :class="[invisibleCls(!data.router)]" class="ml-3">路由</el-tag>
        </span>
      </span>
    </el-tree>
</card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import pages from '@/config/page'
@Component
export default class Dashboard extends Vue {
  pages = pages

  invisibleCls (has: boolean) {
    return has ? this.$style.invisible : ''
  }

  $style!: any
}
</script>

<style lang="scss" module>
.tree {
  width: 100%;
}

.label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.invisible {
  visibility: hidden;
}
</style>
