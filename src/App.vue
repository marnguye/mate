<template>
  <div id="app">
    <Header />
<<<<<<< HEAD
    <main>
      <router-view></router-view>
    </main>
=======
    <Card />
>>>>>>> 22586b762a72a05de30e4bd5f1445db922b176be
  </div>
</template>

<script>
<<<<<<< HEAD
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
</style>
=======
import Header from './views/Header.vue'
import Card from './views/Card.vue'
import PostPage from './views/PostPage.vue'
export default {
  name: 'App',
  components: {
    Header,
    Card,
    PostPage
  }
}
</script>
>>>>>>> 22586b762a72a05de30e4bd5f1445db922b176be
