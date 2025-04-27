<template>
    <div id="header_container">
        <router-link to="/about" id="logo_icon">MATE</router-link>
        <div id="button_icons">
            <router-link to="/post" id="post_icon">POST</router-link>
            <router-link to="/" id="find_icon">FIND</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
#header_container {
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

#logo_icon {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    background-color: var(--primary-color);
    text-decoration: none;
    color: var(--secondary-color);
}

#button_icons {
    display: flex;
    gap: 20px;
    background-color: var(--primary-color);
}

#post_icon, #find_icon {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    cursor: pointer;
    font-size: 16px;
    transition: opacity 0.2s;
    text-decoration: none;
}

#post_icon:hover, #find_icon:hover {
    opacity: 0.9;
}
</style> 