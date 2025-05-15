<template>
  <div class="register">
    <div class="form_container">
      <div class="main_content_wrapper">
        <!-- Image Section -->
        <div class="image_section">
          <div class="image_overlay"></div>
        </div>

        <!-- Form Section -->
        <div class="form_section">
          <div class="tabs">
            <button 
              :class="{ active: activeTab === 'login' }" 
              @click="activeTab = 'login'"
            >
              Login
            </button>
            <button 
              :class="{ active: activeTab === 'register' }" 
              @click="activeTab = 'register'"
            >
              Register
            </button>
          </div>

          <!-- Login Form -->
          <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="form">
            <h2>WELCOME BACK</h2>
            <div class="form_group">
              <label for="login_email">EMAIL ADDRESS</label>
              <input 
                type="email" 
                id="login_email" 
                v-model="loginForm.email" 
                required
                placeholder="Enter your email address"
              >
            </div>
            <div class="form_group">
              <label for="login_password">PASSWORD</label>
              <div class="password_input_container">
                <input 
                  :type="showLoginPassword ? 'text' : 'password'"
                  id="login_password" 
                  v-model="loginForm.password" 
                  required
                  placeholder="Enter your password"
                >
                <i 
                  :class="['fas', showLoginPassword ? 'fa-eye-slash' : 'fa-eye']"
                  @click="showLoginPassword = !showLoginPassword"
                ></i>
              </div>
              <a href="#" class="forgot_password">FORGOT PASSWORD?</a>
            </div>
            <button type="submit" class="submit_btn">LOGIN</button>
            <div class="divider">
              <span>OR</span>
            </div>
            <button type="button" class="google_btn" @click="handleGoogleAuth">
              <img src="https://www.google.com/favicon.ico" alt="Google icon">
              CONTINUE WITH GOOGLE
            </button>
          </form>

          <!-- Registration Form -->
          <form v-else @submit.prevent="handleRegister" class="form">
            <h2>CREATE ACCOUNT</h2>
            <div class="form_group">
              <label for="register_name">FIRST NAME</label>
              <input 
                type="text" 
                id="register_name" 
                v-model="registerForm.firstName" 
                required
                placeholder="Enter your first name"
              >
            </div>
            <div class="form_group">
              <label for="register_lastname">LAST NAME</label>
              <input 
                type="text" 
                id="register_lastname" 
                v-model="registerForm.lastName" 
                required
                placeholder="Enter your last name"
              >
            </div>
            <div class="form_group phone_group">
              <label for="register_phone">PHONE NUMBER</label>
              <div class="phone_input_container">
                <select v-model="registerForm.phoneCode" required>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+420">+420</option>
                  <!-- Add more country codes as needed -->
                </select>
                <input 
                  type="tel" 
                  id="register_phone" 
                  v-model="registerForm.phoneNumber" 
                  required
                  placeholder="Enter your phone number"
                >
              </div>
            </div>
            <div class="form_group">
              <label for="register_email">EMAIL ADDRESS</label>
              <input 
                type="email" 
                id="register_email" 
                v-model="registerForm.email" 
                required
                placeholder="Enter your email address"
              >
            </div>
            <div class="form_group">
              <label for="register_password">PASSWORD</label>
              <div class="password_input_container">
                <input 
                  :type="showRegisterPassword ? 'text' : 'password'"
                  id="register_password" 
                  v-model="registerForm.password" 
                  required
                  placeholder="Create a password"
                >
                <i 
                  :class="['fas', showRegisterPassword ? 'fa-eye-slash' : 'fa-eye']"
                  @click="showRegisterPassword = !showRegisterPassword"
                ></i>
              </div>
            </div>
            <div class="form_group">
              <label for="register_confirm_password">CONFIRM PASSWORD</label>
              <div class="password_input_container">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="register_confirm_password" 
                  v-model="registerForm.confirmPassword" 
                  required
                  placeholder="Confirm your password"
                >
                <i 
                  :class="['fas', showConfirmPassword ? 'fa-eye-slash' : 'fa-eye']"
                  @click="showConfirmPassword = !showConfirmPassword"
                ></i>
              </div>
            </div>
            <button type="submit" class="submit_btn">REGISTER</button>
            <div class="divider">
              <span>OR</span>
            </div>
            <button type="button" class="google_btn" @click="handleGoogleAuth">
              <img src="https://www.google.com/favicon.ico" alt="Google icon">
              CONTINUE WITH GOOGLE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      activeTab: 'login',
      showLoginPassword: false,
      showRegisterPassword: false,
      showConfirmPassword: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        firstName: '',
        lastName: '',
        phoneCode: '+1',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleLogin() {
      // TODO: Implement login logic
      console.log('Login form submitted:', this.loginForm)
    },
    handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      // TODO: Implement registration logic
      console.log('Register form submitted:', this.registerForm)
    },
    handleGoogleAuth() {
      // TODO: Implement Google authentication
      console.log('Google authentication clicked')
    }
  }
}
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: var(--secondary-color);
}

.form_container {
  display: flex;
  background-color: var(--primary-color);
  width: 90%;
  max-width: 1200px;
  min-height: 600px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.main_content_wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.image_section {
  width: 50%;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.image_overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
}

.form_section {
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.tabs button {
  flex: 1;
  padding: 12px;
  border: 2px solid var(--tertiary-color);
  background: transparent;
  color: var(--tertiary-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.tabs button.active {
  background: var(--tertiary-color);
  color: white;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 400px;
  justify-content: center;
}

/* Login form specific adjustments */
form[class="form"] {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 400px;
  justify-content: center;
}

/* Add empty divs to maintain consistent height in login form */
form[class="form"]:first-of-type .form_group:nth-child(3),
form[class="form"]:first-of-type .form_group:nth-child(4) {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
}

h2 {
  color: var(--tertiary-color);
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.form_group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: #2A7B9B;
  font-size: 14px;
  font-weight: 500;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #2A7B9B;
  box-shadow: 0 0 0 2px rgba(42, 123, 155, 0.2);
}

.submit_btn {
  padding: 14px;
  background: var(--tertiary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit_btn:hover {
  background: #004d00;
  transform: translateY(-2px);
}

.phone_group {
  margin-bottom: 20px;
}

.phone_input_container {
  display: flex;
  gap: 10px;
}

.phone_input_container select {
  width: 80px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider span {
  padding: 0 10px;
  color: #666;
  font-size: 14px;
}

.google_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.google_btn img {
  width: 20px;
  height: 20px;
}

.google_btn:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.password_input_container {
  position: relative;
  display: flex;
  align-items: center;
}

.password_input_container input {
  width: 100%;
  padding-right: 40px;
}

.password_input_container i {
  position: absolute;
  right: 12px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.password_input_container i:hover {
  color: var(--tertiary-color);
}

.forgot_password {
  display: block;
  text-align: right;
  margin-top: 5px;
  color: var(--tertiary-color);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot_password:hover {
  color: #004d00;
}

@media (max-width: 1024px) {
  .form_container {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .form_container {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }

  .main_content_wrapper {
    flex-direction: column;
  }

  .image_section {
    width: 100%;
    height: 200px;
  }

  .form_section {
    width: 100%;
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .register {
    padding: 0;
  }

  .form_section {
    padding: 20px 15px;
  }

  .tabs button {
    padding: 10px;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }

  .submit_btn {
    padding: 12px;
    font-size: 14px;
  }
}
</style>
