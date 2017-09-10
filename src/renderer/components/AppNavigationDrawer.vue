<template>
 <v-navigation-drawer
      permanent
      light
      right
      enable-resize-watcher
      absolute
      class="elevation-1"
      style="position:fixed;"
      >

      <v-list dense class="pt-0">
        <v-subheader v-text="'Tasks'"></v-subheader>
        <v-list-tile v-for="item in items" :key="item.title" @click="showTasksByStatus(item.status)">
          <v-list-tile-action>
            <v-progress-circular
              v-bind:rotate="360"
              v-bind:value="item.percent"
              :size="30"
              :class="{
                  'red--text': item.color === 'red',
                  'orange--text': item.color === 'orange',
                  'green--text': item.color === 'green',
                  'pink--text': item.color === 'pink',
                  }">
              {{ item.value }}
            </v-progress-circular>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-subheader v-text="'Actions'"></v-subheader>
        <v-list-tile router to="/create">
          <v-list-tile-content class="pink--text">
            <span><v-icon class="pink--text">add</v-icon> New Task</span>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="open('https://github.com/kudapara/assignme/releases')">
          <v-list-tile-content class="pink--text">
            <span><v-icon class="pink--text">update</v-icon> Check for updates</span>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="signOut">
          <v-list-tile-content class="pink--text">
            <span><v-icon class="pink--text">lock_outline</v-icon> Lock App</span>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
 </template>

<script>
export default {
  data () {
    return {
      drawer: null,
      right: null,
      drawerRight: true
    }
  },

  methods: {
    showTasksByStatus (status) {
      this.$store.commit('setTaskStatus', status)
      this.$router.push('/')
    },
    signOut () {
      this.$store.commit('signOut')
      this.$router.push('/signin')
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  },

  computed: {
    taskStatus () {
      return this.$store.getters.taskStatus
    },
    items () {
      return [
        {
          title: 'New',
          value: this.idleTasks.length,
          status: 'idle',
          percent: this.idleTasks.length === 0
            ? 0
            : (100 * (this.allTasks.length / this.idleTasks.length)),
          color: 'red' },
        {
          title: 'In progress',
          value: this.startedTasks.length,
          status: 'started',
          percent: this.startedTasks.length === 0
            ? 0
            : (100 * (this.allTasks.length / this.startedTasks.length)),
          color: 'orange'
        },
        {
          title: 'Completed',
          value: this.finishedTasks.length,
          status: 'finished',
          percent: this.finishedTasks.length === 0
            ? 0
            : (100 * (this.allTasks.length / this.finishedTasks.length)),
          color: 'green'
        },
        {
          title: 'All',
          value: this.allTasks.length,
          status: 'all',
          percent: this.allTasks.length === 0
            ? 0
            : 100,
          color: 'pink'
        }
      ]
    },
    allTasks () {
      return this.$store.getters.tasks
    },
    idleTasks () {
      return this.allTasks.filter(task => task.status === 'new')
    },
    startedTasks () {
      return this.allTasks.filter(task => task.status === 'in_progress')
    },
    finishedTasks () {
      return this.allTasks.filter(task => task.status === 'done')
    }
  }
}
</script>

<style>

</style>
