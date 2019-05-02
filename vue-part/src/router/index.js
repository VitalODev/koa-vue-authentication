import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Auth from '../components/Auth'
import Protected from '../components/Protected'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/protected',
      component: Protected,
      beforeEnter: (to, from, next) => {
        Store.dispatch('guard')
          .then(guard => {
            if (guard) next()
            next(false)
          })
          .catch()
      }
    }
  ]
})
