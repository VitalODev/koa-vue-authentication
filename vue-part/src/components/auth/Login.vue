<template>
  <form>
    <p><b>email:</b><br>
      <input
        name="email"
        type="email"
        maxlength="30"
        v-model="email"
      >
    </p>

    <p><b>password:</b><br>
      <input
        name="password"
        type="password"
        maxlength="40"
        v-model="password"
      >
    </p>

    <button
      type="button"
      @click="onSubmit"
    >OK</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      if (!this.email || !this.password) {
        alert('Fill all the fields, please!')
        return
      }

      const user = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', user)
        .then(() => {
          if (this.$store.getters.isLoggedIn) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>
