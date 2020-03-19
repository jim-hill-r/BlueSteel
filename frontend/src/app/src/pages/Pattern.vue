<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-center">
        <h4> Coming soon! </h4>
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
  name: 'PagePattern',
  components: {
    EelCanvas
  },
  methods: {
    done () {
      this.$refs.whiteboard.clear()
    }
  }
}
</script>
