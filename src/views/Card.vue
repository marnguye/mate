<template>
    <div id="content_container">
      <h1 id="title">Spacious room in the centre of Prague</h1>
      <div id="main_content_wrapper">
        <div id="image_and_user_container">
          <div id="image_container" @click="toggleFullscreen">
            <img :src="roomImage" alt="Room image">
          </div>
          <div id="user_profile_container">
            <img id="user_profile_image" :src="profileImage" alt="User Profile Image"/>
            <h1 class="user" id="user_name">Jan Novak</h1>
            <h1 class="user" id="user_age">25</h1>
            <div class="user" id="user_rating">
              <h1 class="user">*****</h1>
            </div>
          </div>
        </div> 
        <div id="information_container">
          <p id="room_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div id="important_info_container">
            <h1 class="fee_info" id="rent_info">Rent:</h1>
            <h1 class="fee_info" id="utility_info">Utilities:</h1>
            <h1 class="fee_info" id="deposit_info">Deposit:</h1>
            <h1 class="fee_info" id="floor_info">Floor:</h1>
            <h1 class="fee_info" id="availability_info">Availability:</h1>
            <h1 class="fee_info" id="roommates_info">Roommates:</h1>
            <div class="amenities" id="amenities_container">
              <h1 id="amenities_title">Additional Information:</h1>
            </div>
          </div>
        </div>
      </div>
  </div>

  <div v-if="isFullscreen" class="fullscreen-overlay" @click="toggleFullscreen">
    <img :src="roomImage" alt="Fullscreen Room Image" class="fullscreen-image">
  </div>

</template>

<script>
import roomImage from '../assets/room1.jpg'
import profileImage from '../assets/profile_icon.png'

export default {
  data() {
    return {
      isFullscreen: false,
      roomImage,
      profileImage
    }
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      
      // Prevent scrolling when fullscreen is active
      if (this.isFullscreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}
</script>

<style scoped>
#content_container {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  height: 90vh;
  max-height: 90%;
  width: 90%;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
}

#title {
  position: relative;
  background-color: var(--primary-color);
  padding: 10px 0;
  margin-bottom: 20px;
}

#main_content_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 60px);
  max-height: 900px;
  background-color: var(--primary-color);
}

#image_and_user_container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
}

#image_container {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: none;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

#image_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

#image_container img:hover {
  transform: scale(1.02);
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

#user_profile_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--primary-color);
}

#user_profile_image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  height: 60px;
}

.user {
  background-color: var(--primary-color);
  font-weight: 300;
}

#information_container {
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: var(--primary-color);
  border: none;
  overflow-y: auto;
}

#room_description {
  padding: 0;
  margin: 0;
  background-color: var(--primary-color);
}

#information_container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

#information_container::-webkit-scrollbar-thumb {
  background-color: var(--secondary-color);
  border-radius: 10px;
  border: none;
}

#important_info_container {
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 80%;
  background-color: var(--primary-color);
}

.fee_info {
  background-color: var(--primary-color);
  margin-bottom: 0;
  margin-top: 0;
}

#amenities_container {
  background-color: var(--primary-color);
}

#amenities_title {
  background-color: var(--primary-color);
}
</style>