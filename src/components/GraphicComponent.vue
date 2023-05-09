<script setup lang="ts">
import type { Transactions } from '@/interfaces/types';
import { useStore } from '@/stores/store';
import { ref, computed } from 'vue';

const props = defineProps<{ transactions?: Transactions }>();
const store = useStore();
const transactions = ref(props.transactions ?? store.transactions);
const transactionsLength = computed(() => Object.keys(transactions.value).length);

const amounts = computed(() => {
  const amounts = [];
  for(const txn of Object.values(transactions.value).reverse()) {
    amounts.push(Number(txn.amount));
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
      <!-- <line stroke="var(--color-text)" stroke-width="2" x1="0" x2="300" :y1="zero" :y2="zero" /> -->
      <polyline fill="none" stroke="var(--color-primary)" stroke-width="2" :points="points"/>
    </svg>
  </div>
</template>

<style scoped>
svg {
  @apply w-full;
}
</style>