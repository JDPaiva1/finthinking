<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="h-16 p-4 w-full relative flex justify-center items-center" v-if="route.name !== 'login' && route.name !== 'signup' && route.name !== 'forgot' && route.name !== 'home'">
    <RouterLink to="/" class="absolute left-2 top-1/2 -translate-y-1/2 dark:text-indigo-400 text-indigo-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </RouterLink>
    <h3 class="mx-auto capitalize">{{ route.name }}</h3>
  </header>
  <RouterView />

  <RouterLink to="/new" class="add-button" v-if="route.name == 'home'">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </RouterLink>
</template>

<style scoped>
.add-button {
  @apply fixed bottom-8 right-8 h-14 w-14 rounded-full bg-indigo-600 text-white flex justify-center content-center items-center;
}
</style>
