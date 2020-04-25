<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="fas fa-bars" label="" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />

          <q-toolbar-title>
            <router-link to="/" >
              <span class="text-white"> Blue Eel </span>
            </router-link>
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-ellipsis-v" @click="rightDrawerOpen = !rightDrawerOpen"/>
        </q-toolbar>
      </q-header>

      <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable to="tracing">
          <q-item-section avatar>
            <q-icon name="fas fa-bacon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tracing Practice</q-item-label>
            <q-item-label caption>Practice tracing letters to learn the patterns</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="pattern">
          <q-item-section avatar>
            <q-icon name="fas fa-draw-polygon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pattern Practice</q-item-label>
            <q-item-label caption>Practice writing letters given a start and finish point</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="freeform">
          <q-item-section avatar>
            <q-icon name="fas fa-wave-square" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Freeform Practice</q-item-label>
            <q-item-label caption>Practice writing letters</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="word">
          <q-item-section avatar>
            <q-icon name="fas fa-book-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Word Practice</q-item-label>
            <q-item-label caption>Practice combining letters to make words</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <div class="text-right"> v{{$store.state.common.version}} &nbsp; &nbsp; &copy; 2020 </div>
      </div>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item>
          <q-input v-model="sequenceId" label="Sequence" style="width: 100%" />
        </q-item>
        <q-item>
          <q-input v-model="student" label="Student" style="width: 100%" />
        </q-item>
        <q-item>
          <q-toggle
            v-model="upload"
            color="accent"
            label="Upload Practice"
          />
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container style="touch-action:none;" touch-action="none" >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  mounted: function () {
    this.sequenceId = this.$router.currentRoute.query.seq || 'Standard'
    this.saveSequence()
  },
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      sequenceId: 'Standard',
      student: '',
      upload: false
    }
  },
  methods: {
    saveSequence () {
      let user = {
        name: this.student,
        sequenceId: this.sequenceId,
        uploading: this.upload
      }
      this.$store.dispatch('common/loginUser', user)
    }
  },
  watch: {
    rightDrawerOpen: function (updated, previous) {
      if (updated === false) {
        this.saveSequence()
      }
    }
  }
}
</script>
