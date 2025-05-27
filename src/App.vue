<template>
  <div id="app">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Card from './views/Card.vue'
import Post from './views/Post.vue'
import { defineComponent } from 'vue'

export default defineComponent({ 
  name: 'App',
  components: {
    Header,
    Card,
    Post
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  background-attachment: fixed;
  overflow: hidden;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  overflow: hidden;
  position: relative;
  background: var(--secondary-color);
  background-attachment: fixed;
}
</style>
