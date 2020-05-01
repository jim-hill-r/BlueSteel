<template>
  <q-card class="column col-12 text-center">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        <span v-if="atStart"> Welcome! </span>
        <span v-if="!atStart && letter != null"> Try <b>{{letter}}</b> </span>
        <span v-if="!atStart && letter == null"> You are ready for the next level! </span>
      </div>
      <div class="text-subtitle2">
        <span v-if="atStart"> Click start when you are ready to begin. </span>
        <span v-if="!atStart && letter != null"> {{feedback}} </span>
        <span v-if="!atStart && letter == null"> Amazing!  </span>
      </div>
    </q-card-section>

    <q-card-actions align="around">
      <q-btn v-if="atStart" @click="start()" no-caps style="width:100%" color="secondary">Start</q-btn>
      <q-btn v-if="!atStart && letter != null" @click="done()" no-caps icon="fas fa-check" style="width:100%" color="secondary"></q-btn>
      <q-btn v-if="!atStart && letter == null" @click="go()" no-caps style="width:100%" color="secondary">Go</q-btn>
    </q-card-actions>
    <q-card-section class="col">
      <EelCanvas v-on:animationcomplete="demoComplete()" :active="isCanvasActive" ref="whiteboard"></EelCanvas>
    </q-card-section>
  </q-card>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'
import { compare } from '../logic/validate.js'

export default {
  name: 'EelPractice',
  components: {
    EelCanvas
  },
  data () {
    return {
      isCanvasActive: false,
      atStart: true,
      feedback: 'Have fun!'
    }
  },
  computed: {
    complete: {
      get () {
        return !this.$store.state.common.complete
      }
    },
    letter: {
      get () {
        return this.$store.state.common.letter
      }
    }
  },
  methods: {
    start () {
      this.atStart = false
      this.$store.dispatch('common/startPractice')
      this.refresh()
    },
    done () {
      let recording = this.$refs.whiteboard.getRecording()
      let update = {
        success: this.validateSuccess(),
        letter: this.letter,
        pattern: {
          letter: this.letter,
          dimensions: recording.dimensions,
          path: recording.path
        }
      }
      if (update.success) {
        this.feedback = 'Great job!'
      } else {
        this.feedback = 'Try again!'
      }
      this.$store.dispatch('common/practiceAttempted', update)
      this.refresh()
    },
    refresh () {
      this.$refs.whiteboard.clear()
      this.demonstrateLetter()
    },
    validateSuccess () {
      let recording = this.$refs.whiteboard.getRecording().path
      for (let i = 0; i < this.letter.length; i++) {
        let currentPattern = this.$store.state.common.patterns[this.letter[i]]
        if (!compare(currentPattern.path, recording)) {
          return false
        }
      }
      return true
    },
    demonstrateLetter () {
      if (this.$store.state.common.patterns[this.letter]) {
        if (this.$store.state.common.user.technique === 'Tracing') {
          this.$refs.whiteboard.draw(this.$store.state.common.patterns[this.letter].path, true)
        } else if (this.$store.state.common.user.technique === 'Pattern') {
          this.$refs.whiteboard.draw(this.$store.state.common.patterns[this.letter].path, false)
        } else {
          setTimeout(() => {
            this.demoComplete()
          }, 1500)
        }
      }
    },
    demoComplete (event) {
      this.feedback = 'Begin'
      this.$refs.whiteboard.record()
      this.isCanvasActive = true
    },
    go () {
      this.$store.dispatch('common/completedTechnique')
    }
  }
}
</script>
