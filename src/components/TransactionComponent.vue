<script setup lang="ts">
defineProps<{
  transaction: {
    category: string,
    amount: number,
    title: string,
    date: string
  },
}>()
</script>

<template>
  <div class="transaction">
    <div class="transaction-icon"></div>
    <div class="transaction-text">
      <p class="transaction-title">
        {{ transaction.title }}
      </p>
      <p :class="['transaction-amount', { 'expenses': transaction.amount < 0}]">
        € {{ transaction.amount }}
      </p>
      <p class="text-xs">
        {{ transaction.category }}
      </p>
      <p class="text-xs">
        {{ transaction.date }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.transaction {
  @apply mt-2 p-4 rounded-3xl flex gap-3;
  background-color: var(--color-background-soft);
}
.transaction-icon {
  @apply h-14 w-16 bg-gray-500 rounded-2xl;
}
.transaction-text {
  @apply w-full flex flex-wrap justify-between font-medium text-base;
}
.transaction-title {
  @apply w-4/5;
}
.transaction-amount {
  @apply font-semibold grow-0 text-green-800;
}
.transaction-amount.expenses {
  @apply text-red-800;
}
</style>