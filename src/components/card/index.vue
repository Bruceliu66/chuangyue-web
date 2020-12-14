<template>
<el-card shadow="never" class="m-3">
<slot></slot>
</el-card>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Card extends Vue {

}
</script>

<style lang="scss" module>

</style>
