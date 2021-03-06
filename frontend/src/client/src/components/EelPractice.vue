<template>
  <q-card class="column col-12 text-center">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        <span v-if="atStart"> Welcome! </span>
        <span v-if="!atStart && expression != null"> Try <b>{{expression}}</b> </span>
        <span v-if="!atStart && expression == null"> You are ready for the next level! </span>
      </div>
      <div class="text-subtitle2">
        <span v-if="atStart"> Click start when you are ready to begin. </span>
        <span v-if="!atStart && expression != null"> {{feedback}} </span>
        <span v-if="!atStart && expression == null"> Amazing!  </span>
      </div>
    </q-card-section>

    <q-card-actions align="around">
      <q-btn v-if="atStart" @click="start()" no-caps style="width:100%" color="secondary">Start</q-btn>
      <q-btn v-if="!atStart && expression != null" @click="done()" no-caps icon="fas fa-check" style="width:100%" color="secondary"></q-btn>
      <q-btn v-if="!atStart && expression == null" @click="go()" no-caps style="width:100%" color="secondary">Go</q-btn>
    </q-card-actions>
    <q-card-section class="col">
      <EelCanvas
        v-on:animationcomplete="demoComplete()"
        :active="isCanvasActive"
        ref="whiteboard">
      </EelCanvas>
    </q-card-section>
  </q-card>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'
import { compare } from '../logic/validate.js'
import { concatenate } from '../logic/pattern.js'

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
    expression: {
      get () {
        return this.$store.state.common.expression
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
        expression: this.expression,
        pattern: {
          expression: this.expression,
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
      this.demonstrateExpression()
    },
    generatePattern () {
      let patterns = []
      for (let i = 0; i < this.expression.length; i++) {
        let pattern = this.$store.state.common.patterns[this.expression[i]]
        if (pattern) {
          patterns.push(pattern)
        }
      }
      return concatenate(patterns)
    },
    validateSuccess () {
      let recordedPattern = this.$refs.whiteboard.getRecording()
      for (let i = 0; i < this.expression.length; i++) {
        if (!compare(this.generatePattern(), recordedPattern)) {
          return false
        }
      }
      return true
    },
    demonstrateExpression () {
      if (this.expression && this.expression.length > 0) {
        let pattern = this.generatePattern()
        this.$refs.whiteboard.draw(pattern, this.$store.state.common.user.technique)
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
