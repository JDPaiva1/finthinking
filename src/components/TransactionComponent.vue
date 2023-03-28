<script setup lang="ts">
import type { Transaction } from '@/interfaces/types'
import { computed } from 'vue';

const props = defineProps<{
  transaction: Transaction,
}>()

// Format date
const date = computed(() => (
  new Date(props.transaction.date).toUTCString().substring(5,16)
))
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
      <p class="transaction-category">
        {{ transaction.category }}
      </p>
      <p class="text-xs">
        {{ date }}
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
  @apply w-full flex flex-wrap justify-between items-center font-medium text-base;
}
.transaction-title {
  @apply w-4/5;
}
.transaction-amount {
  @apply w-1/5 font-semibold text-green-800 text-end;
}
.transaction-amount.expenses {
  @apply text-red-800;
}
.transaction-category {
  @apply text-xs;
}
</style>