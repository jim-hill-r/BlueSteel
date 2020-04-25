<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="fas fa-bars" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />

          <q-toolbar-title>
            <router-link to="/" >
              <span class="text-white"> Blue Eel Configurator </span>
            </router-link>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable to="sequence">
          <q-item-section avatar>
            <q-icon name="fas fa-clipboard-list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sequences</q-item-label>
            <q-item-label caption>Define custom sequences for students</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="review">
          <q-item-section avatar>
            <q-icon name="fas fa-spell-check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Review</q-item-label>
            <q-item-label caption>Analyze students work</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="training">
          <q-item-section avatar>
            <q-icon name="fas fa-magic" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Train the Eel</q-item-label>
            <q-item-label caption>Write letters accurately to train the algorithm</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <div class="text-right"> &nbsp; &nbsp; &copy; 2020 </div>
      </div>
    </q-drawer>

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
      sequenceId: 'Standard'
    }
  },
  methods: {
    saveSequence () {
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
