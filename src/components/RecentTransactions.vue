<script setup lang="ts">
import TransactionComponent from '@/components/TransactionComponent.vue'
import { useTransactionStore } from '@/stores/store'

const store = useTransactionStore()
</script>

<template>
  <div class="recent-transactions">
    <h3 class="recent-transactions-title">
      Recent Transaction
    </h3>
    <template v-for="(transaction, index) in store.transactions" :key="index">
      <TransactionComponent :transaction="transaction"/>
    </template>
  </div>
</template>

<style scoped>
.recent-transactions-title {
  @apply font-semibold text-lg py-4 mt-2;
}
</style>
