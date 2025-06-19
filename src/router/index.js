import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Find from '../views/Find.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import { getSupabaseClient } from '@/lib/supabase'

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  console.log('Navigating to:', to.path);
  const { requiresAuth } = to.meta;
  const supabase = getSupabaseClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('User in navigation guard:', user);

    if (requiresAuth && !user) {
      console.log('Redirecting to /register (requires auth, but user is null).');
      return '/register'; // Redirect to register if auth is required and user is not logged in
    } else if (!requiresAuth && user && (to.path === '/register' || to.path === '/login')) { // Assuming you might have a /login route later
       console.log('Redirecting to /account (user is logged in, but trying to access register/login).');
       return '/account'; // Redirect logged-in users away from register/login pages
    }
  } catch (error) {
    console.error('Error in navigation guard:', error);
    // Decide how to handle errors in the guard - perhaps show a generic error page or redirect
    // For now, letting the navigation proceed might reveal the underlying issue.
  }

  // Continue with navigation
  return true;
});

export default router
