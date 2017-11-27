<template>
 <div>
   <!-- Show dialog adking user to confirm if he/she really wants to delete the task -->
   <AppConfirmDeleteTask
    :show="showDialog"
    :taskToDelete="taskToDelete"
    @close="showDialog = false; taskToDelete = {};">
    </AppConfirmDeleteTask>

    <section id="cd-timeline" class="cd-container" v-if="displayTasks.length">
      <div class="cd-timeline-block" v-for="task in displayTasks" :key="task.id" >
        <div :class="{
        new: task.status === 'new',
        in_progress: task.status === 'in_progress',
        done: task.status === 'done',
        task: true,
        'cd-timeline-img': true}">
        </div>

        <div class="cd-timeline-content">
          <h3 class="title">{{task.title}}
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
          </h3>
          <pre>{{task.description}}</pre>

          <v-btn small fab class="cd-read-more  white--text" @click.native="taskToDelete = task; showDialog = true;">
            <v-icon class="red--text">delete</v-icon>
          </v-btn>
          <v-btn small fab class="cd-read-more white--text" @click.native="editTask(task)">
            <v-icon class="green--text">edit</v-icon>
          </v-btn>
         
          <v-btn v-if="task.status === 'new'" class="cd-read-more orange white--text" @click.native="startTask(task)">Start task</v-btn>
          <v-btn v-if="task.status === 'in_progress'" class="cd-read-more green white--text" @click.native="finishTask(task)">Finish task</v-btn>
          <v-btn v-if="task.status === 'done'" class="cd-read-more orange white--text" @click.native="startTask(task)">Restart task</v-btn>
          <span class="cd-date"><b>Due {{task.deadline | niceDate}}</b></span>
        </div>
      </div>
  
  </section>
 </div>
</template>

<script>
  import taskMixin from '@/components/mixins/tasks'
  import AppConfirmDeleteTask from '@/components/AppConfirmDeleteTask'

  export default {
    name: 'AppTaskTimeline',
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
  @import './timeline.css';
  pre {
    font: inherit;
  }
</style>
