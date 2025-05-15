<template>
  <div class="find_page">
    <h1>Find a Roommate</h1>
    <p>Browse through available rooms and find your perfect roommate.</p>
  </div>
</template>

<script>
export default {
  name: 'Find'
}
</script>

<style scoped>
.find_page {
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
