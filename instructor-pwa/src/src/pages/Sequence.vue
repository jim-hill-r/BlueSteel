<template>
  <div>
    <q-page padding>
      <div>
        <div class="row justify-center">
          <div class="text-center">
            <q-card class="my-card">
              <q-card-section class="bg-accent text-white">
                <div class="text-h6">Sequences</div>
              </q-card-section>

              <q-card-actions align="around">
                <q-select style="width:100%" outlined dense v-model="sequenceSelected" :options="sequenceOptions" label="Sequence" />
              </q-card-actions>

              <q-card-actions align="around">
                <q-btn color="accent" flat label="New" @click="create()"></q-btn>
                <q-btn color="negative" flat label="Save" @click="save()"></q-btn>
              </q-card-actions>
            </q-card>
            <q-card class="my-card">
              <q-card-section>
                <q-input
                  v-model="sequenceJson"
                  filled
                  autogrow
                />
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
export default {
  name: 'PageSequence',
  data () {
    return {
      sequenceOptions: ['standard', 'jim', 'Tm9haCBH'],
      sequenceSelected: 'standard',
      sequenceJson:
     `{
        "letters": [
          [a, b, c],
          [e, f, g]
        ],
        "words" : [
          [Change, me, to],
          [new, words]
        ]
      }`,
      sequence: {
        letters: [
          ['a', 'b', 'c'],
          ['d', 'e', 'f']
        ],
        words: [
          ['jim', 'is', 'testing'],
          ['change', 'these', 'i', 'hope']
        ]
      }
    }
  }
}
</script>
