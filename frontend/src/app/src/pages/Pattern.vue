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

export default {
  name: 'PagePattern',
  components: {
    EelCanvas
  },
  data () {
    return {
      currentLetter: '',
      nextLetter: '',
      feedbackMessage: '',
      showDone: false
    }
  },
  created: function () {
    this.$store.dispatch('common/fetchPatterns')
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
      if (this.$store.state.common.patterns['test']) {
        this.$refs.whiteboard.draw(this.$store.state.common.patterns[letter].path, false)
      }
    }
  }
}
</script>
