<template>
  <q-page padding class="row items-stretch">
    <EelPractice></EelPractice>
  </q-page>
</template>

<script>
import EelPractice from '../components/EelPractice.vue'

export default {
  name: 'PageWord',
  components: {
    EelPractice
  },
  created: function () {
    this.$store.dispatch('common/changeLevel', 'word')
  }
}
</script>
