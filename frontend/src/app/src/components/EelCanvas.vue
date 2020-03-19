<template>
  <canvas id="mainCanvas" ref="mainCanvas"></canvas>
</template>

<script>
import Paintable from 'vue-paintable'
import Vue from 'vue'

Vue.use(Paintable)

export default {
  name: 'EelCanvas',
  mounted: function () {
    this.canvas = this.$refs.mainCanvas
    this.context = this.canvas.getContext('2d')
    this.styleCanvas()
    this.configureCanvas()
  },
  methods: {
    styleCanvas () {
      this.canvas.style.background = 'linear-gradient(30deg, #FFFFFF, #E0F7FA, #FFFFFF)'
      this.canvas.width = 800
      this.canvas.height = 1000
      this.canvas.style.border = '1px solid #E0F7FA'
    },
    configureCanvas () {
      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), false)
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e), false)
      this.context.strokeStyle = '#006064'
      this.context.lineWidth = 15
      this.context.lineCap = 'round'
    },
    handleMouseDown (event) {
      this.drawing = true
      this.prevPos = { x: event.offsetX, y: event.offsetY }
      this.paint(this.prevPos, this.prevPos)
    },
    handleMouseMove (event) {
      if (this.drawing) {
        console.log(event)
        this.paint(this.prevPos, { x: event.offsetX, y: event.offsetY })
      }
      this.prevPos = { x: event.offsetX, y: event.offsetY }
    },
    handleMouseUp (event) {
      this.drawing = false
    },
    handleMouseLeave (event) {
      this.drawing = false
    },
    paint (from, to) {
      this.context.beginPath()
      this.context.moveTo(from.x, from.y)
      this.context.lineTo(to.x, to.y)
      this.context.stroke()
    },
    clear () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>
