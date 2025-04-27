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
