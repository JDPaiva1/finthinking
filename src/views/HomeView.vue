<script setup lang="ts">
import HomeDashboard from '@/components/HomeDashboard.vue';
import TransactionsList from '@/components/TransactionsList.vue';
import { useStore } from '@/stores/store';

const store = useStore();
</script>

<template>
  <main>
    <HomeDashboard />
    <TransactionsList :transactions="store.transactions"/>
  </main>
</template>
