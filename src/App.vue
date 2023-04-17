<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { auth } from '@/firebaseConfig';

const router = useRouter();

function signOutBtn() {
  signOut(auth).then(() => {
    console.log('Sign-out successfully.');
    router.push({ name: 'login' });
  }).catch((error) => {
    console.error(error);
    
  });
}
</script>

<template>
  <RouterView />

  <header class="wrapper">
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
