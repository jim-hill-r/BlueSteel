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
            <q-btn v-if="buttonLabel==='Start'" flat @click="start()">Start</q-btn>
            <q-btn v-if="buttonLabel==='Done'" flat @click="done()">Done</q-btn>
            <q-btn v-if="buttonLabel==='Go'" flat @click="go()">Go</q-btn>
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
      isCanvasActive: false,
      buttonLabel: 'Start'
    }
  },
  created: function () {
    this.$store.dispatch('common/fetchPatterns')
  },
  computed: {
    letter: {
      get () {
        return this.$store.state.common.letter
      }
    },
    instructions: {
      get () {
        return this.$store.state.common.instructions
      }
    },
    subtext: {
      get () {
        return this.$store.state.common.feedback
      }
    }
  },
  methods: {
    start () {
      this.$store.dispatch('common/promptForWatching')
      this.refresh()
    },
    done () {
      let update = {
        success: this.validateSuccess(),
        letter: this.letter,
        level: this.level
      }
      this.$store.dispatch('common/practiceAttempted', update)
      this.refresh()
    },
    refresh () {
      this.buttonLabel = 'Done'
      this.$refs.whiteboard.clear()
      this.demonstrateLetter()
      this.$refs.whiteboard.record()
      this.isCanvasActive = true
      this.$store.dispatch('common/promptForDrawing')
    },
    validateSuccess () {
      let recording = this.$refs.whiteboard.getRecording().path
      let currentPattern = this.$store.state.common.patterns[this.letter]
      if (compare(currentPattern.path, recording)) {
        return true
      }
      return false
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
