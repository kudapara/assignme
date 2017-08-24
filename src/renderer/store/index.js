import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    alert: {
      title: '',
      type: 'info', // Either error, info or warning
      show: false
    },
    taskToEdit: null,
    authUser: null
  },
  mutations: {
    addTask (state, payload) {
      payload.id = Math.random()
      payload.created = new Date()
      api.createTask(payload)
      state.alert = {
        title: 'successfully created task',
        type: 'info',
        show: true
      }
    },

    getTasks (state) {
      let tasks = []
      Object.assign(tasks, api.getTasks())
      state.tasks = tasks
    },

    removeTask (state, task) {
      api.removeTask(task.id)
      state.tasks.splice(state.tasks.findIndex(x => x.id === task.id), 1)
      state.alert = {
        title: 'successfully removed task',
        type: 'info',
        show: true
      }
    },

    startTask (state, task) {
      api.startTask(task.id)
      state.alert = {
        title: 'successfullt started task',
        type: 'info',
        show: true
      }
    },

    finishTask (state, task) {
      api.finishTask(task.id)
      state.alert = {
        title: 'successfully finished task',
        type: 'info',
        show: true
      }
    },

    setTaskToEdit (state, task) {
      state.taskToEdit = task
    },

    editTask (state, task) {
      api.editTask(task)
      state.taskToEdit = null
      state.alert = {
        title: 'successfully edited task',
        type: 'info',
        show: true
      }
    },

    closeAlert (state) {
      state.alert = state.alert = {
        title: '',
        type: '',
        show: false
      }
    },

    signIn (state, user) {
      if (api.signIn(user) === true) {
        state.authUser = user.username
        state.alert = {
          title: 'successfully signed in',
          type: 'info',
          show: true
        }
      } else {
        state.authUser = null
        state.alert = {
          title: 'Error signing in',
          type: 'error',
          show: true
        }
      }
    },

    signOut (state) {
      state.authUser = null
      state.alert = {
        title: 'successfully signed out',
        type: 'info',
        show: true
      }
    }
  },

  getters: {
    alert: (state) => state.alert,
    authUser: (state) => state.authUser,
    tasks: (state) => state.tasks,
    taskToEdit: (state) => state.taskToEdit
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
