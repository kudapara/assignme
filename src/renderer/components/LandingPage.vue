<template>
  <div id="wrapper">
    <v-toolbar class="pink mb-2 elevation-1">
      <v-toolbar-title class="white--text">Assignment Tasks ({{tasks.length}})</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/create"><v-icon class="pink--text">add</v-icon> New task</v-btn>
      <v-btn-toggle class="white" v-bind:items="displayOptions" mandatory v-model="display"> </v-btn-toggle>
    </v-toolbar>

    <AppTaskTimeline :tasks="tasks" @deleteTask="showRemoveDialog" v-if="showTimelineComponent"></AppTaskTimeline>
    <AppTaskList :tasks="tasks" @deleteTask="showRemoveDialog" v-if="showListComponent"></AppTaskList>

    <v-card v-if="!tasks.length">
      <v-card-text>
        <h3 class="headline">You have no tasks.</h3>
        <p>In the mean time you could use your time to research, socialise or dream big.</p>
      </v-card-text>
      <v-btn to="/create" class="primary"><v-icon class="white--text">note_add</v-icon> Create New Task</v-btn>
    </v-card> 

    <!-- Ask for user to confirm delete action -->
    <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="dialog" persistent>
        <v-card dark>
          <v-card-title>
            <div class="headline">Delete selected task</div>
          </v-card-title>
          <v-card-text>Are you sure you want to delete the <b>{{taskToDelete.title}}</b> task?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green" @click.native="dialog = false">Don't delete</v-btn>
            <v-btn class="red--text darken-1" flat="flat" @click.native="removeTask">Go ahead</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>

<script>
  import AppTaskTimeline from './AppTaskTimeline'
  import AppTaskList from './AppTaskList'

  export default {
    name: 'landing-page',

    data () {
      return {
        dialog: false,
        taskToDelete: {},
        display: 'timeline',
        displayOptions: [
          { icon: 'timeline', value: 'timeline' },
          { icon: 'list', value: 'list' }
        ]
      }
    },

    mounted () { this.$store.commit('getTasks') },

    computed: {
      tasks () {
        return this.$store.getters.tasks
      },
      alert () {
        return this.$store.getters.alert
      },
      showTimelineComponent () {
        return this.display === 'timeline' && this.tasks.length > 0
      },
      showListComponent () {
        return this.display === 'list' && this.tasks.length > 0
      }
    },

    components: { AppTaskTimeline, AppTaskList },

    methods: {
      removeTask () {
        this.$store.commit('removeTask', this.taskToDelete)
        this.taskToDelete = {}
        this.dialog = false
      },
      showRemoveDialog (task) {
        this.taskToDelete = task
        this.dialog = true
      }
    }
  }
</script>

<style>
  .new.task {
    border-left-style:solid;
    border-left-width:2px;
    border-color:red;
  }
  .in_progress.task {
    border-left-style:solid;
    border-left-width:2px;
    border-color:orange
  }
  .done.task {
    border-left-style:solid;
    border-left-width:2px;
    border-color:green
  }

</style>
