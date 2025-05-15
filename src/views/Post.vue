<template>
  <div class="post">
    <h1>Post a New Room</h1>
    <div class="post_form">
      <p>This is the post page where users can create new room listings.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style scoped>
.post {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: var(--primary-color);
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.post_form {
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #2A7B9B;
}
</style> 