<template>
    <div class="header">
        <router-link to="/about" class="logo">MATE</router-link>
        <div class="nav-buttons">
            <router-link to="/" class="nav-button" title="Find">
                <i class="fas fa-search"></i>
            </router-link>
            <router-link to="/post" class="nav-button" title="Post">
                <i class="fas fa-plus"></i>
            </router-link>
            <router-link to="/register" class="nav-button" title="Register">
                <i class="fas fa-user"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: var(--primary-color);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: #2A7B9B;
    transition: color 0.3s ease;
}

.logo:hover {
    color: #5AED97;
}

.nav-buttons {
    display: flex;
    gap: 16px;
}

.nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    color: #2A7B9B;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-button i {
    font-size: 18px;
}

.nav-button:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #5AED97;
}
</style>
