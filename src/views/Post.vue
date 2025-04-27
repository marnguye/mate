<template>
  <div class="post_page">
    <h1>Post a Room</h1>
    <p>This is where you can post your room for others to find.</p>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style scoped>
.post_page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
}
</style> 