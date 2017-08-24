<template>
  <v-toolbar class="elevation-0" dense>
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" style="height: 50px">
    <v-btn flat @click.native="goBack" v-if="showBackBtn">
      <v-icon>chevron_left</v-icon> Back
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn flat class="pink--text" @click.native="open('https://github.com/kudapara/assignme/releases')"><v-icon class="pink--text">update</v-icon> Check for Updates</v-btn>
    <v-chip outline label class="pink pink--text">
      v{{version}}
    </v-chip>
    <v-btn to="/signin" v-if="showSignInBtn">Signin</v-btn>
    <v-btn v-if="showSignOutBtn" @click.native="signOut"><v-icon>lock_outline</v-icon> Lock App</v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        version: require('../../../package.json').version
      }
    },

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },

      goBack () {
        // whenever you leave the create task window, cleat the taskToEdit
        // so that when a new task is going to be created there will be no problem
        this.$store.commit('setTaskToEdit', null)
        this.$router.push('/')
      },

      signOut () {
        this.$store.commit('signOut')
        this.$router.push('/signin')
      }
    },

    computed: {
      authUser () {
        return this.$store.getters.authUser
      },

      showBackBtn () {
        return this.$route.name !== 'landing-page' && this.$route.name !== 'signin-page'
      },

      showSignInBtn () {
        return !this.authUser && this.$route.name !== 'signin-page'
      },

      showSignOutBtn () {
        return this.authUser
      }
    }
  }
</script>
