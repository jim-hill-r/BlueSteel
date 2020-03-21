<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="text-center">
        <p>
          <q-btn color="accent" glossy :label="recordLabel" @click="record()" /> &nbsp;
          <q-btn color="accent" glossy label="Replay" @click="replay()" /> &nbsp;
          <q-btn color="info" glossy label="Clear" @click="clear()" />
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
  name: 'PageTraining',
  components: {
    EelCanvas
  },
  data () {
    return {
      recordLabel: 'Record'
    }
  },
  methods: {
    record () {
      if (this.isRecording) {
        this.isRecording = false
        this.recordLabel = 'Record'
        this.recording = this.$refs.whiteboard.getRecording()
        console.log(this.recording)
      } else {
        this.isRecording = true
        this.recordLabel = 'Stop'
        this.$refs.whiteboard.record()
      }
    },
    replay () {
      this.clear()
      this.$refs.whiteboard.draw(this.recording, true)
    },
    clear () {
      this.$refs.whiteboard.clear()
    }
  }
}
</script>
