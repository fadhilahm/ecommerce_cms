<template>
  <div>
    <NavBar></NavBar>
    <div class="mt-3">
      <h4>Welcome back {{ this.$store.state.user.username }} !</h4>
      <hr />
    </div>
    <div class="container-fluid" id="base">
      <div class="row d-flex align-items-start" style="height : 80vh;">
        <div class="col-2 pt-4" id="left-side">
          <div class="list-group">
            <router-link
              to="/products"
              class="list-group-item list-group-item-action"
            >
              Products
            </router-link>
            <router-link
              to="/products/add"
              class="list-group-item list-group-item-action"
            >
              Add a Product
            </router-link>
          </div>
        </div>
        <div class="col-10" id="right-side">
          <router-view
            @add-product="addProduct"
            @fetch-data="fetchData"
            @delete-product="deleteProduct"
            @edit-product="editProduct"
            :productList="productList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import axios from "axios";
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
  name: "DashboardPage",
  components: {
    NavBar
  },
  data() {
    return {
      productList: []
    };
  },
  methods: {
    addProduct(payload) {
      this.$store.commit("SET_LOADING", true);
      let { name, image_url, price, stock } = payload;
      axios({
        method: "POST",
        url: "http://localhost:3000/products",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          name,
          image_url,
          price,
          stock
        }
      })
        .then(({ data }) => {
          Toast.fire({
            icon: "success",
            title: `Successfully added ${data.data.name}`
          });
        })
        .catch(({ response }) => {
          // conditional to check for admin
          if (this.$store.state.user.role === "admin") {
            response.data.msg.forEach(el => {
              Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
    fetchData() {
      axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.productList = data.data;
        })
        .catch(({ response }) => {
          Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        });
    },
    deleteProduct(payload) {
      let { id } = payload;
      this.$store.commit("SET_LOADING", true);
      axios({
        method: "DELETE",
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.fetchData();
        })
        .catch(({ response }) => {
          // conditional to check for admin
          if (this.$store.state.user.role === "admin") {
            response.data.msg.forEach(el => {
              Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
    editProduct(payload) {
      this.$store.commit("SET_LOADING", true);
      let { id, name, image_url, price, stock } = payload;
      axios({
        method: "PUT",
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          name,
          image_url,
          price,
          stock
        }
      })
        .then(({ data }) => {
          Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
        })
        .catch(({ response }) => {
          if (this.$store.state.user.role === "admin") {
            response.data.msg.forEach(el => {
              Toast.fire({
                icon: "error",
                title: el
              });
            });
          } else {
            Toast.fire({
              icon: "error",
              title: response.data.msg
            });
          }
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    }
  },
  created() {
    // this.fetchData();
  }
};
</script>

<style scoped>
#left-side {
  background-color: #407088;
  overflow: hidden;
  height: 100%;
}

#right-side {
  background-color: #ffb5b5;
  overflow: scroll;
  height: 100%;
}

.list-group-item {
  margin-top: 5px;
  margin-bottom: 5px;
}

#base {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
