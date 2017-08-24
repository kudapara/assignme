<template>
  <v-app id="app">
    <!-- show alerts using the snackbar -->
    <app-alert :alert="alert" @close="closeAlert"></app-alert>
    <app-toolbar></app-toolbar>

    <v-container id="wrapping">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
  import AppAlert from '@/components/AppAlert'
  import AppToolbar from '@/components/AppToolbar'

  export default {
    name: 'assignme',

    components: { AppAlert, AppToolbar },

    methods: {
      closeAlert () {
        this.$store.commit('closeAlert')
      }
    },

    computed: {
      alert () {
        return this.$store.getters.alert
      }
    }
  }
</script>

<style lang="stylus">
  /* CSS */
  @import './stylus/main'
  body { font-family: 'Ubuntu', 'Source Sans Pro', sans-serif; }
</style>
