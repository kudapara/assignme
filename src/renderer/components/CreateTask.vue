<template>
 <div>
    <v-btn flat @click.native="goBack"><v-icon>chevron_left</v-icon> Back</v-btn>
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

        <v-flex xs12>
          <v-dialog persistent v-model="modal" lazy full-width>
            <v-text-field
              slot="activator"
              label="Picker in dialog"
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
          </v-dialog>
        </v-flex>

        <v-flex xs12>
           <v-btn v-if="!isEdit" @click.native="createTask" class="primary" block>Create Task</v-btn>
           <v-btn v-else @click.native="editTask" class="green white--text" block>Update Task</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      alert () { return this.$store.getters.alert },
      isEdit () {
        const isEdit = this.taskToEdit !== null
        if (isEdit) { Object.assign(this.task, this.taskToEdit) }
        return isEdit
      },
      taskToEdit () { return this.$store.getters.taskToEdit }
    },
    data () {
      return {
        task: {
          title: '',
          description: '',
          status: 'new',
          deadline: ''
        },
        e3: null,
        modal: false,

        defaultTask: {
          title: '',
          description: '',
          status: 'new',
          deadline: ''
        }
      }
    },
    methods: {
      createTask () {
        this.$store.commit('addTask', this.task)
        this.task = this.defaultTask
        this.$router.push('/')
      },

      editTask () {
        this.$store.commit('editTask', this.task)
        this.task = this.defaultTask
        this.$router.push('/')
      },

      goBack () {
        // whenever you leave the create task window, cleat the taskToEdit
        // so that when a new task is going to be created there will be no problem
        this.$store.commit('setTaskToEdit', null)
        this.$router.push('/')
      }
    }
  }
</script>

