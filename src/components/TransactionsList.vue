<script setup lang="ts">
import TransactionItem from '@/components/TransactionItem.vue'
import { useTransactionStore } from '@/stores/store'

const store = useTransactionStore()
</script>

<template>
  <div class="transactions-list">
    <h3 class="transactions-list-title">
      Recent Transaction
    </h3>
    <template v-for="(transaction, index) in store.transactions" :key="index">
      <TransactionItem :transaction="transaction"/>
    </template>
  </div>
</template>

<style scoped>
.transactions-list-title {
  @apply font-semibold text-lg py-4 mt-2;
}
</style>
