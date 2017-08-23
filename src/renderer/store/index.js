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
    }
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
      state.tasks = api.getTasks()
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

    closeAlert (state) {
      state.alert = state.alert = {
        title: '',
        type: '',
        show: false
      }
    }
  },

  getters: {
    alert: (state) => state.alert
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
