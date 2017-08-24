<template>
  <div>
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
          <span v-if="task.status === 'done'"><v-btn class="red white--text" @click.native="restartTask(task)">Restart task</v-btn></span>
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
  </div>
</template>

<script>
export default {
  name: 'AppTaskList',
  props: {
    tasks: Array
  },
  data () {
    return {
      taskToExpand: ''
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.tasks
    },
    alert () {
      return this.$store.getters.alert
    }
  },
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
    restartTask (task) {
      this.$store.commit('restartTask', task)
    },
    editTask (task) {
      this.$store.commit('setTaskToEdit', task)
      this.$router.push('/create')
    }
  }
}
</script>
