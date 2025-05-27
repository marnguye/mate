<template>
  <div class="post-container">
    <div class="post-content">
      <!-- Left: File Upload Section -->
      <div class="post-upload-section">
        <h2 class="upload-title">File Upload</h2>
        <div
          class="upload-dropzone"
          :class="{ 'upload-dropzone-active': isDragging }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleFileDrop"
        >
          <div class="upload-content">
            <svg
              class="upload-icon"
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
            <div class="upload-text">
              <label
                for="file-upload"
                class="upload-label"
              >
                <span>Upload photos</span>
                <input
                  id="file-upload"
                  type="file"
                  class="upload-input"
                  multiple
                  accept="image/*"
                  @change="handleFileSelect"
                />
              </label>
              <p class="upload-drag-text">or drag and drop</p>
            </div>
            <p class="upload-hint">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <!-- Preview uploaded images -->
        <div v-if="form.photos.length" class="preview-container">
          <div
            v-for="(photo, index) in form.photos"
            :key="index"
            class="preview-item"
          >
            <div class="preview-content">
              <svg class="preview-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 00-1 1v8a1 1 0 102 0V7a1 1 0 00-1-1zm5 2a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" />
              </svg>
              <span class="preview-filename">{{ photo.file.name }}</span>
            </div>
            <button
              type="button"
              @click="removePhoto(index)"
              class="preview-remove-btn"
            >
              <svg class="preview-remove-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- About Me -->
        <div class="form-group">
          <label for="aboutMe" class="form-label">About Me</label>
          <textarea
            id="aboutMe"
            v-model="form.aboutMe"
            rows="3"
            class="form-textarea"
            placeholder="Tell potential roommates about yourself..."
          ></textarea>
        </div>
      </div>

      <!-- Right: Form Fields Section -->
      <div class="post-form-fields">
        <h1 class="form-title">Post a Room</h1>

        <div class="form-content">
          <!-- Title -->
          <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              required
              class="form-input"
              placeholder="e.g., Cozy Room in Downtown"
            />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="form-textarea"
              placeholder="Describe the room, its features, and the surrounding area..."
            ></textarea>
          </div>

          <!-- Financial Information -->
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <div class="form-group">
                <label for="rent" class="form-label">Rent Price</label>
                <textarea
                  id="rent"
                  v-model="form.rent"
                  required
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., 15,000 CZK"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="utilities" class="form-label">Utilities</label>
                <textarea
                  id="utilities"
                  v-model="form.utilities"
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., 2,000 CZK"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="deposit" class="form-label">Security Deposit</label>
                <textarea
                  id="deposit"
                  v-model="form.deposit"
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., 15,000 CZK"
                ></textarea>
              </div>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <div class="form-group">
                <label for="floor" class="form-label">Floor</label>
                <textarea
                  id="floor"
                  v-model="form.floor"
                  required
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., 5th floor"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="availability" class="form-label">Availability</label>
                <textarea
                  id="availability"
                  v-model="form.availability"
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., Available from July 1st"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="roommates" class="form-label">Number of Roommates</label>
                <textarea
                  id="roommates"
                  v-model="form.roommates"
                  required
                  class="form-textarea single-line"
                  rows="1"
                  placeholder="e.g., 2 roommates both working"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div class="form-group">
            <label class="form-label">Amenities</label>
            <div class="amenities-grid">
              <div v-for="amenity in amenities" :key="amenity.id" class="amenity-item">
                <input
                  type="checkbox"
                  :id="amenity.id"
                  v-model="form.amenities[amenity.id]"
                  class="amenity-checkbox"
                />
                <label :for="amenity.id" class="amenity-label">
                  {{ amenity.label }}
                </label>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button
              type="button"
              class="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="submit-btn"
            >
              Publish
            </button>
          </div>
        </div>
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

const form = reactive({
  title: '',
  description: '',
  rent: '',
  utilities: '',
  deposit: '',
  roommates: '',
  floor: '',
  availability: '',
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

<style scoped>
.post-container {
  min-height: 95vh;
  width: 100vw;
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.post-content {
  display: flex;
  flex-direction: row;
  gap: 24px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 1500px;
  width: 95%;
}

.post-upload-section {
  flex: 1;
  min-width: 0;
}

.post-form-fields {
  flex: 1;
  min-width: 0;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 1rem;
}

.upload-dropzone {
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.375rem;
  height: 29.5rem;
}

.upload-dropzone-active {
  border-color: #3b82f6;
}

.upload-content {
  text-align: center;
  font-size: 13rem;
}

.upload-icon {
  margin: 0 auto;
  height: 3rem;
  width: 3rem;
  color: #9ca3af;
}

.upload-text {
  display: flex;
  font-size: 0.875rem;
  color: #4b5563;
}

.upload-label {
  position: relative;
  cursor: pointer;
  background-color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  color: #2563eb;
}

.upload-label:hover {
  color: #1d4ed8;
}

.upload-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.upload-drag-text {
  padding-left: 0.25rem;
}

.upload-hint {
  font-size: 0.75rem;
  color: #6b7280;
}

.preview-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-content {
  display: flex;
  align-items: center;
}

.preview-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #9ca3af;
  margin-right: 0.5rem;
}

.preview-filename {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.preview-remove-btn {
  margin-left: 1rem;
  color: #dc2626;
}

.preview-remove-btn:hover {
  color: #991b1b;
}

.preview-remove-icon {
  height: 1.25rem;
  width: 1.25rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-textarea {
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #f9f9f9;
  transition: border 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #f9f9f9;
  transition: border 0.2s;
}

.form-textarea.single-line {
  resize: none;
  overflow: hidden;
  height: 38px;
  line-height: 1.5;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.aboutMe{
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.amenity-item {
  display: flex;
  align-items: center;
}

.amenity-checkbox {
  height: 1rem;
  width: 1rem;
  color: #2563eb;
  border-color: #d1d5db;
  border-radius: 0.25rem;
}

.amenity-label {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn {
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: #374151;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.cancel-btn:hover {
  background-color: #f9fafb;
}

.submit-btn {
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: white;
  background-color: var(--tertiary-color);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.submit-btn:hover {
  background-color: #1d4ed8;
}

@media (max-width: 768px) {
  .post-content {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style> 