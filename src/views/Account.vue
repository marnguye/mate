<template>
  <div class="account-container">
    <div class="account-content">
      <h1 class="account-title">Account Settings</h1>

      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
      </div>

      <div v-else-if="profile">
        <!-- Profile Picture -->
        <div class="profile-header">
          <img
            :src="profile.avatar_url || 'https://via.placeholder.com/150'"
            alt="Profile Picture"
            class="profile-picture"
          />
          <div>
            <h2 class="profile-name">{{ profile.first_name }} {{ profile.last_name }}</h2>
            <p class="profile-member-date">Member since {{ formatCreationDate(profile.created_at) }}</p>
          </div>
        </div>

        <!-- Profile Details Form -->
        <form @submit.prevent="saveProfile">
          <div class="form-grid">
            <!-- First Name -->
            <div class="form-group">
              <label class="form-label" for="first_name">First Name:</label>
              <input
                v-model="editableProfile.first_name"
                type="text"
                id="first_name"
                :readonly="!isEditing"
                :class="{'form-input-readonly': !isEditing}"
                class="form-input"
              />
            </div>

            <!-- Last Name -->
            <div class="form-group">
              <label class="form-label" for="last_name">Last Name:</label>
              <input
                v-model="editableProfile.last_name"
                type="text"
                id="last_name"
                :readonly="!isEditing"
                 :class="{'form-input-readonly': !isEditing}"
                class="form-input"
              />
            </div>

            <!-- Email Address (Read-only) -->
            <div class="form-group form-group-full-width">
              <label class="form-label" for="email">Email Address:</label>
              <input
                v-model="profile.email"
                type="email"
                id="email"
                readonly
                class="form-input form-input-readonly cursor-not-allowed"
              />
            </div>

            <!-- Phone Number -->
             <div class="form-group">
              <label class="form-label" for="phone">Phone Number:</label>
              <input
                v-model="editableProfile.phone"
                type="tel"
                id="phone"
                :readonly="!isEditing"
                 :class="{'form-input-readonly': !isEditing}"
                class="form-input"
              />
            </div>

            <!-- Location -->
             <div class="form-group">
              <label class="form-label" for="location">Location (City):</label>
              <input
                v-model="editableProfile.location"
                type="text"
                id="location"
                :readonly="!isEditing"
                 :class="{'form-input-readonly': !isEditing}"
                class="form-input"
              />
            </div>

            <!-- Password (Hidden with Change Password Button) -->
            <div class="form-group form-group-full-width password-group">
               <label class="form-label" for="password">Password:</label>
               <!-- Password input is not rendered, only the button -->
               <button type="button" class="change-password-btn">
                Change Password
               </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button
              v-if="!isEditing"
              type="button"
              @click="isEditing = true"
              class="edit-btn"
            >
              Edit
            </button>
            <template v-else>
              <button
                type="button"
                @click="cancelEdit"
                class="cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="submit-btn"
              >
                Save Changes
              </button>
            </template>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getSupabaseClient } from '@/lib/supabase'

const router = useRouter()
const toast = useToast()
const supabase = getSupabaseClient()

const isLoading = ref(true)
const error = ref(null)
const profile = ref(null)
const editableProfile = ref(null)
const isEditing = ref(false)

const fetchProfile = async () => {
  try {
    isLoading.value = true

    // Get the authenticated user directly from auth
    const { data: { user }, error: userAuthError } = await supabase.auth.getUser()

    if (userAuthError) throw userAuthError; // Handle potential auth errors

    if (!user) {
      router.push('/register') // Redirect to register if not authenticated
      return
    }

    console.log('Authenticated user ID:', user.id);

    // Fetch additional profile data from the 'profiles' table
    console.log('Fetching profile for user ID:', user.id);
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name, phone, location') // Select only fields from profiles table
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is 'Not Found'
       console.error('Error fetching profile data:', profileError);
       throw profileError;
    }

    // Combine user data from auth and profile data from the 'profiles' table
    // Use a default empty object for profileData if not found
    const combinedProfile = {
       id: user.id,
       email: user.email,
       created_at: user.created_at,
       avatar_url: user.user_metadata?.avatar_url || 'https://via.placeholder.com/150', // Use user_metadata for Google avatar
       // Fields from profiles table (default to empty if profileData is null)
       first_name: profileData?.first_name || '',
       last_name: profileData?.last_name || '',
       phone: profileData?.phone || '',
       location: profileData?.location || '',
    }

    profile.value = combinedProfile;
    editableProfile.value = { ...combinedProfile }; // Initialize editable profile

  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Failed to load profile.'
    toast.error('Failed to load profile.')
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  try {
    // Get the current user to ensure they are authenticated before saving
    const { data: { user }, error: userAuthError } = await supabase.auth.getUser()
    if (userAuthError) throw userAuthError;
    if (!user) return; // Should not happen with route guard, but good practice

    // Update only fields that are part of the 'profiles' table
    const updates = {
      id: user.id,
      first_name: editableProfile.value.first_name,
      last_name: editableProfile.value.last_name,
      phone: editableProfile.value.phone,
      location: editableProfile.value.location,
      // avatar_url is typically not updated here. File uploads or OAuth provider handle it.
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .upsert(updates, { onConflict: 'id' })

    if (updateError) throw updateError

    // Update the main profile ref with saved changes
    profile.value = { ...profile.value, ...updates }
    isEditing.value = false
    toast.success('Profile updated successfully!')

  } catch (err) {
    console.error('Error saving profile:', err)
    toast.error('Failed to save profile.')
  }
}

const cancelEdit = () => {
  editableProfile.value = { ...profile.value } // Revert changes
  isEditing.value = false
}

const formatCreationDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return `Member since ${new Date(dateString).toLocaleDateString(undefined, options)}`;
}

onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.account-container {
  min-height: 95vh;
  width: 100vw;
  background-color: var(--secondary-color);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px 0;
}

.account-content {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 800px; /* Adjusted max-width for a form-like layout */
  width: 95%;
}

.account-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
}

.loading-container,
.error-container {
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
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Equivalent to space-x-4 */
  margin-bottom: 1.5rem; /* Equivalent to mb-6 */
}

.profile-picture {
  width: 5rem; /* Equivalent to w-20 */
  height: 5rem; /* Equivalent to h-20 */
  border-radius: 9999px; /* Equivalent to rounded-full */
  object-fit: cover;
}

.profile-name {
  font-size: 1.25rem; /* Equivalent to text-xl */
  font-weight: 600; /* Equivalent to font-semibold */
  color: #111827;
}

.profile-member-date {
  font-size: 1rem;
  color: #6b7280; /* Equivalent to text-gray-600 */
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* Equivalent to gap-4 */
  margin-bottom: 1.5rem; /* Equivalent to mb-6 */
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Equivalent to mb-2 for label */
}

.form-group-full-width {
    grid-column: span 2 / span 2; /* Equivalent to md:col-span-2 */
}

.form-label {
  font-size: 0.875rem; /* Equivalent to text-sm */
  font-weight: 700; /* Equivalent to font-bold */
  color: #374151; /* Equivalent to text-gray-700 */
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem; /* Equivalent to py-2 px-3 */
  font-size: 1rem;
  line-height: 1.5;
  color: #374151; /* Equivalent to text-gray-700 */
  background-color: white;
  border: 1px solid #d1d5db; /* Default border */
  border-radius: 0.25rem; /* Equivalent to rounded */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to shadow */
  appearance: none; /* Equivalent to appearance-none */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6; /* Focus ring equivalent */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Focus ring equivalent */
}

.form-input-readonly {
    background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
    cursor: not-allowed;
    border-color: #d1d5db; /* Ensure border is visible when readonly */
}

.password-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.change-password-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem; /* Equivalent to py-2 px-4 */
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 700; /* Equivalent to font-bold */
  border-radius: 0.25rem; /* Equivalent to rounded */
  color: white; /* Equivalent to text-white */
  background-color: #3b82f6; /* Equivalent to bg-blue-500 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to focus:shadow-outline */
  transition: background-color 0.2s ease-in-out;
}

.change-password-btn:hover {
  background-color: #2563eb; /* Equivalent to hover:bg-blue-700 */
}

.change-password-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Focus ring equivalent */
}

.action-buttons {
  display: flex;
  justify-content: flex-end; /* Equivalent to justify-end */
  gap: 1rem; /* Equivalent to space-x-4 */
}

.edit-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem; /* Equivalent to py-2 px-4 */
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 700; /* Equivalent to font-bold */
  border-radius: 0.25rem; /* Equivalent to rounded */
  color: #374151; /* Equivalent to text-gray-800 */
  background-color: #d1d5db; /* Equivalent to bg-gray-300 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to focus:shadow-outline */
  transition: background-color 0.2s ease-in-out;
}

.edit-btn:hover {
  background-color: #9ca3af; /* Equivalent to hover:bg-gray-400 */
}

.edit-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.5); /* Focus ring equivalent */
}

.cancel-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem; /* Equivalent to py-2 px-4 */
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 700; /* Equivalent to font-bold */
  border-radius: 0.25rem; /* Equivalent to rounded */
  color: white; /* Equivalent to text-white */
  background-color: #ef4444; /* Equivalent to bg-red-500 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to focus:shadow-outline */
  transition: background-color 0.2s ease-in-out;
}

.cancel-btn:hover {
  background-color: #b91c1c; /* Equivalent to hover:bg-red-700 */
}

.cancel-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5); /* Focus ring equivalent */
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem; /* Equivalent to py-2 px-4 */
  border: 1px solid transparent;
  font-size: 1rem;
  font-weight: 700; /* Equivalent to font-bold */
  border-radius: 0.25rem; /* Equivalent to rounded */
  color: white; /* Equivalent to text-white */
  background-color: #22c55e; /* Equivalent to bg-green-500 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to focus:shadow-outline */
  transition: background-color 0.2s ease-in-out;
}

.submit-btn:hover {
  background-color: #15803d; /* Equivalent to hover:bg-green-700 */
}

.submit-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.5); /* Focus ring equivalent */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .account-content {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-group-full-width {
      grid-column: span 1 / span 1;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style> 