<template>
 <div>
    <p>{{ alert.message }}</p>
    <v-btn flat to='/' flat><v-icon>chevron_left</v-icon> Back</v-btn>
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
            prepend-icon="description">
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
          <v-text-field
            label="Deadline"
            v-model="task.deadline">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
           <v-btn @click.native="createTask" class="primary" block>Create Task</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      alert () { return this.$store.getters.alert }
    },
    data () {
      return {
        task: {
          title: '',
          description: '',
          status: 'new',
          deadline: ''
        },

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
      }
    }
  }
</script>

