<template>
  <canvas style="touch-action:none;" id="mainCanvas" ref="mainCanvas"></canvas>
</template>

<script>

export default {
  name: 'EelCanvas',
  props: {
    active: Boolean
  },
  mounted: function () {
    this.canvas = this.$refs.mainCanvas
    this.context = this.canvas.getContext('2d')
    this.styleCanvas()
    this.configureCanvas()
    this.clear()
  },
  methods: {
    record () {
      this.recordedPoints = []
      this.isRecording = true
    },
    getRecording () {
      this.isRecording = false
      return {
        dimensions: {
          mm: {
            height: 0,
            width: 0
          },
          pixel: {
            topMargin: this.canvasTopMargin,
            topWriting: this.canvasTopWritingArea,
            bottomWriting: this.canvasBottomWritingArea,
            bottomMargin: this.canvasBottomMargin,
            width: this.canvas.width
          }
        },
        path: this.recordedPoints
      }
    },
    styleCanvas () {
      this.canvasTopMargin = 50
      this.canvasTopWritingArea = 100
      this.canvasBottomWritingArea = 100
      this.canvasBottomMargin = 100
      this.canvas.width = 340
      this.canvas.height = this.canvasTopMargin + this.canvasTopWritingArea + this.canvasBottomWritingArea + this.canvasBottomMargin
      this.canvas.style.background = 'linear-gradient(180deg, #E0F7FA, #FFFFFF, #E0F7FA)'
      this.canvas.style.border = '1px solid #E0F7FA'
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
      this.context.setLineDash([])
    },
    configureEelStroke () {
      this.context.strokeStyle = '#FFD54F'
      this.context.lineWidth = 8
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    configureStartStroke () {
      this.context.strokeStyle = 'green'
      this.context.lineWidth = 25
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    configureEndStroke () {
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 25
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    configureGuidesStroke () {
      this.context.strokeStyle = '#3D4849'
      this.context.lineWidth = 4
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    configureMiddleGuideStroke () {
      this.context.strokeStyle = '#3D4849'
      this.context.lineWidth = 2
      this.context.lineCap = 'round'
      this.context.setLineDash([this.canvas.width * 0.04, this.canvas.width * 0.02875])
    },
    handleMouseDown (event) {
      if (this.isAnimating || !this.active) {
        return
      }
      this.drawing = true
      let point = { x: event.offsetX, y: event.offsetY, type: 'start' }
      this.paint(point, point)
      this.prevPos = point
      if (this.isRecording) {
        this.recordedPoints.push(point)
      }
    },
    handleMouseMove (event) {
      if (this.drawing) {
        let point = { x: event.offsetX, y: event.offsetY }
        this.paint(this.prevPos, point)
        this.prevPos = { x: event.offsetX, y: event.offsetY }
        if (this.isRecording) {
          this.recordedPoints.push(point)
        }
      }
    },
    handleMouseUp (event) {
      this.drawing = false
      let point = { x: event.offsetX, y: event.offsetY, type: 'end' }
      if (this.isRecording) {
        this.recordedPoints.push(point)
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
      this.configureGuidesStroke()
      let upperLineY = this.canvasTopMargin
      let middleLineY = upperLineY + this.canvasTopWritingArea
      let lowerLineY = middleLineY + this.canvasBottomWritingArea
      this.paint({ x: 0, y: lowerLineY }, { x: this.canvas.width, y: lowerLineY })
      this.paint({ x: 0, y: upperLineY }, { x: this.canvas.width, y: upperLineY })
      this.configureMiddleGuideStroke()
      this.paint({ x: 0, y: middleLineY }, { x: this.canvas.width, y: middleLineY })
      this.configureUserStroke()
    },
    draw (points, includePath) {
      if (!points || points.length < 0) {
        return
      }
      this.isAnimating = true
      this.animationSegment = 0
      this.animationPoints = points
      this.animationPaintPath = includePath
      this.animate()
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
