<template>
  <div>
    <q-page padding>
      <div>
        <div class="row justify-center">
          <div class="text-center">
            <q-card class="my-card">
              <q-card-section class="bg-accent text-white">
                <div class="text-h6">{{instructions}}</div>
                <div class="text-subtitle2">{{subtext}}</div>
              </q-card-section>

              <q-card-actions align="around">
                <q-btn v-if="step === 'start'" color="accent" flat label="Record" @click="record()"></q-btn>
                <q-btn v-if="step === 'record'" color="negative" flat label="Stop" @click="stop()"></q-btn>
                <q-btn v-if="step === 'save'" color="info" flat label="Replay" @click="replay()"></q-btn>
                <q-btn v-if="step === 'save'" color="positive" flat label="Save" @click="save()"></q-btn>
                <q-btn v-if="step === 'save'" color="info" flat label="Restart" @click="restart()"></q-btn>
              </q-card-actions>
            </q-card>
            <q-card class="my-card">
              <q-card-section>
                <EelCanvas :active="isCanvasActive" ref="whiteboard"></EelCanvas>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <q-select outlined v-model="letter" :options="letterOptions" label="Letter" />
          <q-select outlined v-model="quality" :options="qualityOptions" label="Quality" />
          <q-btn color="positive" glossy label="Upload" @click="upload()" />
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
      step: 'start',
      instructions: 'Welcome',
      subtext: 'Click record when you are ready to begin.',
      isCanvasActive: false,
      recording: {},
      letter: 'a',
      quality: 'Excellent',
      showDialog: false,
      letterOptions: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      qualityOptions: ['Excellent', 'Good', 'Okay', 'Poor', 'Egregious']
    }
  },
  methods: {
    record () {
      this.$refs.whiteboard.record()
      this.isCanvasActive = true
      this.instructions = 'Draw a lowercase letter'
      this.subtext = 'The slower your pace, the more data will be collected.'
      this.step = 'record'
    },
    stop () {
      this.recording = this.$refs.whiteboard.getRecording()
      this.isCanvasActive = false
      this.instructions = 'Review your recording'
      this.subtext = 'Press replay to see how this will show to students.'
      this.step = 'save'
    },
    replay () {
      this.$refs.whiteboard.clear()
      this.instructions = 'Replaying...'
      this.subtext = '...'
      this.$refs.whiteboard.draw(this.recording.path, true)
      setTimeout(() => {
        this.instructions = 'Save your recording'
        this.subtext = 'Press save to upload your recording to the database.'
      }, 3000)
    },
    save () {
      this.showDialog = true
    },
    restart () {
      this.$refs.whiteboard.clear()
      this.instructions = 'Begin when ready'
      this.subtext = 'Click record when you are ready to begin.'
      this.step = 'start'
    },
    upload () {
      let pattern = {
        letter: this.letter,
        quality: this.quality,
        dimensions: this.recording.dimensions,
        path: this.recording.path
      }
      this.$store.dispatch('common/uploadPattern', pattern)
      this.instructions = 'Saved'
      this.subtext = 'Press restart to begin again.'
      this.showDialog = false
    }
  }
}
</script>
