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
    <div class="mx-auto w-full max-w-sm text-center">
      <i class="icon-user-circle text-9xl"></i>
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
