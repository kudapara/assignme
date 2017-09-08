<template>
  <div>
    <v-card v-if="isThereUser"  justify-center style ="margin-top:60px">
    <v-toolbar dark class="pink elevation-1">
      <h3 class="title white--text" dense>Sign in</h3>
    </v-toolbar>

    <v-card-text>
      <v-layout row wrap>
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
            type="password"
            @keyup.native.enter="signIn">
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-btn block class="primary" @click="signIn">Sign in</v-btn>
    </v-card-actions>
  </v-card>

  <AppWelcomeCard v-if="!isThereUser"></AppWelcomeCard>
  </div>
</template>

<script>
import AppWelcomeCard from '@/components/AppWelcomeCard'
export default {
  name: 'SignInPage',
  mounted () {
    this.$store.commit('checkForUser')
  },
  components: { AppWelcomeCard },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  computed: {
    authUser () { return this.$store.getters.authUser },
    isThereUser () { return this.$store.getters.isThereUser }
  },

  watch: {
    authUser (value) {
      if (value !== null) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    signIn () {
      const user = this.user
      this.$store.dispatch('signIn', user)
    }
  }
}
</script>
