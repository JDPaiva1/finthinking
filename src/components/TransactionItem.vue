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
    <div class="t-item-icon">
      <template v-if="transaction.amount < 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clip-rule="evenodd" />
        </svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
        </svg>
      </template>
    </div>

    <div class="t-item-text-container">
      <div class="t-item-text">
        <p class="t-item-title">
          {{ transaction.title }}
        </p>
        <p :class="['t-item-amount', { 'expenses': transaction.amount < 0}]">
          € {{ transaction.amount }}
        </p>
      </div>

      <div class="t-item-text">
        <p class="t-item-category">
          {{ transaction.category }}
        </p>
        <p class="text-xs">
          {{ date }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.t-item {
  @apply mt-2 p-4 rounded-3xl flex gap-3 bg-vbg-soft;
}
.t-item-icon {
  @apply h-14 w-16 bg-gray-500 text-white rounded-2xl flex justify-center items-center;
}
.t-item-text-container {
  @apply flex flex-wrap w-full content-between py-1;
}
.t-item-text {
  @apply w-full flex flex-wrap justify-between items-center font-medium text-base;
}
.t-item-amount {
  @apply font-semibold text-green-800 text-end;
}
.t-item-amount.expenses {
  @apply text-red-800;
}
.t-item-category {
  @apply text-xs;
}
</style>