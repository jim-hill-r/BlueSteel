<template>
  <q-page padding>
    <div class="text-center">
      <h2> Draw the letter {{currentLetter}}! </h2>
      <h3> {{feedbackMessage}}</h3>
      <q-btn color="accent" label="Done!" @click="done()" />
    </div>
    <EelCanvas ref="whiteboard"></EelCanvas>
  </q-page>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'

export default {
  name: 'PageIndex',
  components: {
    EelCanvas
  },
  data () {
    return {
      paintableName: 'test',
      paintableColor: '#90a4ae',
      currentLetter: 'a',
      feedbackMessage: ''
    }
  },
  methods: {
    done () {
      this.currentLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
      this.feedbackMessage = 'Great job!'
      this.$refs.whiteboard.clear()
    }
  }
}
</script>
