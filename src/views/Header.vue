<template>
    <div id="header_container">
        <h1 id="logo_icon">MATE</h1>
        <div id="button_icons">
            <button id="post_icon">POST</button>
            <button id="find_icon">FIND</button>
        </div>
    </div>
</template>

<style scoped>
#header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: var(--primary-color);
    width: 100%;
}

#logo_icon {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    background-color: var(--primary-color);
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
}

#post_icon:hover, #find_icon:hover {
    opacity: 0.9;
}
</style>