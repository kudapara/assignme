<template>
  <div>

    <v-toolbar light dense class="mb-2 elevation-1">
      <v-toolbar-title class="pink--text">{{ taskStatus | formatStatus }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle class="white" v-bind:items="displayOptions" mandatory v-model="display"> </v-btn-toggle>
    </v-toolbar>

    <!-- The overdue tasks -->
    <AppOverdueTasks
      v-if="overdueTasks.length">
    </AppOverdueTasks>

    <!-- TASK TIMELINE COMPONENT -->
    <AppTaskTimeline
      v-if="showTimelineComponent">
    </AppTaskTimeline>

    <!-- TASK LIST COMPONENT -->
    <AppTaskList
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
  
  </div>
</template>

<script>
  import AppOverdueTasks from '@/components/AppOverdueTasks'
  import AppTaskTimeline from '@/components/AppTaskTimeline'
  import AppTaskList from '@/components/AppTaskList'
  import taskMixin from '@/components/mixins/tasks'

  export default {
    data () {
      return {
        display: 'timeline',
        displayOptions: [
          { icon: 'timeline', value: 'timeline', text: 'timeline' },
          { icon: 'list', value: 'list', text: 'list' }
        ]
      }
    },

    mixins: [taskMixin],
    mounted () { this.$store.dispatch('getTasks') },

    computed: {
      taskStatus () {
        return this.$store.getters.taskStatus
      },
      showTimelineComponent () {
        return this.display === 'timeline' && this.allTasks.length > 0
      },
      showListComponent () {
        return this.display === 'list' && this.allTasks.length > 0
      }
    },

    components: { AppOverdueTasks, AppTaskTimeline, AppTaskList },

    methods: {
      showTasksByStatus (status) {
        this.$store.commit('setTaskStatus', status)
      }
    },

    filters: {
      formatStatus (value) {
        if (value === 'all') return 'all'.toUpperCase()
        if (value === 'idle') return 'new'.toUpperCase()
        if (value === 'started') return 'in progress'.toUpperCase()
        if (value === 'finished') return 'completed'.toUpperCase()
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
