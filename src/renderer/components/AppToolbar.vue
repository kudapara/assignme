<template>
  <v-toolbar class="elevation-0" dense>
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue" style="height: 50px">
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
      }
    }
  }
</script>
