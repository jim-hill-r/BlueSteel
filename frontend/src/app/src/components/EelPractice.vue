<template>
  <div>
    <div class="row justify-center">
      <div class="text-center">
        <q-card class="my-card">
          <q-card-section class="bg-accent text-white">
            <div class="text-h6">{{instructions}}</div>
            <div class="text-subtitle2">{{subtext}}</div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn flat @click="start()">{{buttonLabel}}</q-btn>
          </q-card-actions>
        </q-card>
        <q-card class="my-card">
          <q-card-section>
            <EelCanvas :active="isCanvasActive" ref="whiteboard"></EelCanvas>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'
import { compare } from '../logic/validate.js'

export default {
  name: 'EelPractice',
  components: {
    EelCanvas
  },
  props: {
    level: String
  },
  data () {
    return {
      instructions: 'Welcome',
      subtext: 'Click start when you are ready to begin.',
      isCanvasActive: false,
      buttonLabel: 'Start',
      letter: 'a',
      loading: true,
      success: true,
      attempts: 0
    }
  },
  created: function () {
    this.$store.dispatch('common/fetchPatterns')
  },
  methods: {
    start () {
      this.success = this.validateSuccess()
      this.subtext = this.getFeedback()
      this.letter = this.getNextLetter()
      this.$refs.whiteboard.clear()
      this.instructions = `Draw the letter "${this.letter}"`
      this.buttonLabel = 'Done'
      this.demonstrateLetter(this.currentLetter)
      this.isCanvasActive = true
      this.$refs.whiteboard.record()
      setTimeout(() => {
        this.subtext = `...`
      }, 3000)
    },
    validateSuccess () {
      let recording = this.$refs.whiteboard.getRecording().path
      let currentPattern = this.$store.state.common.patterns[this.letter]
      if (!currentPattern || !recording || recording.length < 1) {
        this.loading = true
        return true
      }
      this.loading = false
      if (compare(currentPattern.path, recording)) {
        return true
      }
      return false
    },
    getNextLetter () {
      if (this.success || this.attempts > 2) {
        this.attempts = 0
        return String.fromCharCode(97 + Math.floor(Math.random() * 26))
      }
      this.attempts++
      return this.letter
    },
    getFeedback () {
      if (this.loading) {
        return '...'
      }
      if (this.attempts > 2) {
        return `We will come back! Let's try another`
      }
      if (this.success) {
        return 'Great job!'
      }
      return 'Try again...'
    },
    demonstrateLetter () {
      if (this.$store.state.common.patterns[this.letter]) {
        if (this.level === 'freeform') {
          // Do nothing
        } else if (this.level === 'pattern') {
          this.$refs.whiteboard.draw(this.$store.state.common.patterns[this.letter].path, false)
        } else {
          this.$refs.whiteboard.draw(this.$store.state.common.patterns[this.letter].path, true)
        }
      }
    }
  }
}
</script>
