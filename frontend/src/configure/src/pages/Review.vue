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
              <q-card-actions align="vertical">
                <q-select style="width:100%" outlined dense v-model="sequenceSelected" :options="sequenceOptions" label="Sequence" />
                <q-input style="width:100%" dense v-model="date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-actions>
              <q-card-actions align="around">
                <q-btn v-if="step === 'start'" color="accent" flat label="Start" @click="start()"></q-btn>
                <q-btn v-if="step === 'review'" color="negative" flat label="Previous" @click="previous()"></q-btn>
                <q-btn v-if="step === 'review'" color="info" flat label="Next" @click="next()"></q-btn>
                <q-btn v-if="step === 'review'" color="positive" flat label="Save" @click="save()"></q-btn>
                <q-btn v-if="step === 'review'" color="info" flat label="Restart" @click="restart()"></q-btn>
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
  name: 'PageReview',
  components: {
    EelCanvas
  },
  data () {
    return {
      sequenceOptions: ['standard', 'jim', 'Tm9haCBH'],
      sequenceSelected: 'standard',
      date: '2020/01/01',
      step: 'start',
      instructions: 'Welcome',
      subtext: 'Click start when you are ready to begin.',
      isCanvasActive: false,
      recording: {},
      letter: 'a',
      success: true,
      quality: 'Excellent',
      showDialog: false,
      qualityOptions: ['Excellent', 'Good', 'Okay', 'Poor', 'Egregious']
    }
  },
  methods: {
    start () {
      this.instructions = this.date
      this.subtext = this.getSubtext()
      this.step = 'review'
    },
    previous () {
      this.animate()
    },
    next () {
      this.animate()
    },
    getSubtext () {
      if (this.success) {
        return 'Success on letter "' + this.letter + '"'
      }
      return 'Mistake on letter "' + this.letter + '"'
    },
    animate () {
      this.$refs.whiteboard.clear()
      this.instructions = this.date
      this.subtext = this.getSubtext()
      this.$refs.whiteboard.draw(this.recording.path, true)
      setTimeout(() => {
        this.subtext = this.getSubtext()
      }, 3000)
    },
    save () {
      this.showDialog = true
    },
    restart () {
      this.$refs.whiteboard.clear()
      this.instructions = this.date
      this.subtext = this.getSubtext()
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
      this.instructions = this.date
      this.subtext = this.getSubtext()
      this.showDialog = false
    }
  }
}
</script>
