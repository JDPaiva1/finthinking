<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />

  <header class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
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

@media (min-width: 1024px) {
  header {
    @apply flex items-center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    @apply m-0 mr-8;
  }

  header.wrapper {
    @apply flex items-start flex-wrap;
  }

  nav {
    @apply text-left -ml-4 text-base pt-4 mt-4;
  }
}
</style>
