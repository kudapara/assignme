<template>
  <v-toolbar class="elevation-0" dense>
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" style="height: 50px">
    <v-btn flat @click.native="goBack" v-if="$route.name !== 'landing-page'">
      <v-icon>chevron_left</v-icon> Back
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn class="pink white--text" @click.native="open('https://github.com/kudapara/assignme/releases')">Updates</v-btn>
    <v-chip outline label class="pink pink--text">
      v{{version}}
    </v-chip>
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
      }
    }
  }
</script>
