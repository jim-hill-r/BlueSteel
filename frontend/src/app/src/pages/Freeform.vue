<template>
  <q-page padding>
    <div>
      <div class="row justify-center">
        <div class="text-center">
          <h2> Draw the letter {{currentLetter}}! </h2>
          <h3> {{feedbackMessage}}</h3>
          <q-btn color="accent" label="Done!" @click="done()" />
        </div>
      </div>
      <div class="row justify-center">
          <EelCanvas ref="whiteboard"></EelCanvas>
      </div>
    </div>
  </q-page>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'

export default {
  name: 'PageFreeform',
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
