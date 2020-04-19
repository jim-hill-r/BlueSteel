<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />

          <q-toolbar-title>
            <router-link to="/" >
              <span class="text-white" style="font-family: 'Chilanka', cursive;"> Blue Eel </span>
            </router-link>
          </q-toolbar-title>
          <q-btn flat round dense icon="settings" @click="rightDrawerOpen = !rightDrawerOpen"/>
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
            <q-icon name="fingerprint" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tracing Practice</q-item-label>
            <q-item-label caption>Practice tracing letters to learn the patterns</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="pattern">
          <q-item-section avatar>
            <q-icon name="scatter_plot" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pattern Practice</q-item-label>
            <q-item-label caption>Practice writing letters given a start and finish point</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="freeform">
          <q-item-section avatar>
            <q-icon name="gesture" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Freeform Practice</q-item-label>
            <q-item-label caption>Practice writing letters</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="word">
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Word Practice</q-item-label>
            <q-item-label caption>Practice combining letters to make words</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
      <q-footer elevated>
        <q-toolbar>
          <q-toolbar-title></q-toolbar-title>
          &copy; 2020
        </q-toolbar>
      </q-footer>

      <q-page-container>
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
