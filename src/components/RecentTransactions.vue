<script setup lang="ts">
import TransactionComponent from '@/components/TransactionComponent.vue'

const transactions = {
  $transaction_id: {
    category: 'Entertainment',
    amount: 30,
    title: 'Cashback Offer',
    date: 'Oct 30, 2021'
  },
  $transaction_id2: {
    category: 'Transportation',
    amount: -30,
    title: 'Cheesy Pizza',
    date: 'Oct 30, 2021'
  }
}
</script>

<template>
  <div class="recent-transactions">
    <h3 class="recent-transactions-title">
      Recent Transaction
    </h3>
    <template v-for="(transaction, index) in transactions" :key="index">
      <TransactionComponent :transaction="transaction"/>
    </template>
  </div>
</template>

<style scoped>
.recent-transactions-title {
  @apply font-semibold text-lg py-4 mt-2;
}
</style>
