<script setup lang="ts">
import { currencyFormatter } from '@/helpers/utils.helper';
import type { Transaction } from '@/interfaces/types';
import { computed } from 'vue';

const props = defineProps<{
  transaction: Transaction,
}>();

const isNegative = computed(() => props.transaction.amount < 0);
// Format date
const date = computed(() => (
  new Date(props.transaction.date).toUTCString().substring(5,16)
));
// Format amout
const amount = computed(() => (
  currencyFormatter(Math.abs(props.transaction.amount))
));
</script>

<template>
  <div class="t-item">
    <div class="t-item-icon">
      <template v-if="isNegative">
        <i class="icon-minus-circle"></i>
      </template>
      <template v-else>
        <i class="icon-plus-circle"></i>
      </template>
    </div>

    <div class="t-item-text-container">
      <div class="t-item-text">
        <p class="t-item-title">
          {{ transaction.title }}
        </p>
        <p :class="['t-item-amount', { 'expenses': isNegative}]">
          {{ amount }}
        </p>
      </div>

      <div class="t-item-text">
        <p class="t-item-category">
          {{ $t(transaction.category) }}
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