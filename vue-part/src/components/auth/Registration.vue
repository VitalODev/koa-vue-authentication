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

    <p><b>repeat password:</b><br>
      <input
        name="repeat-password"
        type="password"
        maxlength="40"
        v-model="repeatPassword"
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
  name: 'Registration',
  data () {
    return {
      email: null,
      password: null,
      repeatPassword: null
    }
  },
  methods: {
    onSubmit () {
      if (!this.email || !this.password || !this.repeatPassword) {
        alert('Fill all the fields, please')
        return
      }

      if (this.password != this.repeatPassword) {
        alert('passwords don\'t match')
        return
      }

      const user = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('registration', user)
        .then(() => {
          if (this.$store.getters.isLoggedIn) {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>
