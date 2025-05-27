<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-8">Create Room Listing</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Listing Title</label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Cozy Room in Downtown"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Room/Apartment Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the room, its features, and the surrounding area..."
            ></textarea>
          </div>

          <!-- Financial Information -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label for="rent" class="block text-sm font-medium text-gray-700">Rent Price</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="rent"
                  v-model="form.rent"
                  required
                  min="0"
                  class="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label for="utilities" class="block text-sm font-medium text-gray-700">Utilities</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="utilities"
                  v-model="form.utilities"
                  min="0"
                  class="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label for="deposit" class="block text-sm font-medium text-gray-700">Security Deposit</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="deposit"
                  v-model="form.deposit"
                  min="0"
                  class="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Number of Roommates -->
          <div>
            <label for="roommates" class="block text-sm font-medium text-gray-700">Number of Roommates</label>
            <input
              type="number"
              id="roommates"
              v-model="form.roommates"
              required
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <!-- Amenities -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-for="amenity in amenities" :key="amenity.id" class="flex items-center">
                <input
                  type="checkbox"
                  :id="amenity.id"
                  v-model="form.amenities[amenity.id]"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label :for="amenity.id" class="ml-2 block text-sm text-gray-700">
                  {{ amenity.label }}
                </label>
              </div>
            </div>
          </div>

          <!-- About Me -->
          <div>
            <label for="aboutMe" class="block text-sm font-medium text-gray-700">About Me</label>
            <textarea
              id="aboutMe"
              v-model="form.aboutMe"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Tell potential roommates about yourself..."
            ></textarea>
          </div>

          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <div
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              :class="{ 'border-blue-500': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload photos</span>
                    <input
                      id="file-upload"
                      type="file"
                      class="sr-only"
                      multiple
                      accept="image/*"
                      @change="handleFileSelect"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <!-- Preview uploaded images -->
            <div v-if="form.photos.length" class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div
                v-for="(photo, index) in form.photos"
                :key="index"
                class="relative group"
              >
                <img
                  :src="photo.preview"
                  class="h-24 w-full object-cover rounded-lg"
                  alt="Preview"
                />
                <button
                  type="button"
                  @click="removePhoto(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isDragging = ref(false)

const amenities = [
  { id: 'furnished', label: 'Furnished' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'petFriendly', label: 'Pet Friendly' },
  { id: 'lgbtqFriendly', label: 'LGBTQ+ Friendly' },
  { id: 'parking', label: 'Parking' },
  { id: 'washer', label: 'Washer' },
  { id: 'dryer', label: 'Dryer' },
  { id: 'airConditioning', label: 'Air Conditioning' },
  { id: 'wifi', label: 'WiFi' }
]

const form = reactive({
  title: '',
  description: '',
  rent: null,
  utilities: null,
  deposit: null,
  roommates: null,
  amenities: {},
  aboutMe: '',
  photos: []
})

// Initialize amenities as false
amenities.forEach(amenity => {
  form.amenities[amenity.id] = false
})

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  handleFiles(files)
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  handleFiles(files)
}

const handleFiles = (files) => {
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        form.photos.push({
          file,
          preview: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const removePhoto = (index) => {
  form.photos.splice(index, 1)
}

const handleSubmit = () => {
  // TODO: Implement form submission
  console.log('Form submitted:', form)
}
</script> 