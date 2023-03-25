<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
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
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  @apply border-0;
}

@media (min-width: 1024px) {
  header {
    @apply flex place-items-center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    @apply m-0 mr-8;
  }

  header .wrapper {
    @apply flex place-items-start flex-wrap;
  }

  nav {
    @apply text-left -ml-4 text-base pt-4 mt-4;
  }
}
</style>
