<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '@/helpers/auth.helper';
import InputComponent from '@/components/atoms/InputComponent.vue';

const email = ref();
const pwd = ref();
const showErrorMsg = ref('');

const router = useRouter();

function login(event: MouseEvent) {
  event.preventDefault();
  signIn(email.value, pwd.value)
    .then(() => {
      router.push({ name: 'home' });
    })
    .catch(error => {
      showErrorMsg.value = error.message ? error.message : error;
      console.error(error);
    });
}
</script>

<template>
  <div class="login-form">
    <InputComponent :label="'email'" :type="'email'" :name="'email'" required v-model:value="email" />
    <InputComponent :label="'password'" :type="'password'" :name="'password'" required v-model:value="pwd" />

    <p v-if="showErrorMsg" class="login-error">{{ showErrorMsg }}</p>

    <button class="form-btn" @click="$event => login($event)">
      Sign in
    </button>

    <div class="text-sm text-center pt-3">
      <RouterLink to="/forgot" class="form-link">Forgot your password?</RouterLink>
    </div>

    <p class="login-link-container">
      Not a member yet? 
      <RouterLink class="form-link" to="/signup">
        Create a new account
      </RouterLink>
    </p>
  </div>
</template>

<style scoped>
/* .login-form {
  @apply px-2;
} */
.login-error {
  @apply mt-2 text-sm text-red-600;
}
.login-link-container {
  @apply mt-10 text-center text-sm text-gray-500;
}
</style>