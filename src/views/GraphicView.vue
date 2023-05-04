<script setup lang="ts">
import GraphicComponent from '@/components/GraphicComponent.vue';
import TransactionsList from '@/components/TransactionsList.vue';

import { useStore } from '@/stores/store';

const store = useStore();

const txn = store.getTransactionsByMonth(new Date().getMonth());
</script>

<template>
  <main class="">
    <GraphicComponent :transactions="txn"/>
    <TransactionsList :transactions="txn" title="thisMonth"/>
  </main>
</template>

<style scoped>
</style>
