<template>
  <div id="landing-page">
    <div class="container-fluid d-flex px-0" id="back">
      <div id="left">
        <div
          id="left-masking"
          class="d-flex justify-content-center align-items-center"
        >
          <div id="left-board">
            <h1>Welcome to TCG CMS</h1>
          </div>
        </div>
      </div>
      <div id="right" class="d-flex justify-content-center align-items-center">
        <div v-if="isLoading">
          <Loading></Loading>
        </div>
        <div v-else>
          <LandingRegister
            v-if="isRegistering"
            @change-to-login="changeToLogin"
            @register-user="registerUser"
          ></LandingRegister>
          <LandingLogin
            v-else
            @change-to-register="changeToRegister"
            @login-user="loginUser"
          ></LandingLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingRegister from "@/components/LandingRegister";
import LandingLogin from "@/components/LandingLogin";
import Loading from "@/components/Loading";
import axios from "axios";
export default {
  name: "LandingPage",
  components: {
    LandingRegister,
    LandingLogin,
    Loading
  },
  data() {
    return {
      isRegistering: true
    };
  },
  methods: {
    changeToLogin() {
      this.isRegistering = false;
    },
    changeToRegister() {
      this.isRegistering = true;
    },
    registerUser(data) {
      this.$store.commit("SET_LOADING", true);
      let { email, password, username } = data;
      this.$;
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email,
          password,
          username
        }
      })
        .then(() => {
          this.loginUser({
            email,
            password
          });
        })
        .catch(err => {
          console.log(err.response);
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
    loginUser(data) {
      this.$store.commit("SET_LOADING", true);
      let { email, password } = data;
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.data.token);
          this.$store.commit("SET_USER", {
            email,
            password,
            username: data.data.username,
            role: data.data.role
          });
          this.$store.commit("SET_IS_LOGGED_IN", true);
          this.$router.push({ name: "DashboardPage" });
        })
        .catch(err => {
          console.log(err.response);
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
#landing-page {
  height: 100vh;
}

#left {
  background-image: url("https://media.magic.wizards.com/images/featured/EN_WorldMagicCupQualifier_Header_0.jpg");
  width: 70%;
}

#left-masking {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

#right {
  background-color: white;
  width: 30%;
  height: 100%;
}

#back {
  height: 100%;
}

#left-board {
  color: white;
}
</style>
