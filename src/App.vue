<template>
  <div id="app">
    <Header />
    <Card />
  </div>
</template>

<script>
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
