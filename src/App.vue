<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="navbar" v-if="route.name !== 'login' && route.name !== 'signup' && route.name !== 'forgot'">
    <RouterLink to="/" class="navbar-link" v-if="route.name !== 'home'">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </RouterLink>
    <RouterLink to="/profile" class="navbar-link" v-else>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </RouterLink>
    <h3 class="navbar-title">{{ route.name }}</h3>
  </header>

  <RouterView />

  <RouterLink to="/new" class="add-button" v-if="route.name == 'home'">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </RouterLink>
</template>

<style scoped>
.navbar {
  @apply leading-[1.5] max-h-screen h-16 p-4 w-full relative flex justify-center items-center;
}
.navbar-link {
  @apply absolute left-2 top-1/2 -translate-y-1/2 dark:text-indigo-400 text-indigo-600;
}
.navbar-title {
  @apply mx-auto capitalize;
}
.add-button {
  @apply fixed bottom-8 right-8 h-14 w-14 rounded-full bg-indigo-600 text-white flex justify-center content-center items-center;
}
</style>
