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
  name: 'PageTracing',
  components: {
    EelCanvas
  },
  data () {
    return {
      currentLetter: this.getNextLetter(),
      feedbackMessge: ''
    }
  },
  mounted: function () {
    this.currentLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
    this.demonstrateLetter(this.currentLetter)
  },
  methods: {
    done () {
      this.currentLetter = this.getNextLetter()
      this.feedbackMessage = this.getFeedback()
      this.$refs.whiteboard.clear()
      this.demonstrateLetter(this.currentLetter)
    },
    getNextLetter () {
      return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    },
    getFeedback () {
      return 'Great Job!'
    },
    demonstrateLetter (letter) {
      this.$refs.whiteboard.draw(this.getAPoints())
    },
    getAPoints () {
      let points = []
      points.push({ x: 141.75, y: 187.5 })
      points.push({ x: 147.61, y: 178.3 })
      points.push({ x: 154.24, y: 169.65 })
      points.push({ x: 161.61, y: 161.61 })
      points.push({ x: 169.65, y: 154.24 })
      points.push({ x: 178.3, y: 147.61 })
      points.push({ x: 187.5, y: 141.75 })
      points.push({ x: 197.17, y: 136.71 })
      points.push({ x: 207.25, y: 132.54 })
      points.push({ x: 217.65, y: 129.26 })
      points.push({ x: 228.29, y: 126.9 })
      points.push({ x: 239.11, y: 125.48 })
      points.push({ x: 250, y: 125 })
      points.push({ x: 260.89, y: 125.48 })
      points.push({ x: 271.71, y: 126.9 })
      points.push({ x: 282.35, y: 129.26 })
      points.push({ x: 292.75, y: 132.54 })
      points.push({ x: 302.83, y: 136.71 })
      points.push({ x: 312.5, y: 141.75 })
      points.push({ x: 321.7, y: 147.61 })
      points.push({ x: 330.35, y: 154.24 })
      points.push({ x: 338.39, y: 161.61 })
      points.push({ x: 345.76, y: 169.65 })
      points.push({ x: 352.39, y: 178.3 })
      points.push({ x: 358.25, y: 187.5 })
      points.push({ x: 363.29, y: 197.17 })
      points.push({ x: 367.46, y: 207.25 })
      points.push({ x: 370.74, y: 217.65 })
      points.push({ x: 373.1, y: 228.29 })
      points.push({ x: 374.52, y: 239.11 })
      points.push({ x: 375, y: 250 })
      points.push({ x: 374.52, y: 260.89 })
      points.push({ x: 373.1, y: 271.71 })
      points.push({ x: 370.74, y: 282.35 })
      points.push({ x: 367.46, y: 292.75 })
      points.push({ x: 363.29, y: 302.83 })
      points.push({ x: 358.25, y: 312.5 })
      points.push({ x: 352.39, y: 321.7 })
      points.push({ x: 345.76, y: 330.35 })
      points.push({ x: 338.39, y: 338.39 })
      points.push({ x: 330.35, y: 345.76 })
      points.push({ x: 321.7, y: 352.39 })
      points.push({ x: 312.5, y: 358.25 })
      points.push({ x: 302.83, y: 363.29 })
      points.push({ x: 292.75, y: 367.46 })
      points.push({ x: 282.35, y: 370.74 })
      points.push({ x: 271.71, y: 373.1 })
      points.push({ x: 260.89, y: 374.52 })
      points.push({ x: 250, y: 375 })
      points.push({ x: 239.11, y: 374.52 })
      points.push({ x: 228.29, y: 373.1 })
      points.push({ x: 217.65, y: 370.74 })
      points.push({ x: 207.25, y: 367.46 })
      points.push({ x: 197.17, y: 363.29 })
      points.push({ x: 187.5, y: 358.25 })
      points.push({ x: 178.3, y: 352.39 })
      points.push({ x: 169.65, y: 345.76 })
      points.push({ x: 161.61, y: 338.39 })
      points.push({ x: 154.24, y: 330.35 })
      points.push({ x: 147.61, y: 321.7 })
      points.push({ x: 141.75, y: 312.5 })
      points.push({ x: 136.71, y: 302.83 })
      points.push({ x: 132.54, y: 292.75 })
      points.push({ x: 129.26, y: 282.35 })
      points.push({ x: 126.9, y: 271.71 })
      points.push({ x: 125.48, y: 260.89 })
      points.push({ x: 125, y: 250 })
      points.push({ x: 125.48, y: 239.11 })
      points.push({ x: 126.9, y: 228.29 })
      points.push({ x: 129.26, y: 217.65 })
      points.push({ x: 132.54, y: 207.25 })
      points.push({ x: 136.71, y: 197.17 })
      points.push({ x: 141.75, y: 187.5 })
      return points
    }
  }
}
</script>
