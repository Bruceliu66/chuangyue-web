<template>
<el-container>
  <el-aside :class="[$style.aside]">
    <app-sider></app-sider>
  </el-aside>
  <el-container>
    <el-header :class="[$style.header]" class="bg-head">
      <app-header></app-header>
    </el-header>
    <el-main :class="[$style.main]" class="bg-body">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script lang="ts">

import { Vue, Component, Provide } from 'vue-property-decorator'
import AppSider from './app-sider/index.vue'
import AppHeader from './app-header/index.vue'
import { AppModule } from '@/store'
@Component({
  components: { AppSider, AppHeader }
})
export default class Layout extends Vue {
  $style!: any
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.aside {
  width: auto !important;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 0 auto;
}

.header {
  height: 48px !important;
}

.main {
  height: calc(100vh - 48px);
  padding: 0;
}

.content {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
