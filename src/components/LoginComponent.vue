<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

const email = ref()
const pwd = ref()
const showErrorMsg = ref(false)

const router = useRouter()

function login() {
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then(userCredential => {
      // Signed in 
      const user = userCredential.user
      console.log(user)
      router.push({ name: 'home' })
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, errorMessage)
    })
}
</script>

<template>
  <div class="login-form">
    <div class="login-form-wrapper">
      <label class="login-form-label" for="email">
        email
      </label>
      <input class="login-form-input" type="email" name="email" required v-model="email"/>
    </div>
    <div class="login-form-wrapper">
      <label class="login-form-label" for="password">
        password
      </label>
      <input class="login-form-input" type="password" name="password" required v-model="pwd"/>
    </div>
    <p v-if="showErrorMsg" class="text-red-500">All fields are required</p>
    <button class="login-form-btn" @click="login">
      Login
    </button>
    <RouterLink class="login-form-btn" to="/signup">
      Signup
    </RouterLink>
  </div>
</template>

<style scoped>
.login-form {
  @apply px-2;
}
.login-form-label, .login-form-input {
  @apply w-full block py-2 mb-2 rounded-lg;
}
.login-form-label {
  @apply capitalize;
}
.login-form-input {
  @apply mt-2 px-0.5 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}
.login-form-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
.login-form-btn {
  @apply inline-block w-full p-4 mt-2 rounded-lg text-center capitalize;
  background-color: var(--color-background-mute);
}
.login-form-btn:hover {
  background-color: var(--color-background-soft);
}
</style>