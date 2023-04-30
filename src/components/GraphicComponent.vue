<script setup lang="ts">
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useStore();
const { transactions, transactionsLength } = storeToRefs(store);

const amounts = computed(() => {
  const amounts = [];
  for(const transaction of Object.values(transactions.value)) {
    amounts.push(Number(transaction.amount));
  }
  return amounts;
});

const amountToPixels = (amount: number) => {
  const min = Math.min(...amounts.value);
  const max = Math.max(...amounts.value);

  const amountAbs = amount + Math.abs(min);
  const minmax = Math.abs(max) + Math.abs(min);

  return 200 - ((amountAbs * 100) / minmax) * 2;
};

const points = computed(() => {
  return amounts.value.reduce((points, amount, i) => {
    const x = (300 / transactionsLength.value) * (i + 1);
    const y = amountToPixels(amount);
    return `${points} ${x},${y}`;
  }, `0, ${amountToPixels(amounts.value.length ? amounts.value[0] : 0)}`);
});

const zero = computed(() => {
  return amountToPixels(0);
});
</script>

<template>
  <div>
    <svg viewBox="0 0 300 200">
      <line stroke="#c4c4c4" stroke-width="2" x1="0" x2="300" :y1="zero" :y2="zero" />
      <polyline fill="none" stroke="blue" stroke-width="2" :points="points"/>
    </svg>
  </div>
</template>

<style scoped>
svg {
  @apply w-full;
}
</style>