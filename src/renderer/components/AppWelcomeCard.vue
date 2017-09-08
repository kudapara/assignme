<template>
  <v-card class="pink darken-2 white--text" style ="margin-top:60px">
    <v-card-title primary-title>
      <div class="headline">Never miss an assignment again!</div>
      <div>Let us help you remember the tasks you should do and let you focus on doing them better.</div>
    </v-card-title>
    <v-card-actions>
         <v-btn raised light class="white pink--text" to="/signup">
        <v-icon class="pink--text">person_add</v-icon> Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'AppWelcomeCard'
  }
</script>

