import { createRouter, createWebHistory } from 'vue-router'
const LoginPage = () => import('./components/LoginPage.vue')
const RegisterPage = () => import('./components/RegisterPage.vue')
const PostPage = () => import('./components/PostPage.vue')
const DetailsPost = () => import('./components/DetailsPost.vue')
//const ProfilePage  = () => import('./components/ProfilePage.vue')



const routes = [
  { name: 'LoginPage', path: '/', component: LoginPage },
  { name: 'RegisterPage', path: '/register', component: RegisterPage },
  { name: 'PostPage', path: '/post', component: PostPage },
  { name: 'DetailsPost', path: '/detailspost', component: DetailsPost },
  //{ name: 'ProfilePage', path: '/profil', component: ProfilePage},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.logOut = ()=> {
  return router.push("/")
}
router.beforeEach((to) => {
  if (isLoginRequired(to)) {
    return router.push("/")
  }
  if (isTokenInCache() && to.path == "/") {
    return router.push("/post")
  }
})

function isLoginRequired(to) {
  if (to.path == "/"|| to.path== "/register") return false
  if (!isTokenInCache()) return true
  return false
}



function isTokenInCache() {
  return localStorage.getItem("token") != null
}


export default router