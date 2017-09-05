import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import api from '../api'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: [],
    alert: {
      title: '',
      type: 'info', // Either error, info or warning
      show: false
    },
    taskToEdit: null,
    authUser: null,
    isThereUser: false
  },
  mutations: {
    addTask (state, payload) {
      payload.id = Math.random()
      payload.created = new Date()
      payload.createdBy = state.authUser
      api.createTask(payload)
      state.alert = {
        title: 'successfully created task',
        type: 'info',
        show: true
      }
    },

    setTasks (state, tasks) {
      state.tasks = tasks
    },

    removeTask (state, task) {
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

    showAlert (state, payload) {
      state.alert = payload
      state.alert.show = true
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
    },

    signUp (state, user) {
      api.signUp(user)
      state.authUser = user.username
      state.alert = {
        title: 'successfully created account' + user.name,
        type: 'info',
        show: true
      }
    },

    checkForUser (state) {
      if (api.checkForUser()) {
        state.isThereUser = true
      }
    }
  },

  getters: {
    alert: (state) => state.alert,
    authUser: (state) => state.authUser,
    isThereUser: (state) => state.isThereUser,
    tasks: (state) => state.tasks,
    taskToEdit: (state) => state.taskToEdit
  },

  // asynchronous code here
  actions: {
    getTasks () {
      ipcRenderer.send('get-tasks')
    },
    removeTask ({ commit }, task) {
      ipcRenderer.send('remove-task', task.id)
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

ipcRenderer.on('all-tasks', (event, tasks) => {
  store.commit('setTasks', tasks)
})

ipcRenderer.on('removed-task', (event, id) => {
  store.commit('removeTask', { id })
})
export default store
