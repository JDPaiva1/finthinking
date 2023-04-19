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
  <RouterView />

  <header class="wrapper" v-if="route.name !== 'login' && route.name !== 'signup'">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/new">New</RouterLink>
      <a @click="signOutBtn">Sign-Out</a>
    </nav>
  </header>
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
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  @apply bg-transparent;
}

nav a {
  @apply inline-block py-0 px-4 border-l border-solid;
  border-left-color: var(--color-border);
}

nav a:first-of-type {
  @apply border-0;
}
</style>
