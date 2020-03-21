<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-center">
        <h4> Draw the letter {{currentLetter}}! </h4>
        <p> {{feedbackMessage}} </p>
        <p>
          <q-btn v-if="showDone" color="accent" glossy label="Done!" @click="done()" />
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
import letterPaths from '../assets/letterPaths.json'

export default {
  name: 'PageTracing',
  components: {
    EelCanvas
  },
  data () {
    return {
      currentLetter: this.getNextLetter(),
      feedbackMessge: '',
      showDone: false
    }
  },
  mounted: function () {
    this.done()
    this.feedbackMessage = ''
  },
  methods: {
    done () {
      this.showDone = false
      this.currentLetter = this.getNextLetter()
      this.feedbackMessage = this.getFeedback()
      this.$refs.whiteboard.clear()
      this.demonstrateLetter(this.currentLetter)
      setTimeout(() => {
        this.showDone = true
        this.feedbackMessage = ''
      }, 3000)
    },
    getNextLetter () {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    },
    getFeedback () {
      return 'Great Job!'
    },
    demonstrateLetter (letter) {
      this.$refs.whiteboard.draw(letterPaths['o'])
    }
  }
}
</script>
