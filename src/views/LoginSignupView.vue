<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import LoginComponent from '@/components/LoginComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';
import { onAuthChanged } from '@/helpers/auth.helper';
import type { User } from 'firebase/auth';

const router = useRouter();
const route = useRoute();

const isLogin = computed(() => route.name === 'login');

onAuthChanged((user: User | null) => {
  if(user) {
    router.push({name: 'home'});
  }
});
</script>

<template>
  <main class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mx-auto w-full max-w-sm">
      <img class="mx-auto h-24 w-auto" src="@/assets/logo.svg" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        {{ isLogin ? 'Sign in to your account' : 'Create a new account'}}
      </h2>
    </div>

    <div class="mt-10 mx-auto w-full max-w-sm">
      <template v-if="isLogin">
        <LoginComponent />
      </template>
      <template v-else>
        <SignupComponent />
      </template>
    </div>
  </main>
</template>
