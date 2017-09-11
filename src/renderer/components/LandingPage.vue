<template>
  <div>

    <v-toolbar light dense class="mb-2 elevation-1">
      <v-toolbar-title class="pink--text">{{ taskStatus | formatStatus }}</v-toolbar-title>
      <v-spacer></v-spacer>
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

    <v-card v-if="taskStatus === 'all' && !allTasks.length">
      <v-card-text class= "elavation-0">
        <h3 class="headline">You have no tasks.</h3>
        <p>In the mean time you could use your time to research, socialise or dream big.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/create" flat class="pink--text"><v-icon class="pink--text">add</v-icon> Create new task</v-btn>
      </v-card-actions>
    </v-card>

    <!-- if there are no idle tasks -->
    <v-card v-if="taskStatus === 'idle' && !idleTasks.length">
      <v-card-title><h3 class="title">It's lonely here</h3>
      <v-card-text>You have no new tasks.</v-card-text>
      <v-card-actions>
        <v-btn to="/create" flat class="pink--text"><v-icon class="pink--text">add</v-icon> Create new task</v-btn>
      </v-card-actions>
      </v-card-title>
      </v-card>

    <!-- if there are no tasks in progress -->
    <v-card v-if="taskStatus === 'started' && !startedTasks.length">
      <v-card-title><h3 class="title">It's lonely here</h3>
      <v-card-text>You haven't started any tasks. You could be lagging behind.</v-card-text>
      <v-card-actions>
        <v-btn @click.native="showTasksByStatus('idle')" flat class="pink--text">View new tasks</v-btn>
      </v-card-actions>
      </v-card-title>
    </v-card>

    <!-- if there are finished tasks in progress -->
    <v-card v-if="taskStatus === 'finished' && !finishedTasks.length">
      <v-card-title><h3 class="title">It's lonely here</h3>
      <v-card-text>You have no completed tasks. Maybe you would like to see the tasks you havent started or the ones you are supposedly doing</v-card-text>
      <v-card-actions>
        <v-btn @click.native="showTasksByStatus('idle')" flat class="pink--text">View new tasks</v-btn>
        <v-btn @click.native="showTasksByStatus('started')" flat class="pink--text">View tasks in progress</v-btn>
      </v-card-actions>
      </v-card-title>
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
  import AppTaskTimeline from '@/components/AppTaskTimeline'
  import AppTaskList from '@/components/AppTaskList'
  export default {
    data () {
      return {
        dialog: false,
        taskToDelete: {},
        display: 'timeline',
        displayOptions: [
          { icon: 'timeline', value: 'timeline', text: 'timeline' },
          { icon: 'list', value: 'list', text: 'list' }
        ]
      }
    },

    mounted () { this.$store.dispatch('getTasks') },

    computed: {
      taskStatus () {
        return this.$store.getters.taskStatus
      },
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
        this.$store.dispatch('removeTask', this.taskToDelete)
        this.taskToDelete = {}
        this.dialog = false
      },
      showRemoveDialog (task) {
        this.taskToDelete = task
        this.dialog = true
      },
      startTask (task) {
        this.$store.dispatch('startTask', task)
      },
      finishTask (task) {
        this.$store.dispatch('finishTask', task)
      },
      editTask (task) {
        this.$store.commit('setTaskToUpdate', task)
        this.$router.push('/create')
      },
      showTasksByStatus (status) {
        this.$store.commit('setTaskStatus', status)
      }
    },

    filters: {
      formatStatus (value) {
        let output = ''
        switch (value) {
          case 'all':
            output = 'all'
            break
          case 'idle':
            output = 'new'
            break
          case 'started':
            output = 'in progress'
            break
          case 'finished':
            output = 'Completed'
            break
        }
        return output.toUpperCase()
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
