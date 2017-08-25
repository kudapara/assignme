<template>
  <v-snackbar
      :success="alert.type === 'success'"
      :warning="alert.type === 'warning'"
      :info="alert.type === 'info'"
      :error="alert.type === 'error'"
      :timeout="2000"
      top
      v-model="show">
      {{ alert.title }}
      <v-btn class="white" @click.native="$emit('close')">
        <v-icon>close</v-icon> Close
      </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'AppAlert',

    data () {
      return {
        show: this.showAlert
      }
    },

    watch: {
      showAlert (value) {
        this.show = value
      },

      show (value) {
        if (value === false) {
          this.$store.commit('closeAlert')
        }
      }
    },

    props: {
      alert: Object,
      showAlert: Boolean
    }
  }
</script>
