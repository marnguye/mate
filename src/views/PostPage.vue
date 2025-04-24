<template>
  <div class="post_page">
    <h1>Post a New Room</h1>
    <div class="post_form">
      <p>This is the post page where users can create new room listings.</p>
      <!-- Form content will go here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostPage'
}
</script>

<style scoped>
.post_page {
  padding: 120px 20px 20px;
  background-color: var(--primary-color);
  min-height: 100vh;
}

.post_form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style> 