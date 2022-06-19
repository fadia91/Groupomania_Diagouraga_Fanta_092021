<template>
  <section>
    <NavBar />

    <div class="container-fluid gedf-wrapper">
      <div class="row">
        <!--Profil de l'user connecté-->

        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <div class="h5">Bienvenue {{ user.username }} !</div>
              <div class="h7 text-muted">{{ user.job }}</div>
              <div class="h7">
                <div class="welcome">
                  <p>
                    Nous sommes heureux de vous accueillir dans la première
                    version du réseau social Groupomania. Ce nouvel outil nous
                    permettra d'améliorer la communication entre les services et
                    d'apprendre à nous connaître dans un cadre plus informel.
                  </p>

                  <br />
                  <p>
                    Dans cette première version, vous avez la possibilité de
                    partager des publications qui seront accessibles à tous.
                  </p>

                  <br />
                  <p>
                    L'équipe de developpement se tient a votre disposion en cas
                    de besoin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Profil de l'user connecté-->

        <!--CRéation et affichage des posts-->
        <div class="col-md-6 gedf-main">
          <!--- \\\\\\\Post-->
          <div class="card gedf-card">
            <form
              @submit="newPost()"
              enctype="multipart/form-data"
              method="post"
            >
              <div class="card-body">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="posts"
                    role="tabpanel"
                    aria-labelledby="posts-tab"
                  >
                    <div class="form-group">
                      <label class="sr-only" for="content">post</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Partagez..."
                        type="text"
                        v-model="content"
                        name="content"
                        id="content"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="images"
                    role="tabpanel"
                    aria-labelledby="images-tab"
                  >
                    <div class="form-group">
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="customFile"
                        />
                        <label class="custom-file-label" for="customFile"
                          >Upload image</label
                        >
                      </div>
                    </div>
                    <div class="py-4"></div>
                  </div>
                </div>
                <div class="btn-toolbar justify-content-between">
                  <div class="btn-group">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click.prevent="newPost"
                    >
                      <p>Publier</p>
                    </button>
                  </div>
                  <div class="btn-group">
                    <label for="image"
                      ><i class="btn btn-trans btn-icon fa fa-paperclip"></i
                    ></label>
                    <input
                      type="file"
                      class="btn btn-trans btn-icon fa fa-paperclip"
                      name="image"
                      id="image"
                      ref="image"
                      aria-describedby="image"
                      @change="selectFile()"
                      accept=".jpg, .jpeg, .gif, .png, .pdf"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Post /////-->

          <!--- \\\\\\\Post-->
          <div v-for="post in posts" :key="post.id">
            <div class="card gedf-card">
              <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="mr-2">
                      <img
                        class="rounded-circle"
                        width="45"
                        src="../assets/photo_provisoire.jpg"
                        alt=""
                      />
                    </div>
                    <div class="ml-2">
                      <div class="h5 m-0">@{{ post.user.username }}</div>
                      <div class="h7 text-muted">{{ post.user.job }}</div>
                    </div>
                  </div>
                  <div>
                    <div class="dropdown">
                      <button
                        class="btn btn-link"
                        type="button"
                        id="gedf-drop1"
                        v-bind="post"
                        @click.prevent="deletePost(post.id)"
                        v-if="user.is_admin == true || user.id == post.userId"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>

                      <button
                        class="btn btn-link"
                        type="button"
                        id="gedf-drop1"
                        v-bind="post"
                        @click.prevent="editPost(post.id)"
                        v-if="user.is_admin == true || user.id == post.userId"
                      >
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="text-muted h7 mb-2">
                  <i class="fa fa-clock-o">{{ post.createdAt }}</i>
                </div>

                <p class="card-text" v-if="post.content">
                  {{ post.content }}
                </p>

                <img
                  v-if="post.imageUrl"
                  :src="post.imageUrl"
                  class="card-img"
                  alt="image de la publication"
                  title="image de la publication"
                />
              </div>

              <div class="card-footer">
                <a
                  href="javascript:void(0)"
                  class="card-link"
                  v-bind:class="
                    getIfUserHasLiked(post.reactions) ? 'text-primaire' : ''
                  "
                  @click="liker(post.id, post.reactions)"
                  ><i class="fa fa-thumbs-up"></i>
                  {{ getNmberOfLikes(post.reactions) }}
                </a>
                <a
                  href="javascript:void(0)"
                  class="card-link"
                  v-bind:class="
                    getIfUserHasDisLiked(post.reactions) ? 'text-primaire' : ''
                  "
                  @click="disliker(post.id, post.reactions)"
                  ><i class="fa fa-thumbs-down"></i>
                  {{ getNmberOfDislikes(post.reactions) }}
                </a>
              </div>
            </div>
          </div>
          <!-- Post /////-->
        </div>
        <!--Fin de l'affichage des posts-->

        <!--Modification de post-->
        <div
          class="col-md-3"
          style="position: fixed; right: 0"
          v-if="editedPost"
        >
          <form @submit="newPost()" enctype="multipart/form-data" method="post">
            <div class="card-edit">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="posts"
                  role="tabpanel"
                  aria-labelledby="posts-tab"
                >
                  <div class="form-group">
                    <label class="sr-only" for="content">post</label>
                    <textarea
                      class="form-control"
                      rows="3"
                      placeholder=""
                      type="text"
                      v-model="this.editedPost.content"
                      name="content"
                      id="content"
                    ></textarea>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="images"
                  role="tabpanel"
                  aria-labelledby="images-tab"
                >
                  <div class="form-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                      />
                      <label class="custom-file-label" for="customFile"
                        >Upload image</label
                      >
                    </div>
                  </div>
                  <div class="py-4"></div>
                </div>
              </div>
              <div class="btn-group">
                <label for="image"
                  ><i class="btn btn-trans btn-icon fa fa-paperclip"></i
                ></label>
                <input
                  type="file"
                  class="btn btn-trans btn-icon fa fa-paperclip"
                  name="image"
                  id="image"
                  ref="image"
                  aria-describedby="image"
                  @change="selectFileUploadNewFile()"
                  accept=".jpg, .jpeg, .gif, .png, .pdf"
                />
              </div>
              <div class="btn-toolbar justify-content-between mt-4">
                <div class="btn-group">
                  <button
                    type="submit"
                    class="btn btn-block btn-primary"
                    @click.prevent="updatePost()"
                  >
                    <p>Modifier</p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!--Colum a définir-->
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

//import DetailsPost from "../components/DetailsPost.vue";
export default {
  name: "PostPage",

  components: {
    NavBar,
    //DetailsPost,
  },
  data() {
    return {
      content: "",
      editedPost: "",
      editedContent: "",
      user: "",
      token: "",
      users: [],
      posts: [],
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    selectFileUploadNewFile() {
      this.editedPost.image = this.$refs.image.files[0];
      this.editedPost.imageUrl = URL.createObjectURL(this.editedPost.image);
    },
    getNmberOfLikes(reactions) {
      const likes = reactions.filter((x) => x.type == 1);

      return likes.length;
    },
    getNmberOfDislikes(reactions) {
      const dislikes = reactions.filter((x) => x.type == -1);

      return dislikes.length;
    },
    editPost(id) {
      this.editedPost = this.posts.find((x) => x.id == id);
    },
    getIfUserHasLiked(reactions) {
      let result = reactions.map(
        (x) => x.userId == this.user.id && x.type == 1
      );
      if (result.length >= 1 && result[0] == true) {
        return true;
      }
      return false;
    },
    getIfUserHasDisLiked(reactions) {
      let result = reactions.map(
        (x) => x.userId == this.user.id && x.type == -1
      );
      if (result.length >= 1 && result[0] == true) {
        return true;
      }
      return false;
    },
    reactionRequest(postId, type) {
      let data = {
        postId: postId,
        type: type,
        userId: this.user.id,
      };
      axios
        .post("http://localhost:3000/api/reaction", data, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => {
          this.getPosts();
        })
        .catch((error) => (this.msgError = error));
    },
    async liker(postId, reactions) {
      if (this.getIfUserHasLiked(reactions)) {
        await this.reactionRequest(postId, 0);
        return;
      }
      if (this.getIfUserHasDisLiked(reactions)) {
        await this.reactionRequest(postId, 0);
      }
      await this.reactionRequest(postId, 1);
    },
    async disliker(postId, reactions) {
      if (this.getIfUserHasDisLiked(reactions)) {
        await this.reactionRequest(postId, 0);
        return;
      }
      if (this.getIfUserHasLiked(reactions)) {
        await this.reactionRequest(postId, 0);
      }
      await this.reactionRequest(postId, -1);
    },
    /*Créer une nouvelle publication*/
    async newPost() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("content", this.content);

      if (formData.get("content") === null) {
        this.error = "Message vide";
      } else {
        await axios
          .post("http://localhost:3000/api/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + this.token,
            },
          })
          .then(() => {
            this.$emit("postResponse");
            this.image = "";
            this.content = "";
            location.reload();
          })
          .catch((error) => (this.msgError = error));
      }
    },

    /**/
    async deletePost(id) {
      let confirmDeletePost = confirm(
        "voulez-vous vraiment supprimer votre publication ?"
      );

      if (confirmDeletePost == true) {
        await axios
          .delete(`http://localhost:3000/api/posts/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.posts.map((data) => data.id).indexOf(id);
            this.posts.splice(i, 1);
          });
      } else {
        return;
      }
    },

    updatePost() {
      const formData = new FormData();
      console.log(this.editedPost.image);
      formData.append("image", this.editedPost.image);
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("content", this.editedPost.content);

      if (formData.get("content") == "") {
        this.error = "Votre post ne peut pas être vide";
        alert(this.error);
      } else {
        axios
          .put(
            `http://localhost:3000/api/post/${this.editedPost.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" + this.token,
              },
            }
          )
          .then((res) => {
            alert(res.data.message);
            this.editedPost = "";
          })
          .catch((error) => (this.msgError = error));
        this.image = "";
        this.content = "";
      }
    },

    created() {
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      axios
        .get("http://localhost:3000/api/users", configHeaders)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Obtenir toutes les publications
    getPosts() {
      console.log(this.user);
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      axios
        .get("http://localhost:3000/api/posts", configHeaders)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getPosts();
    this.created();
  },
};
</script>


<style>
body {
  background-color: rgb(250, 250, 250);
  font-family: "Lato", sans-serif;
  font-family: "Yeon Sung", cursive;
  color: #4e5166;
}
.row {
  margin-top: 100px;
}

.h7 {
  font-size: 0.8rem;
}
.card-img {
  max-width: 100%;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}
a {
  text-decoration: none;
  color: #ffd7d7;
}
a:hover {
  color: #fd2d01;
}
.btn-group > input {
  display: none;
}
.btn-group p {
  color: white;
  margin-bottom: 0px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ffd7d7;
  border-radius: 20px;
  margin: 50px 0px 50px 0px;
  box-shadow: 5px 5px 5px hsl(240, 2%, 83%);
}
.card:hover {
  cursor: pointer;
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -10px;
  background-color: white;
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
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .show > .nav-link {
  color: #fd2d01;
}
.form-control {
  border: white 1px solid;
}
.welcome {
  padding-top: 20px;
  font-size: 16px;
}
.card-header {
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background: white;
  border-bottom: 1px solid #ffd7d7;
}
.card-edit {
  flex: 1 1 auto;
  padding: 1rem 1rem;
  border-radius: 20px;
  background-color: white;
  border: 1px solid #fd2d01;
  margin-top: 80px;
}
.card-footer {
  border-top: 1px solid #ffd7d7;
}
.btn-link {
  font-weight: 400;
  color: #4e5166;
  text-decoration: none;
}
.btn {
  color: #fd2d01;
}
.card-footer {
  background: white;
}
@media (min-width: 768px) {
  .col-md-6 {
    width: 50%;
    margin-left: 80px;
  }
}
@media (min-width: 768px) {
  .col-md-3 {
    flex: 0 0 auto;
    width: 35%;
  }
}
@media (min-width: 992px) {
  .gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .gedf-card {
    margin-bottom: 2.77rem;
  }
}

/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
</style>