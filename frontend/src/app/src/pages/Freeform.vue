<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-center">
        <h4> Draw the letter {{currentLetter}}! </h4>
        <p> {{feedbackMessage}} </p>
        <p>
          <q-btn color="accent" glossy label="Done!" @click="done()" />
        </p>
      </div>
    </div>
    <div class="row justify-center">
        <EelCanvas ref="whiteboard"></EelCanvas>
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
      currentLetter: this.getNextLetter(),
      feedbackMessge: ''
    }
  },
  created: function () {
    this.currentLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  },
  methods: {
    done () {
      this.currentLetter = this.getNextLetter()
      this.feedbackMessage = this.getFeedback()
      this.$refs.whiteboard.clear()
    },
    getNextLetter () {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    },
    getFeedback () {
      return 'Great Job!'
    }
  }
}
</script>
