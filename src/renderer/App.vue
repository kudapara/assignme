<template>
  <v-app id="app">
    <!-- show alerts using the snackbar -->
    <app-alert :alert="alert" :showAlert="showAlert" @close="closeAlert"></app-alert>
    <app-navigation-drawer v-if="authenticated"></app-navigation-drawer>
    <app-toolbar v-if="authenticated"></app-toolbar>

    <!-- The Main content -->
    <main>
      <v-container id="wrapping" fluid>
        <router-view></router-view>
      </v-container>
    </main>

    <!--The footer region -->
    <v-footer class="pa-3" fixed>
      <v-spacer></v-spacer>
      <div class="pink--text">assignme v{{version}}</div>
    </v-footer>
  </v-app>
</template>

<script>
  import AppAlert from '@/components/AppAlert'
  import AppNavigationDrawer from '@/components/AppNavigationDrawer'
  import AppToolbar from '@/components/AppToolbar'

  export default {
    name: 'assignme',

    components: { AppAlert, AppNavigationDrawer, AppToolbar },

    data () {
      return {
        showAlert: false,
        version: require('../../package.json').version
      }
    },

    methods: {
      closeAlert () {
        this.$store.commit('closeAlert')
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },

    computed: {
      alert () {
        this.showAlert = this.$store.getters.alert.show
        return this.$store.getters.alert
      },
      authenticated () { return !!this.$store.getters.authUser === true }
    }
  }
</script>

<style lang="stylus">
  /* CSS */
  @import './stylus/main'
  body { font-family: 'Ubuntu', 'Source Sans Pro', sans-serif; }
</style>
