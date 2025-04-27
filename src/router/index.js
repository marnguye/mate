import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Find from '../views/Find.vue'
import About from '../views/About.vue'
=======
import HomeView from '../views/HomeView.vue'
import PostPage from '../views/PostPage.vue'
import FindPage from '../views/FindPage.vue'
>>>>>>> 22586b762a72a05de30e4bd5f1445db922b176be

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/about',
    name: 'About',
    component: About
=======
    name: 'home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'post',
    component: PostPage
  },
  {
    path: '/find',
    name: 'find',
    component: FindPage
>>>>>>> 22586b762a72a05de30e4bd5f1445db922b176be
  }
]

const router = createRouter({
<<<<<<< HEAD
  history: createWebHistory(),
=======
  history: createWebHistory(process.env.BASE_URL),
>>>>>>> 22586b762a72a05de30e4bd5f1445db922b176be
  routes
})

export default router
