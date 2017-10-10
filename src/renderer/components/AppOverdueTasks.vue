<template>
  <div>
    <!-- Show dialog adking user to confirm if he/she really wants to delete the task -->
    <AppConfirmDeleteTask
      :show="showDialog"
      :taskToDelete="taskToDelete"
      @close="showDialog = false; taskToDelete = {};">
    </AppConfirmDeleteTask>

    <v-card class="mb-3 overdue tasks">
      <v-list subheader>
        <v-subheader><v-icon>timelapse</v-icon> Overdue Tasks</v-subheader>
          <v-list-tile avatar v-for="task in overdueTasks" v-bind:key="task.title">
            <v-list-tile-avatar>
              <v-icon class="red--text">fiber_manual_record</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="task.title"></v-list-tile-title>
              <v-list-tile-sub-title>{{ task.deadline | niceDate }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-menu
                origin="center center"
                offset-x="10"
                transition="scale-transition"
                bottom>

                <v-btn icon  slot="activator">
                  <v-icon style="gray--text">more_vert</v-icon>
                </v-btn>
                <v-list >
                  <v-list-tile @click.native="startTask(task)">
                    <v-list-tile-title class="text-xs-center">Start Task</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile @click.native="editTask(task)">
                    <v-list-tile-avatar>
                      <v-icon>edit</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile @click.native="taskToDelete = task; showDialog = true;">
                    <v-list-tile-avatar>
                      <v-icon>remove</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Delete Task</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>

            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    </v-card>
  </div>
</template>

<script>
  import taskMixin from '@/components/mixins/tasks'
  import AppConfirmDeleteTask from '@/components/AppConfirmDeleteTask'

  export default {
    name: 'AppOverdueTasks',
    data () {
      return {
        showDialog: false
      }
    },
    mixins: [taskMixin],
    components: { AppConfirmDeleteTask }
  }
</script>

<style scoped>
  .overdue.tasks {
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: red;
  }
</style>
