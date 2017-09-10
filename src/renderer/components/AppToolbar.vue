<template>
  <v-toolbar light class="elevation-1" dense v-if="showToolbar">
    <!-- back button.-->
    <v-btn flat @click.native="goBack">
      <v-icon>chevron_left</v-icon> Back
    </v-btn>

    <v-spacer></v-spacer>
    
    <!-- The sign in button -->
    <v-btn
      to="/signin"
      v-if="showSignInBtn"
      class="pink white--text">
      Sign in
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      goBack () {
        // whenever you leave the create task window, cleat the taskToEdit
        // so that when a new task is going to be created there will be no problem
        this.$store.commit('setTaskToUpdate', null)
        this.$router.push('/')
      }
    },

    computed: {
      authUser () {
        return this.$store.getters.authUser
      },

      showToolbar () {
        return this.$route.name === 'create-task'
      },

      showSignInBtn () {
        return !this.authUser && this.$route.name !== 'signin-page' && this.$route.name !== 'signup-page'
      }
    }
  }
</script>
