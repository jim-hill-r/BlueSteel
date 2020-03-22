<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <div class="text-center">
          <p>
            <q-btn color="accent" glossy :label="recordLabel" @click="record()" /> &nbsp;
            <q-btn color="accent" glossy label="Replay" @click="replay()" /> &nbsp;
            <q-btn color="info" glossy label="Clear" @click="clear()" /> &nbsp;
            <q-btn v-if="recording.length > 0" color="green" glossy label="Save" @click="showDialog = true" />
          </p>
        </div>
      </div>
      <div class="row justify-center">
          <EelCanvas ref="whiteboard"></EelCanvas>
      </div>
    </q-page>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <q-select outlined v-model="letterTrained" :options="letterOptions" label="Letter" />
          <q-select outlined v-model="letterQuality" :options="qualityOptions" label="Quality" />
          <q-btn color="green" glossy label="Save" @click="save()" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
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
      recording: [],
      recordLabel: 'Record',
      letterTrained: 'a',
      letterQuality: 'Excellent',
      showDialog: false,
      letterOptions: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      qualityOptions: ['Excellent', 'Good', 'Okay', 'Poor', 'Egregious']
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
    },
    save () {
      this.showDialog = false
      if (this.letterTrained.length !== 1) {
        return
      }
      let now = new Date()
      var timestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds())
      let data = {
        letter: this.letterTrained,
        quality: this.letterQuality,
        path: this.recording
      }
      let config = {
        headers: {
          'content-type': 'application/json',
          'x-amz-acl': 'public-read'
        }
      }
      let filename = `${timestamp}.json`
      this.$axios.put(`https://eel3-data.s3.us-east-2.amazonaws.com/patterns/${this.letterTrained}/${filename}`, data, config)
    }
  }
}
</script>
