<script setup lang="ts">
import { Capacitor } from '@capacitor/core';
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute();
const isIos = Capacitor.getPlatform() == 'ios';

const showBottomTabBar = computed(() => route.name !== 'login' && route.name !== 'signup' && route.name !== 'forgot');
const showAddButton = computed(() => route.name == 'home');
const showHeader = computed(() => route.name == 'edit' || route.name == 'new');
</script>

<template>
  <header class="navbar" v-if="showHeader">
    <RouterLink to="/" class="navbar-link">
      <i class="icon-arrow-left"></i>
    </RouterLink>
    <h3 class="navbar-title">
      {{ $t(`nav.${route.name?.toString().toLocaleLowerCase()}`) }}
    </h3>
  </header>

  <main class="pb-20" :class="{'pb-24': isIos}">
    <RouterView />
  </main>

  <RouterLink to="/new" class="add-button" v-if="showAddButton">
    <i class="icon-plus"></i>
  </RouterLink>
  <nav class="bottom-tab-bar" :class="{'menu-ios': isIos}" v-if="showBottomTabBar">
    <RouterLink to="/">
      <i class="icon-home"></i>
      {{ $t('nav.home') }}
    </RouterLink>
    <RouterLink to="/graphic">
      <i class="icon-chart-pie"></i>
      {{ $t('nav.graphic') }}
    </RouterLink>
    <RouterLink to="/profile">
      <i class="icon-user-circle"></i>
      {{ $t('nav.profile') }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  @apply leading-[1.5] max-h-screen h-16 p-4 w-full relative flex justify-center items-center;
}
.navbar-link {
  @apply absolute left-2 top-1/2 -translate-y-1/2 text-vprimary hover:text-vprimary-hover;
}
.navbar-title {
  @apply mx-auto capitalize;
}
.add-button {
  @apply fixed bottom-20 right-8 h-14 w-14 rounded-full bg-vprimary hover:bg-vprimary-hover text-white flex justify-center content-center items-center z-50;
}
.add-button .icon-plus {
  @apply text-4xl;
}
.bottom-tab-bar {
  @apply fixed h-[70px] bottom-0 inset-x-0 bg-vbg flex justify-around items-center text-center rounded-t-3xl shadow-2xl shadow-vtext;
  /* box-shadow: 0 -8px 16px #e5e5e5; */
}
.bottom-tab-bar i {
  @apply block;
}
.bottom-tab-bar a:hover:not(.router-link-exact-active) {
  @apply text-vprimary-hover;
}
.bottom-tab-bar.menu-ios {
  @apply pb-3.5;
}
.bottom-tab-bar .router-link-exact-active {
  @apply text-vprimary;
}
</style>
