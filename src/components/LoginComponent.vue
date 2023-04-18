<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '@/helpers/auth.helper';
import InputComponent from '@/components/atoms/InputComponent.vue';

const email = ref();
const pwd = ref();
const showErrorMsg = ref('');

const router = useRouter();

function login() {
  signIn(email.value, pwd.value)
    .then(userCredential => {
      // Signed in 
      console.log(userCredential);
      router.push({ name: 'home' });
    })
    .catch(error => {
      showErrorMsg.value = error;
      console.error(error);
    });
}
</script>

<template>
  <div class="login-form">
    <InputComponent :label="'email'" :type="'email'" :name="'email'" required v-model:value="email" />
    <InputComponent :label="'password'" :type="'password'" :name="'password'" required v-model:value="pwd" />

    <p v-if="showErrorMsg" class="text-red-500">{{ showErrorMsg }}</p>
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

.login-form-btn {
  @apply inline-block w-full p-4 mt-2 rounded-lg text-center capitalize;
  background-color: var(--color-background-mute);
}

.login-form-btn:hover {
  background-color: var(--color-background-soft);
}
</style>