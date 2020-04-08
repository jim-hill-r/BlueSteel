<template>
  <div>
    <div class="row justify-center">
      <div class="text-center">
        <q-card class="my-card">
          <q-card-section class="bg-accent text-white">
            <div class="text-h6">
              <span v-if="atStart"> Welcome! </span>
              <span v-if="!atStart && letter != null"> Draw the
                <span v-if="level === 'word'"> word </span>
                <span v-if="level !== 'word'"> letter </span>
              "{{letter}}" </span>
              <span v-if="!atStart && letter == null"> You are ready for the next level! </span>
            </div>
            <div class="text-subtitle2">
              <span v-if="atStart"> Click start when you are ready to begin. </span>
              <span v-if="!atStart && letter != null"> {{feedback}} </span>
              <span v-if="!atStart && letter == null"> Amazing!  </span>
            </div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn v-if="atStart" flat @click="start()">Start</q-btn>
            <q-btn v-if="!atStart && letter != null" flat @click="done()">Done</q-btn>
            <q-btn v-if="!atStart && letter == null" flat @click="go()">Go</q-btn>
          </q-card-actions>
        </q-card>
        <q-card class="my-card">
          <q-card-section>
            <EelCanvas v-on:animationcomplete="demoComplete()" :active="isCanvasActive" ref="whiteboard"></EelCanvas>
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
      this.$store.dispatch('common/startPractice', this.level)
      setTimeout(() => {
        // TODO: Need to wait to fetch first letter... fix this
        this.refresh()
      }, 1000)
    },
    done () {
      let update = {
        success: this.validateSuccess(),
        letter: this.letter,
        level: this.level
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
        if (this.level === 'tracing') {
          this.$refs.whiteboard.draw(this.$store.state.common.patterns[this.letter].path, true)
        } else if (this.level === 'pattern') {
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
      if (this.level === 'tracing') {
        this.$router.push('/pattern')
      } else if (this.level === 'pattern') {
        this.$router.push('/freeform')
      } else if (this.level === 'freeform') {
        this.$router.push('/word')
      } else {
        this.$router.push('/congratulations')
      }
    }
  }
}
</script>
