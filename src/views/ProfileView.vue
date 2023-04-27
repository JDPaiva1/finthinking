<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logOut } from '@/helpers/auth.helper';
import { useStore } from '@/stores/store';

const router = useRouter(),
  store = useStore();

function signOutBtn() {
  logOut().then(() => {
    router.push({ name: 'login' });
  }).catch((error) => {
    console.error(error);
  });
}
</script>

<template>
  <main class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mx-auto w-full max-w-sm">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        {{ store.fullname }}
      </h2>
    </div>

    <button class="form-btn" @click="signOutBtn()">
      Sign out
    </button>
  </main>
</template>

<style scoped>
button.form-btn {
  @apply mt-10;
}
</style>
