<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '@/helpers/auth.helper';
import InputComponent from '@/components/atoms/InputComponent.vue'

const name = ref<string>()
const lastname = ref<string>()
const email = ref<string>('')
const pwd = ref()
const showErrorMsg = ref(false)

const router = useRouter()


function signup() {
  signUp(email.value, pwd.value).then(userCredential => {
    console.log(userCredential)
    router.push({ name: 'home' })
  }).catch(error => {
    const errorCode = error.code
    const errorMsg = error.message
    console.error(errorCode, errorMsg)
  })
}
</script>

<template>
  <div class="signup-form">
    <InputComponent :label="'name'" :type="'text'" :name="'name'" required v-model:value="name" />
    <InputComponent :label="'lastname'" :type="'text'" :name="'lastname'" required v-model:value="lastname" />
    <InputComponent :label="'email'" :type="'email'" :name="'email'" required v-model:value="email" />
    <InputComponent :label="'password'" :type="'password'" :name="'password'" required v-model:value="pwd" />
    <p v-if="showErrorMsg" class="text-red-500">All fields are required</p>
    <button class="signup-form-btn" @click="signup">
      signup
    </button>
    <RouterLink class="signup-form-btn" to="/login">
      login
    </RouterLink>
  </div>
</template>

<style scoped>
.signup-form {
  @apply px-2;
}

.signup-form-label,
.signup-form-input {
  @apply w-full block py-2 mb-2 rounded-lg;
}

.signup-form-label {
  @apply capitalize;
}

.signup-form-input {
  @apply mt-2 px-0.5 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}

.signup-form-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}

.signup-form-btn {
  @apply inline-block w-full p-4 mt-2 rounded-lg text-center capitalize;
  background-color: var(--color-background-mute);
}

.signup-form-btn:hover {
  background-color: var(--color-background-soft);
}
</style>