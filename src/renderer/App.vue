<template>
  <v-app id="app">
    <!-- show alerts using the snackbar -->
    <v-snackbar
      :success="alert.type === 'success'"
      :warning="alert.type === 'warning'"
      :info="alert.type === 'info'"
      :error="alert.type === 'error'"
      :timeout="2000"
      top
      v-model="alert.show"
    >
      {{ alert.title }}
      <v-btn class="white" @click.native="showAlert = false"><v-icon>close</v-icon>Close</v-btn>
    </v-snackbar>
    <v-toolbar class="elevation-0" dense>
      <img id="logo" src="~@/assets/logo.png" alt="electron-vue" style="height: 50px">
      <v-spacer></v-spacer>
      <v-btn class="pink white--text" @click.native="open('https://github.com/kudapara/assignme/releases')">Updates</v-btn>
      <v-chip outline label class="pink pink--text">
        v{{version}}
      </v-chip>
    </v-toolbar>
    <v-container id="wrapping">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'assignme',
    data () { return { showAlert: false, version: require('../../package.json').version } },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    watch: {
      showAlert (value) {
        if (value === false && this.alert.show === true) {
          this.$store.commit('closeAlert')
        }
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
