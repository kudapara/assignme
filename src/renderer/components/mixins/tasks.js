import moment from 'moment'

function data () {
  return {
    // set this to the task that is about to be deleted
    // its values will be used by the AppConfimDeleteTask
    taskToDelete: {}
  }
}

const computed = {
  // the current status of tasks being show.
  // either new, in_progress or done
  taskStatus () {
    return this.$store.getters.taskStatus
  },

  // the tasks that should be rendered on the lists
  // depends on the current taskStatus
  displayTasks () {
    return this[`${this.taskStatus}Tasks`]
  },

  // if this is called it returns a list of all the tasks
  allTasks () {
    return this.$store.getters.tasks
  },

  // returns all the tasks that havent started
  idleTasks () {
    return this.allTasks
      .filter(task => !moment().isAfter(task.deadline) && task.status === 'new')
  },

  // returns all the tasks that have started but are not finished
  startedTasks () {
    return this.allTasks
      .filter(task => task.status === 'in_progress')
  },

  // returns all the completed tasks
  finishedTasks () {
    return this.allTasks
      .filter(task => task.status === 'done')
  },

  // returns all the overdue tasks
  overdueTasks () {
    return this.allTasks
      .filter(task => moment().isAfter(task.deadline) && task.status === 'new')
  }
}

const methods = {
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
}

const filters = {
  // formats the date of the task to read more humanly
  // instead of 23/01/2017 we get 'in 2 weeks'
  niceDate (value) {
    return moment().to(value)
  }
}

export default {
  data,
  computed,
  methods,
  filters
}
