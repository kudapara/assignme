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
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'assignme',
    data () { return { showAlert: false } },
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
</style>
