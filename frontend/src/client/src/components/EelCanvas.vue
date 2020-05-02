<template>
    <canvas
      style="touch-action:none;"
      touch-action="none"
      id="mainCanvas"
      ref="mainCanvas">
      <q-resize-observer @resize="onResize" debounce="1200" />
    </canvas>
</template>

<script>
import { dimensions, scale, move } from '../logic/path.js'

export default {
  name: 'EelCanvas',
  props: {
    active: Boolean
  },
  data () {
    return {
      recordedPoints: [],
      aspectRatio: 1
    }
  },
  mounted: function () {
    this.canvas = this.$refs.mainCanvas
    this.context = this.canvas.getContext('2d')
    this.configureListeners()
    this.configureSize()
  },
  methods: {
    onResize () {
      if (this.canvas) {
        this.configureSize()
      }
    },
    record () {
      this.recordedPoints = []
      this.isRecording = true
    },
    getRecording () {
      this.isRecording = false
      return {
        boundary: this.boundary,
        path: this.recordedPoints
      }
    },
    configureSize () {
      const pixelRatio = 1 // window.devicePixelRatio || 1
      this.canvas.style.width = '100%'
      this.canvas.style.height = '98%'
      if (this.aspectRatio !== null && this.aspectRatio !== 0) {
        let allowableAspectRatio = this.canvas.clientWidth / this.canvas.clientHeight
        if (allowableAspectRatio < this.aspectRatio) {
          this.canvas.style.height = `${this.canvas.clientWidth / this.aspectRatio}px`
        }
      }
      this.canvas.width = this.canvas.clientWidth * pixelRatio
      this.canvas.height = this.canvas.clientHeight * pixelRatio
      this.configureGuidelines()
      this.clear()
    },
    configureGuidelines () {
      this.boundary = {
        top: 0,
        ascenderLine: this.canvas.height * (5) / 85,
        capLine: this.canvas.height * (5) / 85,
        meanLine: this.canvas.height * (5 + 25) / 85,
        baseLine: this.canvas.height * (5 + 25 + 25) / 85,
        beardLine: this.canvas.height * (5 + 25 + 25 + 25) / 85,
        bottom: this.canvas.height
      }
    },
    configureListeners () {
      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e), false)
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), false)
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e), false)
      this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e), false)
      // this.canvas.addEventListener('pointerdown', (e) => this.handleMouseDown(e), false)
      // this.canvas.addEventListener('pointermove', (e) => this.handleMouseMove(e), false)
      // this.canvas.addEventListener('pointerup', (e) => this.handleMouseUp(e), false)
      // this.canvas.addEventListener('pointerleave', (e) => this.handleMouseLeave(e), false)
      this.canvas.addEventListener('touchstart', (e) => this.handleTouchDown(e), false)
      this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), true)
      this.canvas.addEventListener('touchend', (e) => this.handleTouchUp(e), false)
      this.canvas.addEventListener('touchcancel', (e) => this.handleTouchLeave(e), false)
    },
    getMousePoint (event) {
      let boundingRect = this.canvas.getBoundingClientRect()
      return { x: event.clientX - boundingRect.left, y: event.clientY - boundingRect.top }
    },
    getTouchPoint (event) {
      let boundingRect = this.canvas.getBoundingClientRect()
      return { x: event.targetTouches[0].clientX - boundingRect.left, y: event.targetTouches[0].clientY - boundingRect.top }
    },
    handleMouseDown (event) {
      if (!this.isAnimating && this.active) {
        this.startDraw(this.getMousePoint(event))
      }
    },
    handleTouchDown (event) {
      event.preventDefault()
      if (!this.isAnimating && this.active) {
        this.startDraw(this.getTouchPoint(event))
      }
    },
    startDraw (point) {
      this.setStrokeStyle('USER')
      this.drawing = true
      point.type = 'start'
      this.prevPoint = point
      this.segmentDraw(point)
    },
    handleMouseMove (event) {
      if (this.drawing) {
        this.segmentDraw(this.getMousePoint(event))
      }
    },
    handleTouchMove (event) {
      if (this.drawing) {
        this.segmentDraw(this.getTouchPoint(event))
      }
    },
    segmentDraw (point) {
      this.paintLine(this.prevPoint, point)
      if (this.isRecording) {
        this.recordedPoints.push(point)
      }
      this.prevPoint = point
    },
    handleMouseUp (event) {
      this.endDraw(this.prevPoint)
    },
    handleTouchUp (event) {
      this.endDraw(this.prevPoint)
    },
    endDraw (point) {
      if (point) {
        point.type = 'end'
        this.segmentDraw(point)
      }
      this.drawing = false
    },
    handleMouseLeave (event) {
      this.drawing = false
    },
    handleTouchLeave (event) {
      this.drawing = false
    },
    setStrokeStyle (style) {
      this.context.lineCap = 'round'
      this.context.strokeStyle = '#072A40'
      this.context.setLineDash([])
      if (style === 'USER') {
        this.context.strokeStyle = '#178CA4'
        this.context.lineWidth = 15
      } else if (style === 'EEL') {
        this.context.strokeStyle = '#18B7BE'
        this.context.lineWidth = 8
      } else if (style === 'START_CIRCLE') {
        this.context.strokeStyle = 'white'
        this.context.fillStyle = '#5A8100'
        this.context.lineWidth = 2
      } else if (style === 'END_CIRCLE') {
        this.context.strokeStyle = 'white'
        this.context.fillStyle = '#B74803'
        this.context.lineWidth = 2
      } else if (style === 'CAP_LINE' || style === 'BASE_LINE') {
        this.context.lineWidth = 6
      } else if (style === 'MEAN_LINE') {
        this.context.lineWidth = 3
        this.context.setLineDash([this.canvas.width * 0.04, this.canvas.width * 0.02875])
      } else if (style === 'BEARD_LINE') {
        this.context.lineWidth = 3
      }
    },
    paintLine (from, to) {
      this.context.beginPath()
      this.context.moveTo(from.x, from.y)
      this.context.lineTo(to.x, to.y)
      this.context.stroke()
    },
    paintCircle (center, radius) {
      this.context.beginPath()
      this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false)
      this.context.fill()
      this.context.stroke()
    },
    clear () {
      this.canvas.style.background = '#F9F7F0'
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.setStrokeStyle('CAP_LINE')
      this.paintLine({ x: 0, y: this.boundary.capLine }, { x: this.canvas.width, y: this.boundary.capLine })
      this.setStrokeStyle('BASE_LINE')
      this.paintLine({ x: 0, y: this.boundary.baseLine }, { x: this.canvas.width, y: this.boundary.baseLine })
      this.setStrokeStyle('BEARD_LINE')
      this.paintLine({ x: 0, y: this.boundary.beardLine }, { x: this.canvas.width, y: this.boundary.beardLine })
      this.setStrokeStyle('MEAN_LINE')
      this.paintLine({ x: 0, y: this.boundary.meanLine }, { x: this.canvas.width, y: this.boundary.meanLine })
      this.setStrokeStyle('USER')
    },
    setAspectRatio (pattern) {
      this.aspectRatio = dimensions(pattern).ar
      this.configureSize()
    },
    fit (pattern) {
      let patternHeight = pattern.boundary.baseLine - pattern.boundary.capLine
      let canvasHeight = this.boundary.baseLine - this.boundary.capLine
      let scaledPath = scale(pattern.path, canvasHeight / patternHeight)
      let dims = dimensions(scaledPath)
      scaledPath = move(scaledPath, { x: 0.5 * this.canvas.width - dims.c.x, y: 0 })
      return scaledPath
    },
    draw (pattern, technique) {
      this.setAspectRatio(pattern)
      let points = this.fit(pattern)
      if (!points || points.length < 0 || technique === 'Freeform') {
        setTimeout(() => {
          this.$emit('animationcomplete')
        }, 1200)
      }

      this.animationSegment = 0
      this.animationPoints = points

      let drawTime = 3000 // milliseconds
      this.timePerPoint = drawTime / this.animationPoints.length

      if (technique === 'Pattern') {
        this.animationPoints = points.filter(point => point.type === 'start' || point.type === 'end')
        this.timePerPoint = 400 // milliseconds
      }

      this.then = Date.now()
      this.now = Date.now()
      this.isAnimating = true
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
        if (this.animationSegment >= this.animationPoints.length) {
          this.setStrokeStyle('USER')
          this.isAnimating = false
          this.$emit('animationcomplete')
        } else if (this.animationPoints[this.animationSegment].type === 'start') {
          this.setStrokeStyle('START_CIRCLE')
          this.paintCircle(this.animationPoints[this.animationSegment], 13)
        } else if (this.animationPoints[this.animationSegment].type === 'end') {
          this.setStrokeStyle('END_CIRCLE')
          this.paintCircle(this.animationPoints[this.animationSegment], 13)
        } else {
          this.setStrokeStyle('EEL')
          let endPoint = this.animationPoints[this.animationSegment + 1] || this.animationPoints[this.animationSegment]
          this.paintLine(this.animationPoints[this.animationSegment], endPoint)
        }
        this.animationSegment++
      }
    }
  }
}
</script>
