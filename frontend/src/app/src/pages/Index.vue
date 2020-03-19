<template>
  <q-page padding>
    <div class="text-center">
      <h2> Draw the letter {{currentLetter}}! </h2>
      <h3> {{feedbackMessage}}</h3>
      <q-btn color="accent" label="Done!" @click="done()" />
    </div>
    <paintable
      alwaysOnTop
      :active="true"
      :width="800"
      :height="800"
      :name="paintableName"
      :color="paintableColor"
      :lineWidth="20"
      :disableNavigation="true"
      ref="paintableRef"
      class="text-center">
    </paintable>
  </q-page>
</template>

<script>
import Vue from 'vue'
import Paintable from 'vue-paintable'

Vue.use(Paintable)

export default {
  name: 'PageIndex',
  data () {
    return {
      paintableName: 'test',
      paintableColor: '#90a4ae',
      currentLetter: 'A',
      feedbackMessage: ''
    }
  },
  methods: {
    done () {
      this.currentLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      this.feedbackMessage = 'Great job!'
      this.$refs.paintableRef.clearCanvas()
    }
  }
}
</script>
