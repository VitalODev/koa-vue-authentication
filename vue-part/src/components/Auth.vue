<template>
  <div id="forms">
    <div>
      <div class="menu" :class="{ active: isLoginVisible }" @click="login">
        Log in
      </div>

      <div class="menu" :class="{ active: isRegistrationVisible }" @click="registration">
        Registration
      </div>
    </div>

    <div class="form">
      <Login v-if="isLoginVisible"></Login>
      <Registration v-if="isRegistrationVisible"></Registration>
    </div>
  </div>
</template>

<script>
import Login from './auth/Login'
import Registration from './auth/Registration'

export default {
  name: 'Auth',
  components: { Login, Registration },
  data () {
    return {
      form: null
    }
  },
  computed: {
    isLoginVisible () {
      return this.form == 'login'
    },
    isRegistrationVisible () {
      return this.form == 'registration'
    }
  },
  methods: {
    login () {
      this.form = 'login'
    },
    registration () {
      this.form = 'registration'
    }
  }
}
</script>

<style scoped>
  .form {
    margin-top: 20px;
  }

  .menu {
    font-size: 2em;
    text-align: center;
    margin-bottom: 10px;
    background: #aaaaaa;
    color: #ffffff;
    cursor: pointer;
  }

  .active {
    color: #009688;
  }

  #forms {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
  }
</style>
