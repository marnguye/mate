<template>
  <div class="about">
    <h1>About MATE</h1>
    <div class="about_content">
      <p>MATE is a platform designed to help people find roommates and shared accommodations.</p>
      <p>We believe that finding the right roommate can be a challenging task, and we are here to help you make it easier.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: var(--primary-color);
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.about_content {
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