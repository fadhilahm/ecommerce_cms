<template>
  <form @submit.prevent="sendToLanding">
    <h1>New Here?</h1>
    <hr />
    <div class="form-group">
      <input type="email" placeholder="Insert email" v-model="email" />
    </div>
    <div class="form-group">
      <input type="password" placeholder="Insert password" v-model="password" />
    </div>
    <div class="form-group">
      <input type="text" placeholder="Insert username" v-model="username" />
    </div>
    <input type="submit" class="btn btn-primary" value="Register" />
    <hr />
    <a href="javascript:;" @click="changeToLogin">Already have an account?</a>
  </form>
</template>

<script>
export default {
  name: "LandingRegister",
  data() {
    return {
      email: null,
      password: null,
      username: null
    };
  },
  methods: {
    changeToLogin() {
      this.$emit("change-to-login");
    },
    sendToLanding() {
      this.$emit("register-user", {
        email: this.email,
        password: this.password,
        username: this.username
      });
    }
  }
};
</script>

<style scoped></style>
