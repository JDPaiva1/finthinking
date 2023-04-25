<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { logOut } from '@/helpers/auth.helper';

const router = useRouter();
const route = useRoute();

function signOutBtn() {
  logOut().then(() => {
    console.log('Sign-out successfully.');
    router.push({ name: 'login' });
  }).catch((error) => {
    console.error(error);
  });
}
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

  <nav class="wrapper" v-if="route.name !== 'login' && route.name !== 'signup' && route.name !== 'forgot'">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/new">New</RouterLink>
    <a @click="signOutBtn">Sign-Out</a>
  </nav>
</template>

<style scoped>
header {
  @apply leading-[1.5] max-h-screen;
}

.logo {
  @apply block mx-auto mb-8;
}

nav {
  @apply w-full text-[12px] text-center mt-8;
}

nav a.router-link-exact-active {
  @apply text-vtext;
}

nav a.router-link-exact-active:hover {
  @apply bg-transparent;
}

nav a {
  @apply inline-block py-0 px-4 border-l border-solid border-l-vborder;
}

nav a:first-of-type {
  @apply border-0;
}
</style>
