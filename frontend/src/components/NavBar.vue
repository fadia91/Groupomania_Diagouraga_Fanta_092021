<template>
  <section>
    <nav>
      <div class="m-4">
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white">
          <div class="container-fluid">
            <a href="#" class="navbar-brand">
              <img src="../assets/gr.png" alt="logo de groupomania" width="250px" height="90px">
            </a>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav">
                <a href="#" class="nav-item nav-link active"
                  ><i class="fa fa-home"></i
                ></a>
                <a href="#" class="nav-item nav-link active"
                  ><i class="fa fa-gears"></i
                ></a>
                <a href="#" class="nav-item nav-link active"
                  ><i class="fa fa-users"></i
                ></a>
              </div>
              <div class="navbar-nav ms-auto">
                <a @click.prevent="logout" href="#" class="nav-item nav-link active"
                  ><i class="material-icons">&#xE8AC;</i></a
                >
              </div>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "NavBar",

  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .show > .nav-link {
  padding-left: 50px;
  font-size: 30px;
}
.navbar-light .navbar-toggler {
    color: #FD2D01;
    border-style: solid;
}
.navbar-brand img {
  width: 250px;
  height: 90px;
}

</style>