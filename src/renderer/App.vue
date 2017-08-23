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
  body { font-family: 'Ubuntu', 'Source Sans Pro', sans-serif; }

  #app {
    background:
      radial-gradient(  
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
</style>
