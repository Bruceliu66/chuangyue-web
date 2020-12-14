<template>
<div>
  <edit-book :id="id"></edit-book>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import EditBook from '../components/edit-book/index.vue'

@Component({
  components: { EditBook }
})
export default class Edit extends Vue {
  @Prop(String) id!: string
}
</script>
