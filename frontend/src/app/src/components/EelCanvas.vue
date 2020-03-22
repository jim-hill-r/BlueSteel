<template>
  <canvas style="touch-action:none;" id="mainCanvas" ref="mainCanvas"></canvas>
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
    record () {
      this.recordedPoints = []
      this.isRecording = true
    },
    getRecording () {
      this.isRecording = false
      return this.recordedPoints
    },
    styleCanvas () {
      this.scale = 500
      this.canvas.style.background = 'linear-gradient(30deg, #FFFFFF, #E0F7FA, #FFFFFF)'
      this.canvas.width = this.scale
      this.canvas.height = this.scale
      this.canvas.style.border = '1px solid #E0F7FA'
      this.configureUserStroke()
    },
    configureCanvas () {
      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), false)
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e), false)
      this.canvas.addEventListener('pointerdown', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('pointermove', (e) => this.handleMouseMove(e), false)
      this.canvas.addEventListener('pointerup', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('pointerleave', (e) => this.handleMouseLeave(e), false)
    },
    configureUserStroke () {
      this.context.strokeStyle = '#006064'
      this.context.lineWidth = 15
      this.context.lineCap = 'round'
    },
    configureEelStroke () {
      this.context.strokeStyle = '#FFD54F'
      this.context.lineWidth = 8
      this.context.lineCap = 'round'
    },
    configureStartStroke () {
      this.context.strokeStyle = 'green'
      this.context.lineWidth = 25
      this.context.lineCap = 'round'
    },
    configureEndStroke () {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 25
      this.context.lineCap = 'round'
    },
    handleMouseDown (event) {
      if (this.isAnimating) {
        return
      }
      this.drawing = true
      let point = { x: event.offsetX, y: event.offsetY, type: 'start' }
      this.paint(point, point)
      this.prevPos = point
      if (this.isRecording) {
        this.recordedPoints.push(this.normalize(point))
      }
    },
    handleMouseMove (event) {
      if (this.drawing) {
        let point = { x: event.offsetX, y: event.offsetY }
        this.paint(this.prevPos, point)
        this.prevPos = { x: event.offsetX, y: event.offsetY }
        if (this.isRecording) {
          this.recordedPoints.push(this.normalize(point))
        }
      }
    },
    handleMouseUp (event) {
      this.drawing = false
      let point = { x: event.offsetX, y: event.offsetY, type: 'end' }
      if (this.isRecording) {
        this.recordedPoints.push(this.normalize(point))
      }
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
    },
    draw (points, includePath) {
      if (!points || points.length < 0) {
        return
      }
      this.isAnimating = true
      this.animationSegment = 0
      this.animationPoints = points.map(this.transform)
      this.animationPaintPath = includePath
      this.animate()
    },
    transform (point) {
      let transformedX = this.scale * 0.25 * (point.x + 2)
      let transformedY = this.scale * 0.25 * (-1 * point.y + 2)
      return { x: transformedX, y: transformedY, type: point.type }
    },
    normalize (point) {
      let normalizedX = ((point.x / (this.scale * 0.25)) - 2)
      let normalizedY = ((point.y / (this.scale * 0.25)) - 2) * -1
      return { x: normalizedX, y: normalizedY, type: point.type }
    },
    animate () {
      if (this.animationSegment < this.animationPoints.length - 2) {
        window.requestAnimationFrame(this.animate)
      } else {
        window.requestAnimationFrame(this.finishAnimation)
      }
      let doPaint = this.animationPaintPath
      if (this.animationPoints[this.animationSegment].type === 'start') {
        this.configureStartStroke()
        doPaint = true
      } else if (this.animationPoints[this.animationSegment + 1].type === 'end') {
        this.configureEndStroke()
        doPaint = true
      } else if (this.animationPoints[this.animationSegment].type === 'end') {
        doPaint = false
      } else {
        this.configureEelStroke()
      }
      if (doPaint) {
        this.paint(this.animationPoints[this.animationSegment], this.animationPoints[this.animationSegment + 1])
      }
      this.animationSegment++
    },
    finishAnimation () {
      this.configureUserStroke()
      this.isAnimating = false
    }
  }
}
</script>
