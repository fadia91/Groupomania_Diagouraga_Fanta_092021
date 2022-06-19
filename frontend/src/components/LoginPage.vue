<template>
  <!-- Section: Design Block -->
  <section class="">
    <!-- Jumbotron -->
    <div
      class="px-4 py-5 px-md-5 text-center text-lg-start"
      style="background-color: white"
    >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-0.5 fw-bold ls-tight text-tertiaire">
              Groupomania <br />
              <span class="text-primaire"
                >Partagez et restez en contact avec votre team.</span
              >
            </h1>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
              <div class="card-body py-5 px-md-5">
                <form @submit.prevent="handleSubmit()">
                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      placeholder="Adresse mail"
                      id="form3Example3"
                      class="form-control"
                      v-model="email"
                    />
                    <label class="form-label" for="form3Example3"></label>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      id="form3Example4"
                      class="form-control"
                      v-model="password"
                    />
                    <label class="form-label" for="form3Example4"></label>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn  btn-primary text-secondaire btn-block mb-4">
                    Se connecter
                  </button>

                  <div>
                    <p class="mb-0">
                      Tu n'as pas encore de compte?
                      <a href="./register" class="text-black-50 fw-bold"
                        >Créer un compte</a
                      >
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
  </section>
  <!-- Section: Design Block -->
</template>

<style>
.bg-image-vertical {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
}
.btn-primary {
  color: #fff;
  background: linear-gradient(to left, #fd2d01, #ffd7d7);
  border-color: white;
}
.btn-primary:hover,
btn-primary:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  border-color: white;
}

@media (min-width: 1025px) {
  .h-custom-2 {
    height: 100%;
  }
}
</style>


<script>
import axios from "axios";
export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: this.email,
        password: this.password,
      });
       
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("is_admin", response.data.is_admin);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      this.$router.push("http://localhost:8080/post");
      //console.log(response);
    },
  },
};
</script>