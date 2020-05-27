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

          <div> {{$store.state.user.displayName}} &nbsp; </div>
          <q-btn v-if="!$store.state.auth.isAuthenticated" flat round dense icon="far fa-user" label="" @click="rightDrawerOpen = !rightDrawerOpen"/>
          <q-btn v-if="$store.state.auth.isAuthenticated" flat round dense icon="fas fa-user" label="" @click="rightDrawerOpen = !rightDrawerOpen"/>
        </q-toolbar>
      </q-header>

      <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      :content-style="{ backgroundColor: '#f9f7f0' }"
    >
      <q-list>
        <q-item clickable to="letter">
          <q-item-section avatar>
            <q-icon name="fas fa-pencil-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Letter Practice</q-item-label>
            <q-item-label caption>Practice writing individual letters with assistance or freeform </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="word">
          <q-item-section avatar>
            <q-icon name="fas fa-book-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Word Practice</q-item-label>
            <q-item-label caption>Practice combining letters to form complete words</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="absolute-bottom">
        <q-list>
          <q-item>
            <div style="width:100%"> v{{$store.state.common.version}} </div>
            <div class="text-right" style="width:100%"> &copy; 2020 </div>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container style="touch-action:none;" touch-action="none" >
      <router-view />
    </q-page-container>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      elevated
      :content-style="{ backgroundColor: '#f9f7f0' }"
    >
      <q-list v-if="$store.state.auth.isAuthenticated">
        <q-item>
          <q-input v-model="student" label="Student" style="width: 100%" />
        </q-item>
        <q-item>
          <q-input v-model="sequence" label="Sequence" style="width: 100%" />
        </q-item>
        <q-item>
          <q-select v-model="technique" :options="techniqueOptions" label="Technique" style="width: 100%" />
        </q-item>
        <q-item>
          <q-toggle
            v-model="upload"
            color="primary"
            label="Upload Practice"
          />
        </q-item>
        <q-item>
          <q-btn @click="save()" style="width:100%" color="secondary" icon="fas fa-check"/>
        </q-item>
        <q-item>
          <q-btn @click="unauthenticate()" style="width:100%" color="secondary" label="Sign Out" />
        </q-item>
      </q-list>
      <q-list v-if="!$store.state.auth.isAuthenticated">
        <q-item>
          <q-btn @click="authenticate()" style="width:100%" color="secondary" label="Sign in" />
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  mounted: function () {
    this.setSettings()
    this.saveSequence()
  },
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      sequence: '',
      student: '',
      technique: 'Tracing',
      techniqueOptions: ['Tracing', 'Pattern', 'Freeform'],
      upload: false
    }
  },
  methods: {
    authenticate () {
      this.$store.dispatch('auth/authenticate')
    },
    unauthenticate () {
      this.$store.dispatch('auth/unauthenticate')
    },
    save () {
      this.saveSequence()
      this.rightDrawerOpen = false
    },
    setSettings (user) {
      this.student = this.$router.currentRoute.query.student || this.$store.state.common.user.name
      this.sequence = this.$router.currentRoute.query.seq || this.$store.state.common.user.sequence
      this.technique = this.$router.currentRoute.query.tech || this.$store.state.common.user.technique
      this.upload = this.$store.state.common.user.uploading
    },
    saveSequence () {
      let user = {
        name: this.student,
        sequence: this.sequence,
        technique: this.technique,
        uploading: this.upload
      }
      this.$store.dispatch('common/loginUser', user)
    }
  },
  watch: {
    rightDrawerOpen: function (updated, previous) {
      if (updated === true) {
        this.setSettings(this.$store.state.common.user)
      }
    }
  }
}
</script>
