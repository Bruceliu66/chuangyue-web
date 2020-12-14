<template>
<div>
  <edit-book></edit-book>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import EditBook from '../components/edit-book/index.vue'

@Component({
  components: { EditBook }
})
export default class Create extends Vue {
}
</script>
