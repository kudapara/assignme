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
    taskToUpdate: null,
    authUser: null,
    isThereUser: false
  },
  mutations: {
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
      state.tasks[state.tasks.findIndex(x => x.id === task.id)].status = 'in_progress'
      state.alert = {
        title: 'successfullt started task',
        type: 'info',
        show: true
      }
    },

    finishTask (state, task) {
      state.tasks[state.tasks.findIndex(x => x.id === task.id)].status = 'done'
      state.alert = {
        title: 'successfully finished task',
        type: 'info',
        show: true
      }
    },

    setTaskToUpdate (state, task) {
      state.taskToUpdate = task
    },

    clearTaskToUpdate (state) {
      state.taskToUpdate = null
      state.alert = {
        title: 'successfully updated task',
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
    taskToUpdate: (state) => state.taskToUpdate
  },

  // asynchronous code here
  actions: {
    getTasks () {
      ipcRenderer.send('get-tasks')
    },
    removeTask ({ commit }, task) {
      ipcRenderer.send('remove-task', task.id)
    },
    startTask ({ commit }, task) {
      ipcRenderer.send('update-task-status', { task, status: 'in_progress' })
    },
    finishTask ({ commit }, task) {
      ipcRenderer.send('update-task-status', { task, status: 'done' })
    },
    updateTask ({ commit }, task) {
      ipcRenderer.send('update-task', task)
    },
    createTask ({ state }, task) {
      task.id = Math.random()
      task.created = new Date()
      task.createdBy = state.authUser
      ipcRenderer.send('create-task', task)
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

ipcRenderer.on('updated-task-status', (event, { task, status }) => {
  let mutation
  if (status === 'in_progress') {
    mutation = 'startTask'
  } else if (status === 'done') {
    mutation = 'finishTask'
  }
  store.commit(mutation, task)
})

ipcRenderer.on('updated-task', (event, task) => {
  store.commit('clearTaskToUpdate', task)
})

ipcRenderer.on('created-task', (event, task) => {
  store.commit('showAlert', {
    title: 'successfully created task',
    type: 'info',
    show: true
  })
})
export default store
