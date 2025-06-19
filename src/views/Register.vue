<template>
  <div class="register-container">
    <div class="register-content">
      <!-- Left: Solid Color Section -->
      <div class="register-hero"></div>
      <!-- Right: Flip Card Form Section -->
      <div class="register-form-section">
        <div class="flip-card" :class="{flipped: activeTab==='register'}">
          <div class="flip-card-inner">
            <!-- Login Face -->
            <div class="flip-card-face flip-card-front">
              <div class="form-toggle-row">
                <button :class="{active: activeTab==='login'}" @click="activeTab='login'">Login</button>
                <button :class="{active: activeTab==='register'}" @click="activeTab='register'">Register</button>
              </div>
              <form class="register-form" @submit.prevent="handleLogin">
                <button type="button" class="google-btn" @click="signInWithGoogle('login')">
                  <img src="https://www.google.com/favicon.ico" alt="Google icon" class="google-icon" /> Continue with Google
                </button>
                <div class="form-divider"><span>or</span></div>
                <h2 class="form-title">Login</h2>
                <div class="form-group">
                  <label for="login_email">Email</label>
                  <input type="email" id="login_email" v-model="loginForm.email" required placeholder="Enter your email address" />
                </div>
                <div class="form-group">
                  <label for="login_password">Password</label>
                  <input type="password" id="login_password" v-model="loginForm.password" required placeholder="Enter your password" />
                </div>
                <button type="submit" class="signup-btn">Login</button>
              </form>
            </div>
            <!-- Register Face -->
            <div class="flip-card-face flip-card-back">
              <div class="form-toggle-row">
                <button :class="{active: activeTab==='login'}" @click="activeTab='login'">Login</button>
                <button :class="{active: activeTab==='register'}" @click="activeTab='register'">Register</button>
              </div>
              <form class="register-form" @submit.prevent="handleRegister">
                <button type="button" class="google-btn" @click="signInWithGoogle('register')">
                  <img src="https://www.google.com/favicon.ico" alt="Google icon" class="google-icon" /> Continue with Google
                </button>
                <div class="form-divider"><span>or</span></div>
                <h2 class="form-title">Create Account</h2>
                <div class="form-group">
                  <label for="register_email">Email</label>
                  <input type="email" id="register_email" v-model="registerForm.email" required placeholder="Enter your email address" />
                </div>
                <div class="form-group">
                  <label for="register_phone">Phone Number</label>
                  <div class="phone-input-row">
                    <select v-model="registerForm.phoneCode" required class="phone-code-select">
                      <option value="+420">+420</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input type="tel" id="register_phone" v-model="registerForm.phoneNumber" required placeholder="Enter your phone number" class="phone-input" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="register_password">Password</label>
                  <input type="password" id="register_password" v-model="registerForm.password" required placeholder="Create a password" />
                </div>
                <div class="form-group">
                  <label for="register_confirm_password">Confirm Password</label>
                  <input type="password" id="register_confirm_password" v-model="registerForm.confirmPassword" required placeholder="Confirm your password" />
                </div>
                <div class="form-group legal-group">
                  <input type="checkbox" id="accept_legal" v-model="registerForm.acceptLegal" required />
                  <label for="accept_legal" class="legal-label">
                    Accept <a href="#" class="legal-link">Legal Agreements</a>
                  </label>
                </div>
                <button type="submit" class="signup-btn">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getSupabaseClient } from '@/lib/supabase' // Assuming this is correctly implemented

const router = useRouter()
const toast = useToast()

const activeTab = ref('register')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  phoneCode: '+420',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  acceptLegal: false
})

const handleLogin = () => {
  // TODO: Implement email/password login logic using Supabase
  toast.info('Email/password login not yet implemented.')
}

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    toast.error('Passwords do not match!')
    return
  }
  if (!registerForm.value.acceptLegal) {
    toast.error('You must accept the legal agreements to register.')
    return
  }
  // TODO: Implement email/password registration logic using Supabase
  toast.info('Email/password registration not yet implemented.')
}

const signInWithGoogle = async (type) => {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/' // Redirect to home page after successful login
      }
    })

    if (error) {
      console.error('Google Sign-in error:', error)
      toast.error('Google Sign-in failed: ' + error.message)
    }

  } catch (error) {
    console.error('Unexpected Google Sign-in error:', error)
    toast.error('An unexpected error occurred during Google Sign-in.')
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}

.register-content {
  display: flex;
  flex-direction: row;
  gap: 24px;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 0;
  width: 1500px;
  max-width: 198vw;
  min-height: 960px;
}

.register-hero {
  flex: 1 1 0;
  background-image: url("./src/assets/image_roommate.jpg");
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  transition: background 0.4s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  align-items: stretch;
}

.register-form-section {
  flex: 1 1 0;
  background: #fff;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  padding: 0 32px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  perspective: 1200px;
  will-change: transform, opacity;
}

/* Card Flip Styles */
.flip-card {
  width: 100%;
  max-width: 480px;
  min-height: 700px;
  height: 700px;
  perspective: 1200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flip-card-inner {
  width: 100%;
  min-height: 700px;
  height: 100%;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
  transform-style: preserve-3d;
}
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-face {
  width: 100%;
  min-height: 700px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0 18px 0 18px;
}
.flip-card-front {
  z-index: 2;
}
.flip-card-back {
  transform: rotateY(180deg);
  z-index: 1;
}

.form-toggle-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 8px;
}
.form-toggle-row button {
  background: none;
  border: 2px solid var(--tertiary-color);
  color: var(--tertiary-color);
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 20px;
  padding: 8px 28px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.form-toggle-row button.active, .form-toggle-row button:hover {
  background: var(--tertiary-color);
  color: #fff;
}

.register-form {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  color: #222;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: #2A7B9B;
}

input[type="email"],
input[type="password"],
input[type="tel"] {
  padding: 12px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  font-size: 1rem;
  background: #fafdff;
  transition: border 0.2s;
}
input:focus {
  outline: none;
  border-color: #2A7B9B;
}

.phone-input-row {
  display: flex;
  gap: 8px;
}
.phone-code-select {
  padding: 12px 8px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  font-size: 1rem;
  background: #fafdff;
  min-width: 70px;
}
.phone-input {
  flex: 1;
}

.legal-group {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.legal-label {
  font-size: 0.98rem;
  color: #222;
  font-weight: 400;
}

.legal-link {
  color: #2A7B9B;
  text-decoration: underline;
  cursor: pointer;
}
.signup-btn {
  margin-top: 8px;
  padding: 14px 0;
  background: #ffe600;
  color: #222;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.5s ease;
}
.signup-btn:hover {
  background: #fff700;
  transform: scale(1.1);
}
.google-btn {
  padding: 12px 0;
  background: #fff;
  color: #222;
  font-size: 1.05rem;
  font-weight: 600;
  border: 1px solid #d0d7de;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s, border 0.2s;
}
.google-btn:hover {
  background: #fafdff;
  border-color: #2A7B9B;
}
.google-icon {
  width: 22px;
  height: 22px;
  margin-top: -3px;
}

/* Divider styles */
.form-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0;
  color: #888;
  font-size: 1rem;
}
.form-divider::before,
.form-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
  margin: 0 8px;
}
.form-divider span {
  padding: 0 8px;
  font-size: 1rem;
  color: #888;
  background: #fff;
}

@media (max-width: 900px) {
  .register-content {
    flex-direction: column;
    width: 98vw;
    height: auto;
    height: 90vh;
    min-height: 0;
    gap: 25px;
    border-radius: 24px;
    padding: 16px;
  }
  
  .register-hero {
    border-radius: 24px;
    min-height: 180px;
    padding: 24px;
  }
  
  .register-form-section {
    border-radius: 24px;
    min-height: 0;
    padding: 24px 16px;
    width: 100%;
  }

  .flip-card {
    width: 100%;
    max-width: 100%;
    min-height: 500px;
    height: auto;
  }
  
  .flip-card-inner {
    min-height: 500px;
    height: auto;
  }
  
  .flip-card-face {
    min-height: 500px;
    height: auto;
    border-radius: 16px;
    padding: 0 16px;
  }
  
  .register-form {
    max-width: 100%;
    padding: 0;
  }

  .form-divider {
    margin: 14px 0;
    font-size: 0.98rem;
  }
  .form-divider span {
    font-size: 0.98rem;
  }
  .form-divider::before,
  .form-divider::after {
    margin: 0 6px;
  }
}

@media (max-width: 600px) {
  .register-content {
    width: 100vw;
    height: 80vh;
    gap: 12px;
    border-radius: 16px;
    padding: 12px;
  }
  
  .register-hero {
    border-radius: 16px;
    min-height: 120px;
    padding: 16px;
  }
  
  .register-form-section {
    border-radius: 16px;
    padding: 16px 12px;
  }
  
  .flip-card {
    min-height: 400px;
  }
  
  .flip-card-inner {
    min-height: 400px;
  }
  
  .flip-card-face {
    min-height: 400px;
    border-radius: 12px;
    padding: 0 12px;
  }
  
  .form-toggle-row {
    margin: 16px 0 16px 0;
  }
  
  .form-toggle-row button {
    font-size: 1rem;
    padding: 6px 20px;
  }
  
  .form-title {
    font-size: 1.5rem;
    margin-bottom: 4px;
  }
  
  .form-group {
    gap: 4px;
  }
  
  input[type="email"],
  input[type="password"],
  input[type="tel"],
  .phone-code-select {
    padding: 10px;
    font-size: 0.95rem;
  }
  
  .signup-btn {
    padding: 12px 0;
    font-size: 1rem;
    margin-bottom: 22px;
  }
  
  .google-btn {
    padding: 10px 0;
    font-size: 0.95rem;
  }

  .form-divider {
    margin: 10px 0;
    font-size: 0.95rem;
  }
  .form-divider span {
    font-size: 0.95rem;
  }
  .form-divider::before,
  .form-divider::after {
    margin: 0 4px;
  }
}
</style>