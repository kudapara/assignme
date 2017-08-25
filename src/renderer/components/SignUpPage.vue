<template>
  <v-card justify-center style ="margin-top:20px">
    <v-toolbar dark class="pink elevation-1">
      <h3 class="title white--text" dense>Sign in</h3>
    </v-toolbar>

    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Full name"
            v-model="user.name"
            prepend-icon="person">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            label="Username"
            v-model="user.username"
            prepend-icon="person">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            label="Password"
            v-model="user.password"
            prepend-icon="lock"
            type="password">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            label="Please re-enter password for confirmation"
            v-model="user.confirmPassword"
            prepend-icon="lock"
            type="password"
            @keyup.native.enter="signUp">
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-btn block class="primary" @click="signUp">Sign in</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SignUpPage',
  data () {
    return {
      user: {
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },

  computed: {
    authUser () { return this.$store.getters.authUser }
  },

  watch: {
    authUser (value) {
      if (value !== null) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    signUp () {
      const user = this.user
      if (user.password === user.confirmPassword) {
        delete user.confirmPassword
        this.$store.commit('signUp', user)
      } else {
        this.$store.commit('showAlert', {
          title: 'Please enter matching passwords',
          type: 'warning'
        })
      }
    }
  }
}
</script>
