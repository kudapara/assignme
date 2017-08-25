import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

function checkAuth (from, to, next) {
  if (store.getters.authUser !== null) {
    next()
  } else { next('/signin') }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage'),
      beforeEnter: checkAuth
    },
    {
      path: '/create',
      name: 'create-task',
      component: require('@/components/CreateTask'),
      beforeEnter: checkAuth
    },
    {
      path: '/signin',
      name: 'signin-page',
      component: require('@/components/SignInPage')
    },
    {
      path: '/signup',
      name: 'signup-page',
      component: require('@/components/SignUpPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
