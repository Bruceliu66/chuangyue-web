<template>
<div :class="[$style.container]" class="shadow-right">
  <app-logo :title="title" :expand="expand"></app-logo>
  <app-menu :expand="expand"></app-menu>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppMenu from './app-menu/index.vue'
import AppLogo from './app-logo/index.vue'
import { AppModule } from '@/store'
@Component({
  components: { AppMenu, AppLogo }
})
export default class AppSider extends Vue {
  @AppModule.State expand!: boolean

  title = process.env.VUE_APP_TITLE
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  position: relative;
  background-color: $menu-bg-color;
  min-height: 100vh;
}
</style>
