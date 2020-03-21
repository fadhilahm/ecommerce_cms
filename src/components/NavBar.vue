<template>
  <div class="navbar navbar-expand bg-dark navbar-dark">
    <div class="container-fluid d-flex justify-content-between">
      <a href="/" class="navbar-brand">TCG CMS</a>
      <button type="button" class="btn btn-danger" @click="logOut">
        Log out
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "NavBar",
  methods: {
    logOut() {
      localStorage.clear();
      this.$store.commit("SET_IS_LOGGED_IN", false);
      this.$router.push({ path: "/login" });
      Toast.fire({
          icon : "success",
          title : "Logged out successfully"
      })
    }
  }
};
</script>

<style></style>
