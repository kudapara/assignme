<template>
  <div>
    <v-card class="mb-3 overdue tasks">
      <v-list subheader>
        <v-subheader><v-icon>timelapse</v-icon> Overdue Tasks</v-subheader>
          <v-list-tile avatar v-for="task in tasks" v-bind:key="task.title" @click="task.active = true">
            <v-list-tile-avatar>
              <v-icon class="red--text">fiber_manual_record</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="task.title"></v-list-tile-title>
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
                  <v-list-tile @click.native="$emit('startTask', task)">
                    <v-list-tile-title class="text-xs-center">Start Task</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile @click.native="$emit('editTask', task)">
                    <v-list-tile-avatar>
                      <v-icon>edit</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile @click.native="$emit('deleteTask', task)">
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
  export default {
    name: 'AppOverdueTasks',
    props: {
      tasks: Array
    }
  }
</script>

<style scoped>
  .overdue.tasks {
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: red;
  }
</style>
