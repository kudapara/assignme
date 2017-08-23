<template>
  <div id="wrapper">
    <v-toolbar class="pink mb-2 elevation-1">
      <v-toolbar-title class="white--text">Assignment Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/create"><v-icon class="white--text">note_add</v-icon></v-btn>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-card v-for="task in tasks" :key="task.id">
      <v-card-title>{{task.title}}</v-card-title>
      <v-card-actions>
        <span class="grey--text">{{ task.deadline }}</span>
        <v-spacer></v-spacer>
        <v-btn @click.native="removeTask(task)" class="red white--text" dark>
          <v-icon dark>delete</v-icon>
            Delete Task
        </v-btn>
      </v-card-actions>
      <hr>
    </v-card>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    mounted () { this.$store.commit('getTasks') },
    computed: {
      tasks () {
        console.log('tasks')
        console.log(this.$store.state.tasks)
        return this.$store.state.tasks
      },
      alert () {
        return this.$store.getters.alert
      }
    },
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      removeTask (task) {
        this.$store.commit('removeTask', task)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
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

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
