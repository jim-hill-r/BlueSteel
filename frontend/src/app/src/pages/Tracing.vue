<template>
  <div>
    <h2> Coming Soon! </h2>
    <EelCanvas class="text-center" ref="whiteboard"></EelCanvas>
  </div>
</template>

<script>
import EelCanvas from '../components/EelCanvas.vue'

export default {
  name: 'PageTracing',
  components: {
    EelCanvas
  }
}
</script>
