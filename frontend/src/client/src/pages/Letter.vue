<template>
  <q-page padding>
    <EelPractice :level="technique"></EelPractice>
  </q-page>
</template>

<script>
import EelPractice from '../components/EelPractice.vue'

export default {
  name: 'LetterPattern',
  components: {
    EelPractice
  },
  computed: {
    technique: function () {
      return this.$store.state.common.user.technique.toLowerCase()
    }
  }
}
</script>
