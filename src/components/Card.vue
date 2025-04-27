<template>
    <div id="content_container">
      <h1 id="title">Spacious room in the centre of Prague</h1>
      <div id="main_content_wrapper">
        <div id="image_and_user_container">
          <div id="images_container">
            <div id="main_image_container" @click="toggleFullscreen">
              <img :src="roomImage" alt="Room image">
            </div>
            <div id="preview_container">
              <div v-for="(image, index) in images" 
                   :key="index"
                   class="preview_image" 
                   :class="{ active: currentImageIndex === index }"
                   @click="selectImage(index)">
                <img :src="image" :alt="'Room image ' + (index + 1)">
              </div>
            </div>
          </div>
          <div id="user_profile_container">
            <img id="user_profile_image" :src="profileImage" alt="User Profile Image"/>
            <div id="user_info">
              <div class="name_age">
                <h1 class="user" id="user_name">Jan Novak</h1>
                <span class="separator">,</span>
                <h1 class="user" id="user_age">25</h1>
              </div>
              <div class="user" id="user_rating">
                <div class="stars">
                  <i v-for="index in 5" 
                     :key="index" 
                     :class="[
                       'fas',
                       index <= Math.floor(averageRating) ? 'fa-star' : 
                       index - 0.5 <= averageRating ? 'fa-star-half-alt' : 'far fa-star'
                     ]"
                  ></i>
                </div>
                <span class="rating_number">{{ averageRating.toFixed(1) }}</span>
                <span class="rating_count">({{ totalRatings }})</span>
              </div>
            </div>
          </div>
        </div> 
        <div id="information_container">
          <p id="room_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div id="important_info_container">
            <div class="info_row">
              <h1 class="fee_info" id="rent_info">Rent:</h1>
              <span class="fee_value">10 000 CZK</span>
            </div>
            <div class="info_row">
              <h1 class="fee_info" id="utility_info">Utilities:</h1>
              <span class="fee_value">2 000 CZK</span>
            </div>
            <div class="info_row">
              <h1 class="fee_info" id="deposit_info">Deposit:</h1>
              <span class="fee_value">10 000 CZK</span>
            </div>
            <div class="info_row">
              <h1 class="fee_info" id="floor_info">Floor:</h1>
              <span class="fee_value">5th floor/7 floors</span>
            </div>
            <div class="info_row">
              <h1 class="fee_info" id="availability_info">Availability:</h1>
              <span class="fee_value">1.5.2025</span>
            </div>
            <div class="info_row">
              <h1 class="fee_info" id="roommates_info">Roommates:</h1>
              <span class="fee_value">2 working professionals</span>
            </div>
          </div>
        </div>
        <div id="amenities_container">
            <h2 id="amenities_title">Amenities</h2>
            <div class="amenities_grid">
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>Pet Friendly</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>LGBTQ+ Friendly</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>Elevator</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>Washing Machine</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>Dishwasher</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>WiFi</span>
                </div>
                <div class="amenity_item">
                    <i class="fas fa-check"></i>
                    <span>Balcony</span>
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
export default {
  name: 'Card',
  data() {
    return {
      isFullscreen: false,
      roomImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      ratings: [2, 5],
      currentImageIndex: 0,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2948&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2946&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
      ]
    }
  },
  computed: {
    averageRating() {
      if (this.ratings.length === 0) return 0
      return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length
    },
    totalRatings() {
      return this.ratings.length
    }
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      
      if (this.isFullscreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    addRating(rating) {
      if (rating >= 1 && rating <= 5) {
        this.ratings.push(rating)
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape' && this.isFullscreen) {
        this.toggleFullscreen();
      } else if (this.isFullscreen) {
        if (event.key === 'ArrowLeft') {
          this.previousImage();
        } else if (event.key === 'ArrowRight') {
          this.nextImage();
        }
      }
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.roomImage = this.images[this.currentImageIndex];
    },
    previousImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.roomImage = this.images[this.currentImageIndex];
    },
    selectImage(index) {
      this.currentImageIndex = index;
      this.roomImage = this.images[index];
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>

<style scoped>

/* CONTENT */

#content_container {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  width: 90%;
  max-width: 1600px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 20px;
  min-height: 600px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  overflow-y: auto;
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

/* IMAGE */

#image_and_user_container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
}

#images_container {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 80%;
  background-color: var(--primary-color);
}

#main_image_container {
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: none;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

#preview_container {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--primary-color);
}

.preview_image.active {
  opacity: 1;
  border: 2px solid var(--secondary-color);
}

.preview_image {
  width: 100%;
  height: calc((100% - 20px) / 3);
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;
  opacity: 0.8;
}

.preview_image:hover {
  transform: scale(1.02);
  opacity: 1;
}

.preview_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#main_image_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

#main_image_container img:hover {
  transform: scale(1.02);
}

/* FULLSCREEN */

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.fullscreen-overlay .fullscreen-image {
  max-width: 90%;
  max-height: 70%;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.fullscreen-overlay #preview_container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
  height: 100px;
  overflow-x: auto;
  padding: 20px 0;
  margin-top: 20px;
}

.fullscreen-overlay .preview_image {
  width: 150px;
  height: 100px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.fullscreen-overlay .preview_image:hover {
  opacity: 1;
}

.fullscreen-overlay .preview_image.active {
  opacity: 1;
  border: 2px solid var(--secondary-color);
}

/* USER */

#user_profile_container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: var(--primary-color);
  padding: 10px;
  margin-top: 20px;
  gap: 15px;
}

#user_profile_image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
}

#user_info {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-color);
  gap: 5px;
}

.user {
  background-color: var(--primary-color);
  font-weight: 300;
  margin: 0;
  padding: 0;
}

#user_rating {
  display: flex;
  align-items: center;
  background-color: var(--primary-color);
  margin-top: 2px;
  gap: 8px;
}

.stars {
  display: flex;
  gap: 2px;
  background-color: var(--primary-color);
}

#user_rating i {
  color: #FFC107;
  font-size: 14px;
  background-color: var(--primary-color);
  transition: color 0.2s ease;
}

#user_rating i.far {
  color: #ccc;
}

.rating_number {
  font-size: 16px;
  font-weight: 500;
  background-color: var(--primary-color);
}

.rating_count {
  font-size: 14px;
  color: #666;
  background-color: var(--primary-color);
}

.name_age {
  display: flex;
  align-items: center;
  background-color: var(--primary-color);
  gap: 4px;
}

.separator {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

#user_name {
  font-size: 24px;
  font-weight: 500;
}

#user_age {
  font-size: 24px;
  font-weight: 500;
}

/* INFORMATION */

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

/* ROOM DESCRIPTION */

#room_description {
  padding: 0;
  margin: 0;
  background-color: var(--primary-color);
  font-size: 22px;
  font-weight: 300;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
  background-color: var(--primary-color);
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info_row:last-child {
  border-bottom: none;
}

.fee_info {
  background-color: var(--primary-color);
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.fee_value {
  background-color: var(--primary-color);
  font-size: 22px;
  font-weight: 700;
  color: var(--secondary-color);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* AMENITIES */

#amenities_container {
    margin-top: 20px;
    padding: 15px;
    background-color: var(--primary-color);
    border-radius: 10px;
}

#amenities_title {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 15px;
    background-color: var(--primary-color);
}

.amenities_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    background-color: var(--primary-color);
}

.amenity_item {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--primary-color);
}

.amenity_item i {
    color: var(--secondary-color);
    font-size: 16px;
    background-color: var(--primary-color);
}

.amenity_item span {
    font-size: 16px;
    background-color: var(--primary-color);
}

@media (max-width: 1600px) {
  #content_container {
    width: 95%;
    min-width: unset;
    padding: 20px;
    margin: 15px auto;
  }

  #main_content_wrapper {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }

  #image_and_user_container {
    width: 100%;
    min-width: unset;
    height: auto;
  }

  #images_container {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  #main_image_container {
    width: 100%;
    height: 40vh;
    min-height: 250px;
  }

  #preview_container {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .preview_image {
    width: 150px;
    height: 100px;
    flex-shrink: 0;
  }

  #information_container {
    width: 100%;
    min-width: unset;
    height: auto;
    max-height: none;
    padding: 0 10px;
  }

  #title {
    font-size: clamp(20px, 4vw, 28px);
    margin-bottom: 15px;
  }

  .fee_info, .fee_value {
    font-size: clamp(16px, 3vw, 20px);
  }

  #room_description {
    font-size: clamp(16px, 3vw, 20px);
    margin-bottom: 15px;
  }

  #user_profile_container {
    margin-top: 15px;
    padding: 10px;
  }

  .info_row {
    padding: 8px 0;
  }

  #user_profile_image {
    height: 50px;
    width: 50px;
  }

  #user_name, #user_age {
    font-size: clamp(18px, 4vw, 24px);
  }

  #user_rating {
    gap: 6px;
  }

  #user_rating i {
    font-size: 14px;
  }

  .rating_number {
    font-size: 16px;
  }

  .rating_count {
    font-size: 14px;
  }
  
  .amenities_grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  
  .amenity_item span {
    font-size: 14px;
  }
  
  #amenities_title {
    font-size: 20px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1200px) {
  #content_container {
    width: 95%;
    min-width: unset;
    padding: 20px;
    margin: 15px auto;
  }
  
  #main_content_wrapper {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }
  
  #image_and_user_container {
    width: 100%;
    min-width: unset;
    height: auto;
  }
  
  #images_container {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  #main_image_container {
    width: 100%;
    height: 35vh;
    min-height: 200px;
  }
  
  #preview_container {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .preview_image {
    width: 120px;
    height: 80px;
    flex-shrink: 0;
  }
  
  #information_container {
    width: 100%;
    min-width: unset;
    height: auto;
    max-height: none;
    padding: 0 10px;
  }
  
  #title {
    font-size: clamp(20px, 4vw, 28px);
    margin-bottom: 15px;
  }
  
  .fee_info, .fee_value {
    font-size: clamp(16px, 3vw, 20px);
  }
  
  #room_description {
    font-size: clamp(16px, 3vw, 20px);
    margin-bottom: 15px;
    max-height: none;
    overflow: visible;
  }
  
  #user_profile_container {
    margin-top: 15px;
    padding: 10px;
  }
  
  .info_row {
    padding: 8px 0;
  }
  
  #user_profile_image {
    height: 50px;
    width: 50px;
  }
  
  #user_name, #user_age {
    font-size: clamp(18px, 4vw, 24px);
  }
  
  #user_rating {
    gap: 6px;
  }
  
  #user_rating i {
    font-size: 14px;
  }
  
  .rating_number {
    font-size: 16px;
  }
  
  .rating_count {
    font-size: 14px;
  }
  
  .amenities_grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  
  .amenity_item span {
    font-size: 14px;
  }
  
  #amenities_title {
    font-size: 20px;
    margin-bottom: 12px;
  }
}

@media (max-width: 768px) {
  #content_container {
    width: 100%;
    padding: 15px;
    margin: 10px auto;
    border-radius: 10px;
  }
  
  #main_image_container {
    height: 30vh;
    min-height: 180px;
  }
  
  .preview_image {
    width: 100px;
    height: 70px;
  }
  
  #user_profile_image {
    height: 40px;
    width: 40px;
  }
  
  .amenities_grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  #room_description {
    font-size: 16px;
    line-height: 1.5;
  }
  
  .info_row {
    padding: 6px 0;
  }
  
  .fee_info, .fee_value {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  #content_container {
    width: 100%;
    padding: 10px;
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #main_content_wrapper {
    height: auto;
    max-height: none;
    gap: 10px;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #image_and_user_container {
    height: auto;
    flex: 0 0 auto;
  }

  #images_container {
    height: auto;
    gap: 8px;
    flex: 0 0 auto;
  }

  #main_image_container {
    height: 30vh;
    min-height: 150px;
    max-height: 200px;
  }

  #preview_container {
    height: 60px;
    gap: 5px;
    min-height: 60px;
    flex: 0 0 auto;
  }

  #user_profile_container {
    margin-top: 10px;
    padding: 8px;
    gap: 10px;
    min-height: auto;
    flex: 0 0 auto;
  }

  #information_container {
    height: auto;
    max-height: none;
    min-height: auto;
    padding: 0 5px;
    flex: 1;
    overflow-y: auto;
  }

  #room_description {
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 10px;
    max-height: none;
  }

  #important_info_container {
    margin-top: 15px;
    padding: 8px;
    min-height: auto;
  }

  #amenities_container {
    margin-top: 15px;
    padding: 10px;
    min-height: auto;
  }

  .amenities_grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    min-height: auto;
  }
}

</style> 