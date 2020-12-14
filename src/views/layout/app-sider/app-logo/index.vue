<template>
<div :class="[$style.container]">
  <span :class="[$style.logo]"><img src="@/assets/logo.png"></span>
  <span :class="[$style.text]" v-if="expand">{{title}}</span>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { AppModule } from '@/store'
@Component
export default class AppLogo extends Vue {
  @Prop(Boolean) expand!: boolean

  @Prop(String) title!: string
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  display: flex;
  align-items: center;
  padding: 24px 16px;
}

.logo {
  &>img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
}

.text {
  color: #fff;
  font-size: 20px;
}
</style>
