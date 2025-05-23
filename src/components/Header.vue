<template>
    <div id="header_container">
        <router-link to="/about" id="logo_icon">MATE</router-link>
        <div id="button_icons">
            <router-link to="/" id="find_icon">FIND</router-link>
            <router-link to="/post" id="post_icon">POST</router-link>
            <router-link to="/register" id="register_icon">REGISTER</router-link>
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
    color: #2A7B9B;
    transition: color 0.3s ease;
}

#logo_icon:hover {
    color: #5AED97;
}

#button_icons {
    display: flex;
    gap: 20px;
    background-color: var(--primary-color);
}

#post_icon, #find_icon, #register_icon {
    padding: 8px 16px;
    border: 2px solid var(--primary-color);
    border-radius: 4px;
    background-color: var(--secondary-color);
    color: #000000;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#post_icon:hover, #find_icon:hover, #register_icon:hover {
    background-color: var(--secondary-color);
    color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
