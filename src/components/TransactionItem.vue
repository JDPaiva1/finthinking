<script setup lang="ts">
import type { Transaction } from '@/interfaces/types';
import { computed } from 'vue';

const props = defineProps<{
  transaction: Transaction,
}>();

// Format date
const date = computed(() => (
  new Date(props.transaction.date).toUTCString().substring(5,16)
));
</script>

<template>
  <div class="t-item">
    <div class="t-item-icon"></div>
    <div class="t-item-text">
      <p class="t-item-title">
        {{ transaction.title }}
      </p>
      <p :class="['t-item-amount', { 'expenses': transaction.amount < 0}]">
        € {{ transaction.amount }}
      </p>
      <p class="t-item-category">
        {{ transaction.category }}
      </p>
      <p class="text-xs">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.t-item {
  @apply mt-2 p-4 rounded-3xl flex gap-3 bg-vbg-soft;
}
.t-item-icon {
  @apply h-14 w-16 bg-gray-500 rounded-2xl;
}
.t-item-text {
  @apply w-full flex flex-wrap justify-between items-center font-medium text-base;
}
.t-item-title {
  @apply w-4/5;
}
.t-item-amount {
  @apply w-1/5 font-semibold text-green-800 text-end;
}
.t-item-amount.expenses {
  @apply text-red-800;
}
.t-item-category {
  @apply text-xs;
}
</style>