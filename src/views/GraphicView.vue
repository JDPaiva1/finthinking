<script setup lang="ts">
import GraphicComponent from '@/components/GraphicComponent.vue';
import TransactionsList from '@/components/TransactionsList.vue';

import { useStore } from '@/stores/store';

const store = useStore();
</script>

<template>
  <main class="">
    <GraphicComponent />
    <TransactionsList :transactions="store.transactions"/>
  </main>
</template>

<style scoped>
</style>
