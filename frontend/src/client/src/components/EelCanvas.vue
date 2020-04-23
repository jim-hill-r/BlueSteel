<template>
  <canvas style="touch-action:none;" touch-action="none" id="mainCanvas" ref="mainCanvas"></canvas>
</template>

<script>

export default {
  name: 'EelCanvas',
  props: {
    active: Boolean
  },
  data () {
    return {
      recordedPoints: []
    }
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
          heightMM: this.heightInMM,
          heightPixels: this.canvas.height,
          widthPixels: this.canvas.width,
          upperGuidePixels: this.upperLineY,
          middleGuidePixels: this.middleLineY,
          lowerGuidePixels: this.lowerLineY,
          lowestGuidePixels: this.lowestLineY
        },
        path: this.recordedPoints
      }
    },
    styleCanvas () {
      this.heightInMM = 85
      const pixelRatio = 1 // window.devicePixelRatio || 1
      this.canvas.style.width = '300px'
      this.canvas.style.height = `${this.heightInMM}mm`
      this.canvas.style.height = `${this.canvas.clientHeight * 7 / 5}px`
      this.canvas.width = this.canvas.clientWidth * pixelRatio
      this.canvas.height = this.canvas.clientHeight * pixelRatio
      const canvasTopMarginRatio = 5 / this.heightInMM
      const canvasTopWritingAreaRatio = 25 / this.heightInMM
      const canvasWritingAreaRatio = 25 / this.heightInMM
      const canvasBottomWritingAreaRatio = 25 / this.heightInMM
      this.upperLineY = canvasTopMarginRatio * this.canvas.height
      this.middleLineY = this.upperLineY + canvasTopWritingAreaRatio * this.canvas.height
      this.lowerLineY = this.middleLineY + canvasWritingAreaRatio * this.canvas.height
      this.lowestLineY = this.lowerLineY + canvasBottomWritingAreaRatio * this.canvas.height
      this.canvas.style.background = 'linear-gradient(180deg, #f7feff, #FFFFFF, #f7feff)'
      this.canvas.style.border = '1px solid #E0F7FA'
    },
    configureCanvas () {
      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), false)
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e), false)
      // this.canvas.addEventListener('pointerdown', (e) => this.handleMouseDown(e), false)
      // this.canvas.addEventListener('pointermove', (e) => this.handleMouseMove(e), false)
      // this.canvas.addEventListener('pointerup', (e) => this.handleMouseUp(e), false)
      // this.canvas.addEventListener('pointerleave', (e) => this.handleMouseLeave(e), false)
      this.canvas.addEventListener('touchstart', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('touchmove', (e) => this.handleMouseMove(e), true)
      this.canvas.addEventListener('touchend', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('touchcancel', (e) => this.handleMouseLeave(e), false)
    },
    preventDefault (event) {
      event.stopPropagation()
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
      this.context.lineWidth = 6
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    configureMiddleGuideStroke () {
      this.context.strokeStyle = '#3D4849'
      this.context.lineWidth = 3
      this.context.lineCap = 'round'
      this.context.setLineDash([this.canvas.width * 0.04, this.canvas.width * 0.02875])
    },
    configureLowestGuideStroke () {
      this.context.strokeStyle = '#667b7d'
      this.context.lineWidth = 4
      this.context.lineCap = 'round'
      this.context.setLineDash([])
    },
    handleMouseDown (event) {
      event.preventDefault()
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
      event.preventDefault()
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
      event.preventDefault()
      this.drawing = false
      let point = { x: event.offsetX, y: event.offsetY, type: 'end' }
      if (this.isRecording) {
        this.recordedPoints.push(point)
      }
    },
    handleMouseLeave (event) {
      event.preventDefault()
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
      this.paint({ x: 0, y: this.lowerLineY }, { x: this.canvas.width, y: this.lowerLineY })
      this.paint({ x: 0, y: this.upperLineY }, { x: this.canvas.width, y: this.upperLineY })
      this.configureLowestGuideStroke()
      this.paint({ x: 0, y: this.lowestLineY }, { x: this.canvas.width, y: this.lowestLineY })
      this.configureMiddleGuideStroke()
      this.paint({ x: 0, y: this.middleLineY }, { x: this.canvas.width, y: this.middleLineY })
      this.configureUserStroke()
    },
    draw (points, includePath) {
      if (!points || points.length < 0) {
        return
      }
      this.isAnimating = true
      this.animationSegment = -5
      this.animationPoints = points
      this.animationPaintPath = includePath
      let drawTime = 3000 // milliseconds
      this.timePerPoint = drawTime / this.animationPoints.length
      this.then = Date.now()
      this.now = Date.now()
      this.animate()
    },
    animate () {
      if (this.isAnimating) {
        window.requestAnimationFrame(this.animate)
      }
      this.now = Date.now()
      let elapsed = this.now - this.then
      if (elapsed > this.timePerPoint) {
        this.then = this.now
        if (this.animationSegment > this.animationPoints.length + 5) {
          this.finishAnimation()
        } else if (this.animationPoints[this.animationSegment] == null) {
          // Do nothing, wait for next frame
        } else if (this.animationSegment > this.animationPoints.length + 5) {
          this.finishAnimation()
        } else if (this.animationPoints[this.animationSegment].type === 'start') {
          this.configureStartStroke()
          this.paint(this.animationPoints[this.animationSegment], this.animationPoints[this.animationSegment + 1])
        } else if (this.animationPoints[this.animationSegment].type === 'end') {
          this.configureEndStroke()
          this.paint(this.animationPoints[this.animationSegment - 1], this.animationPoints[this.animationSegment])
        } else if (this.animationPaintPath) {
          this.configureEelStroke()
          let endPoint = this.animationPoints[this.animationSegment + 1] || this.animationPoints[this.animationSegment]
          this.paint(this.animationPoints[this.animationSegment], endPoint)
        }
        this.animationSegment++
      }
    },
    finishAnimation () {
      console.log('got here')
      this.configureUserStroke()
      this.isAnimating = false
      this.$emit('animationcomplete')
    }
  }
}
</script>
