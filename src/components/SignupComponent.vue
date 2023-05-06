<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '@/helpers/auth.helper';
import InputComponent from '@/components/atoms/InputComponent.vue';

const name = ref<string>();
const lastname = ref<string>();
const email = ref<string>('');
const pwd = ref();
const showErrorMsg = ref('');

const router = useRouter();


function signup() {
  signUp(email.value, pwd.value, name.value, lastname.value).then(() => {
    router.push({ name: 'home' });
  }).catch(error => {
    showErrorMsg.value = error;
    console.error('SignUp error', error);
  });
}
</script>

<template>
  <div class="signup-form">
    <InputComponent :label="'name'" :type="'text'" :name="'name'" required v-model:value="name" />
    <InputComponent :label="'lastname'" :type="'text'" :name="'lastname'" required v-model:value="lastname" />
    <InputComponent :label="'email'" :type="'email'" :name="'email'" required v-model:value="email" />
    <InputComponent :label="'password'" :type="'password'" :name="'password'" required v-model:value="pwd" />

    <p v-if="showErrorMsg" class="signup-error">{{ showErrorMsg }}</p>

    <button class="form-btn" @click="signup">
      {{ $t('signup') }}
    </button>

    <p class="signup-link-container">
      {{ $t('alreadyHaveAccount') }}
      <RouterLink class="form-link" to="/login">
        {{ $t('signin') }}
      </RouterLink>
    </p>
  </div>
</template>

<style scoped>
/* .signup-form {
  @apply px-2;
} */
.signup-error {
  @apply mt-2 text-sm text-vexpenses;
}
.signup-link-container {
  @apply mt-10 text-center text-sm text-gray;
}
</style>