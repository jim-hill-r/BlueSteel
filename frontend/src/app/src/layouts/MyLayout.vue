<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          <router-link to="/" >
            <span class="text-white" style="font-family: 'Chilanka', cursive;"> Blue Eel </span>
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
        <q-item clickable to="training">
          <q-item-section avatar>
            <q-icon name="train" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Train the Eel</q-item-label>
            <q-item-label caption>Write letters accurately to train the algorithm</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
