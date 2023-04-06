<script setup lang="ts">
import { useRoute } from 'vue-router'
import LoginComponent from '@/components/LoginComponent.vue'
import SignupComponent from '@/components/SignupComponent.vue'

const route = useRoute()
</script>

<template>
  <main>
    <template v-if="route.name === 'login'">
      <LoginComponent />
    </template>
    <template v-else>
      <SignupComponent />
    </template>
  </main>
</template>
