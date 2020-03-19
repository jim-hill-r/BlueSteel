<template>
  <q-page padding>
    <q-banner v-if="successBanner" class="bg-positive text-white">
      Success!
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="successBanner = false" />
      </template>
    </q-banner>
    <q-banner v-if="warningBanner" class="bg-warning text-white">
      {{warningMessage}}
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="warningBanner = false" />
      </template>
    </q-banner>
    <div class="row justify-center">
      <div class="text-center">
        <h4> Draw and report quality of drawing.</h4>
        <p>
          <q-input v-model="letter" label="Letter Drawn"></q-input>
        </p>
        <p>
          <q-btn color="positive" glossy label="Excellent" @click="train('excellent')" /> &nbsp;
          <q-btn color="accent" glossy label="Good" @click="train('good')" /> &nbsp;
          <q-btn color="negative" glossy label="Poor" @click="train('poor')" /> &nbsp;
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
      letter: '',
      successBanner: false,
      warningBanner: false,
      warningMessage: 'There was an issue saving.'
    }
  },
  methods: {
    train () {
      this.successBanner = false
      if (this.letter.length < 1) {
        this.warningMessage = 'Please specify letter drawn.'
        this.warningBanner = true
        return
      }
      if (this.letter.length > 1) {
        this.warningMessage = 'Please specify on a single letter.'
        this.warningBanner = true
        return
      }
      this.warningBanner = false
      this.successBanner = true
    },
    clear () {
      this.$refs.whiteboard.clear()
      this.letter = ''
    }
  }
}
</script>
