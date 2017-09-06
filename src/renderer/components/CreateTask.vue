<template>
 <div>
    <v-container class="px-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            label="Title"
            v-model="task.title"
            prepend-icon="person">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            label="Description"
            v-model="task.description"
            prepend-icon="description"
            multi-line>
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <p><v-icon>show_chart</v-icon> Status</p>
          <v-layout row wrap>
            <v-radio label="New" v-model="task.status" value="new" class="green--text ml-5"></v-radio>
            <v-radio label="In Progress" v-model="task.status" value="in_progress" class="orange--text"></v-radio>
          </v-layout>
        </v-flex>

        <v-flex xs12 sm6>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="dateMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-left="40"
              max-width="290px"
            >
            <v-text-field
              slot="activator"
              label="Due date"
              v-model="task.deadline"
              prepend-icon="event"
              readonly>
            </v-text-field>
            
            <v-date-picker v-model="task.deadline" scrollable >
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click.native="cancel()" class="orange--text darken-3">Cancel</v-btn>
                  <v-btn primary @click.native="save()" class="green">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="timeMenu"
            transition="scale-transition"
            offset-y
            :nudge-left="40"
          >
          <v-text-field
            slot="activator"
            label="Due time"
            v-model="task.deadlineTime"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="task.deadlineTime" autosave format="24hr"></v-time-picker></v-menu>
        </v-flex>

        <v-flex xs12>
           <v-btn v-if="!isUpdate" @click.native="createTask" class="primary" block>Create Task</v-btn>
           <v-btn v-else @click.native="updateTask" class="green white--text" block>Update Task</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    computed: {

      alert () { return this.$store.getters.alert },
      isUpdate () {
        const isUpdate = this.taskToUpdate !== null
        if (isUpdate) { Object.assign(this.task, this.taskToUpdate) }
        return isUpdate
      },
      taskToUpdate () { return this.$store.getters.taskToUpdate }
    },
    data () {
      return {
        task: {
          title: '',
          description: '',
          status: 'new',
          deadline: moment().format('YYYY-MM-DD'),
          deadlineTime: '10:00'
        },
        e3: null,
        dateMenu: false,
        timeMenu: false,

        defaultTask: {
          title: '',
          description: '',
          status: 'new',
          deadline: moment().format('YYYY-MM-DD'),
          deadlineTime: '10:00'
        }
      }
    },
    methods: {
      createTask () {
        this.task.deadline = this.formatDate()
        this.$store.commit('addTask', this.task)
        this.task = this.defaultTask
        this.$router.push('/')
      },

      updateTask () {
        this.task.deadline = this.formatDate()
        this.$store.dispatch('updateTask', this.task)
        this.task = this.defaultTask
        this.$router.push('/')
      },
      formatDate () {
        return moment(this.task.deadline).add(this.task.deadlineTime.split('').splice(0, 2).join(''), 'hours')._d
      }
    }
  }
</script>

