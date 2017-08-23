<template>
  <div id="wrapper">
    <v-toolbar class="pink mb-2 elevation-1">
      <v-toolbar-title class="white--text">Assignment Tasks</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip outline label class="white--text">
        {{tasks.length}}
        Tasks
      </v-chip>
      <v-btn icon to="/create"><v-icon class="white--text">note_add</v-icon></v-btn>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card
      v-for="task in tasks" :key="task.id" 
      :class="{
        new: task.status === 'new',
        in_progress: task.status === 'in_progress',
        done: task.status === 'done',
        task: true,
        'mb-2': true
      }">
      <v-card-title><h3 class="title">{{task.title}}</h3></v-card-title>
      
      <v-card-text v-if="taskToExpand === task.id">
        <h6 class="subheading"><v-icon>description</v-icon> Description</h6>
        <p>{{task.description}}</p>

        <h6 class="subheading"><v-icon>show_chart</v-icon> Status</h6>
        <p>
          <v-chip  outline :class="{
              red: task.status === 'new',
              'red--text':task.status === 'new',
              orange: task.status === 'in_progress',
              'orange--text':task.status === 'in_progress',
              green: task.status === 'done',
              'green--text':task.status === 'done'
            }">
            {{task.status}}
          </v-chip>
          <span v-if="task.status === 'new'"><v-btn class="orange white--text" @click.native="startTask(task)">Start task</v-btn></span>
          <span v-if="task.status === 'in_progress'"><v-btn class="green white--text" @click.native="finishTask(task)">Finish task</v-btn></span>
        </p>

        <h6 class="subheading"><v-icon>date_range</v-icon>Date Created</h6>
        <p>{{task.created}}</p>
      </v-card-text>

      <v-card-actions>
        <span class="grey--text"><v-icon>date_range</v-icon> DEADLINE: {{ task.deadline }}</span>
        <v-spacer></v-spacer>

        <v-btn v-if="taskToExpand !== task.id" icon class="primary white--text" @click.native="taskToExpand = task.id">
          <v-icon dark>expand_more</v-icon>
        </v-btn>
        <v-btn v-if="taskToExpand === task.id" icon class="primary white--text" @click.native="taskToExpand = ''">
          <v-icon dark>expand_less</v-icon>
        </v-btn>

        <v-btn icon class="green white--text" @click.native="editTask(task)">
          <v-icon dark>edit</v-icon>
        </v-btn>

        <v-btn @click.native="showRemoveDialog(task)" class="red white--text" dark icon>
          <v-icon dark>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="!tasks.length">
      <v-card-text>
        <h3 class="headline">You have no tasks.</h3>
        <p>In the mean time you could use your time to research, socialise or dream big.</p>
      </v-card-text>
      <v-btn to="/create" class="primary"><v-icon class="white--text">note_add</v-icon>  Create New Task</v-btn>
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
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    data () {
      return {
        dialog: false,
        taskToDelete: {},
        taskToExpand: ''
      }
    },
    mounted () { this.$store.commit('getTasks') },
    computed: {
      tasks () {
        return this.$store.getters.tasks
      },
      alert () {
        return this.$store.getters.alert
      }
    },
    components: { SystemInformation },
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
