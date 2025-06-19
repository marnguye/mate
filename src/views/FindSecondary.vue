<template>
  <div class="find-container">
    <div class="find-content">
      <div class="find-header">
        <h1 class="find-title">Available Rooms</h1>
        <button
          @click="router.push('/post')"
          class="post-btn"
        >
          Post a Room
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading rooms...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button @click="fetchRooms" class="retry-btn">Retry</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="rooms.length === 0" class="empty-container">
        <p>No rooms available at the moment.</p>
        <button @click="router.push('/post')" class="post-btn">Be the first to post!</button>
      </div>

      <!-- Room Listings -->
      <div v-else class="rooms-grid">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="room-card"
          @click="router.push(`/room/${room.id}`)"
        >
          <div class="room-image-container">
            <img
              v-if="room.photos && room.photos.length > 0"
              :src="room.photos[0]"
              :alt="room.title"
              class="room-image"
            />
            <div v-else class="room-image-placeholder">
              <svg class="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="room-info">
            <h2 class="room-title">{{ room.title }}</h2>
            <p class="room-price">{{ room.rent }}</p>
            <div class="room-amenities">
              <span
                v-for="(value, key) in room.amenities"
                :key="key"
                v-show="value"
                class="amenity-tag"
              >
                {{ getAmenityLabel(key) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSupabaseClient } from '@/lib/supabase'

const router = useRouter()
const rooms = ref([])
const isLoading = ref(true)
const error = ref(null)

const amenities = [
  { id: 'furnished', label: 'Furnished' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'petFriendly', label: 'Pet Friendly' },
  { id: 'lgbtqFriendly', label: 'LGBTQ+ Friendly' },
  { id: 'parking', label: 'Parking' },
  { id: 'washer', label: 'Washer' },
  { id: 'dryer', label: 'Dryer' },
  { id: 'airConditioning', label: 'Air Conditioning' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'gym', label: 'Gym Access' },
  { id: 'security', label: 'Security' },
  { id: 'bikeStorage', label: 'Bike Storage' },
  { id: 'rooftop', label: 'Rooftop Access' },
  { id: 'garden', label: 'Garden' },
  { id: 'dishwasher', label: 'Dishwasher' },
  { id: 'tv', label: 'TV' },
  { id: 'heating', label: 'Heating' }
]

const getAmenityLabel = (id) => {
  const amenity = amenities.find(a => a.id === id)
  return amenity ? amenity.label : id
}

const fetchRooms = async () => {
  try {
    isLoading.value = true
    error.value = null

    console.log('Fetching rooms from Supabase...')

    const supabase = getSupabaseClient();
    const { data, error: supabaseError } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false })

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      throw supabaseError
    }

    console.log('Rooms fetched successfully:', data)
    rooms.value = data.map(room => ({
      ...room,
      amenities: typeof room.amenities === 'object' && room.amenities !== null ? room.amenities : {}
    }));
  } catch (err) {
    console.error('Error fetching rooms:', err)
    error.value = 'Failed to load rooms. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRooms()
})
</script>

<style scoped>
.find-container {
  min-height: 95vh;
  width: 100vw;
  background-color: var(--secondary-color);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px 0;
}

.find-content {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 1500px;
  width: 95%;
}

.find-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.find-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.post-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--tertiary-color);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.post-btn:hover {
  opacity: 0.9;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--tertiary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #dc2626;
  margin-bottom: 1rem;
}

.retry-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dc2626;
  border-radius: 0.375rem;
  color: #dc2626;
  background-color: white;
  font-weight: 500;
  transition: all 0.2s;
}

.retry-btn:hover {
  background-color: #dc2626;
  color: white;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.room-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.room-card:hover {
  transform: translateY(-4px);
}

.room-image-container {
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  background-color: #f3f4f6;
}

.room-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
}

.room-info {
  padding: 1.5rem;
}

.room-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.room-price {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--tertiary-color);
  margin-bottom: 1rem;
}

.room-amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.amenity-tag {
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

@media (max-width: 768px) {
  .find-content {
    padding: 20px;
  }

  .find-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }
}
</style> 