import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookie'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    defense: Cookie.get('defense') || null
  },
  mutations: {
    setLogin (state, { token, email, defense }) {
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      Cookie.set('defense', defense, { expires: '1Y' })

      state.token = token
      state.email = email
      state.defense = defense
    },
    setLogout (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      Cookie.delete('defense')

      state.token = null
      state.email = null
      state.defense = null
    }
  },
  actions: {
    async login ({ commit }, { email, password }) {
      try {
        const user = await axios.post('/login', { email, password })

        if (user.data.info) {
          alert(user.data.info.message)
          return
        }

        const token = user.data.token
        const userEmail = user.data.email
        const defense = user.data.defense

        commit('setLogin', { token, email: userEmail, defense })
      } catch (err) {
        alert('There\'s something wrong with the connect')
      }
    },
    async registration ({ commit }, { email, password }) {
      try {
        const user = await axios.post('/registration', { email, password })

        if (user.data.info) {
          alert(user.data.info.message)
          return
        }

        const token = user.data.token
        const userEmail = user.data.email
        const defense = user.data.defense

        commit('setLogin', { token, email: userEmail, defense })
      } catch (err) {
        alert('There\'s something wrong with the connect')
      }
    },
    async guard (context) {
      try {
        const guard = await axios.post(
          '/guard',
          { defense: Cookie.get('defense') },
          { headers:
            { Authorization: 'Bearer ' +
              localStorage.getItem('token') }
          }
        )

        if (guard.data == this.state.email) {
          return true
        }

        if (guard.data.info) {
          alert(guard.data.info.message)
        }

        return false
      } catch (err) {
        alert('There\'s something wrong with the connect')
      }
    },
    logout ({ commit }) {
      commit('setLogout')
    }
  },
  getters: {
    isLoggedIn (state) {
      return (!!state.token && !!state.defense)
    }
  }
})
