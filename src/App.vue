<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="navbar" v-if="route.name !== 'login' && route.name !== 'signup' && route.name !== 'forgot'">
    <RouterLink to="/" class="navbar-link" v-if="route.name !== 'home'">
      <i class="icon-arrow-left"></i>
    </RouterLink>
    <RouterLink to="/profile" class="navbar-link" v-else>
      <i class="icon-user-circle"></i>
    </RouterLink>
    <h3 class="navbar-title">{{ route.name }}</h3>
  </header>

  <RouterView />

  <RouterLink to="/new" class="add-button" v-if="route.name == 'home'">
    <i class="icon-plus"></i>
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
.add-button .icon-plus {
  @apply text-4xl;
}
</style>
