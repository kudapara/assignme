<template>
  <div id="wrapper">
    <v-toolbar light class="pink mb-2 elevation-1">
      <v-btn-toggle class="white elevation-4" v-bind:items="taskStatuses" mandatory v-model="taskStatus"> </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-btn to="/create"><v-icon class="pink--text">add</v-icon> New task</v-btn>
      <v-btn-toggle class="white" v-bind:items="displayOptions" mandatory v-model="display"> </v-btn-toggle>
    </v-toolbar>

    <!-- TASK TIMELINE COMPONENT -->
    <AppTaskTimeline
      :tasks="displayTasks"
      @deleteTask="showRemoveDialog"
      @startTask="startTask"
      @editTask="editTask"
      @restartTask="startTask"
      @finishTask="finishTask"
      v-if="showTimelineComponent">
    </AppTaskTimeline>

    <!-- TASK LIST COMPONENT -->
    <AppTaskList
      :tasks="displayTasks"
      @deleteTask="showRemoveDialog"
      @startTask="startTask"
      @editTask="editTask"
      @restartTask="startTask"
      @finishTask="finishTask"
      v-if="showListComponent">
    </AppTaskList>

    <v-card v-if="!allTasks.length">
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
        ],
        taskStatus: 'all'
      }
    },

    mounted () { this.$store.commit('getTasks') },

    computed: {
      displayTasks () {
        return this[`${this.taskStatus}Tasks`]
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
      },
      alert () {
        return this.$store.getters.alert
      },
      showTimelineComponent () {
        return this.display === 'timeline' && this.allTasks.length > 0
      },
      showListComponent () {
        return this.display === 'list' && this.allTasks.length > 0
      },
      taskStatuses () {
        return [
          { text: `all (${this.allTasks.length})`, value: 'all' },
          { text: `idle (${this.idleTasks.length})`, value: 'idle' },
          { text: `started (${this.startedTasks.length})`, value: 'started' },
          { text: `finished (${this.finishedTasks.length})`, value: 'finished' }
        ]
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
      },
      startTask (task) {
        this.$store.commit('startTask', task)
      },
      finishTask (task) {
        this.$store.commit('finishTask', task)
      },
      editTask (task) {
        this.$store.commit('setTaskToEdit', task)
        this.$router.push('/create')
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
