<template>
  <paintable
      alwaysOnTop
      :active="true"
      :width="800"
      :height="800"
      name="canvasOne"
      color="#90a4ae"
      :lineWidth="20"
      :disableNavigation="true"
      ref="paintable"
      class="text-center">
    </paintable>
</template>

<script>
import Paintable from 'vue-paintable'
import Vue from 'vue'

Vue.use(Paintable)

export default {
  name: 'EelCanvas',
  methods: {
    clear () {
      this.$refs.paintable.clearCanvas()
    }
  }
}
</script>
