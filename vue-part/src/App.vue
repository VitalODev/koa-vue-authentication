<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <span>Home</span>
      </router-link>

      <router-link to="/protected">
        <span id="protected">Protected resource</span>
      </router-link>

      <router-link to="/auth" v-if="!isLoggedIn">
        <span>Auth</span>
      </router-link>

      <span v-if="isLoggedIn" @click="logout">Out</span>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')

      this.$router.push('/')
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }

  span {
    font-size: 2em;
    padding: 10px;
    color: #c5e1a5;
    background: #009688;
    cursor: pointer;
  }

  #nav a {
    padding-top: 10px;
  }

  #nav {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
