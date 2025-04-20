<template>
  <div id="header-container">
    <h1 id="logo-icon">MATE</h1>
    <div id="right-icons">
      <h1 id="post-icon">POST</h1>
      <h1 id="find-icon">FIND</h1>
    </div>
  </div>
  <div id="content_container">
      <h1 id="title" :style="{ position: 'absolute', top: '0', backgroundColor: '#d9d9d9' }">Spacious room in the centre of Prague</h1>
      <div id="image_and_user_container" :style="{ backgroundColor: '#d9d9d9',  display: 'flex', flexDirection: 'column' }">
        <div id="image_container" :style="{ width: '90%', height: '80%', position: 'relative' }">
          <img src="./assets/room1.jpg" alt="Room image" :style="{ width: '100%', height: '100%', borderRadius: '20px' }">
        </div>
        <div id="user_profile_container">
          <img id="user_profile_image" src="./assets/profile_icon.png" alt="User Profile Image"/>
          <h1 id="user_name" :style="{ backgroundColor: '#d9d9d9' }">Jan Novak</h1>
          <h1 id="user_age" :style="{ backgroundColor: '#d9d9d9' }">25</h1>
          <div id="user_rating" :style="{ backgroundColor: '#d9d9d9' }">
            <h1 id="user_rating" :style="{ backgroundColor: '#d9d9d9' }">*****</h1>
          </div>
        </div>
      </div> 
      <div id="information_container" :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }">
        <p id="room_description" :style="{ backgroundColor: '#d9d9d9', fontWeight: '300', padding: '20px', width: '50%' }">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div id="important_info_container" :style="{ backgroundColor: '#d9d9d9', fontSize: '20px', padding: '20px', width: '50%'}">
          <h1 class="fee_info" id="rent_info">Rent:</h1>
          <h1 class="fee_info" id="utility_info">Utilities:</h1>
          <h1 class="fee_info" id="deposit_info">Deposit:</h1>
          <h1 class="fee_info" id="floor_info">Floor:</h1>
          <h1 class="fee_info" id="availability_info">Availability:</h1>
          <h1 class="fee_info" id="roommates_info">Roommates:</h1>
          <div class="amenities" id="amenities_container" :style="{ backgroundColor: '#d9d9d9', fontSize: '20px'}">
            <h1 id="amenities_title" :style="{ backgroundColor: '#d9d9d9'}">Additional Information:</h1>
          </div>
        </div>
      </div>
  </div>
  <router-view/>
</template>

<script>
  import { ref } from 'vue';
</script>
