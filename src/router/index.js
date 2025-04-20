import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/Post.vue')
  },
  {
    path: '/find',
    name: 'Find',
    component: () => import('@/views/Find.vue')
  }
]
