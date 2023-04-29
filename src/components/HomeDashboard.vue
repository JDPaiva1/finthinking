<script setup lang="ts">
import { computed } from 'vue';
import { currencyFormatter } from '@/helpers/utils.helper';
import { useStore } from '@/stores/store';

const store = useStore();
// Format
const balance = computed(() => currencyFormatter(store.balance));
const income = computed(() => currencyFormatter(store.income));
const expenses = computed(() => currencyFormatter(store.expenses));
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard-balance-title">Account Balance</h2>
    <h1 class="dashboard-balance">{{ balance }}</h1>

    <div class="dashboard-widget-container">
      <div class="dashboard-widget bg-green-800">
        <i class="icon-arrow-trending-up"></i>
        <div class="dashboard-widget-text-wrapper">
          <p class="dashboard-widget-text">Income</p>
          <p class="dashboard-widget-balance">{{ income }}</p>
        </div>
      </div>
      <div class="dashboard-widget bg-red-800">
        <i class="icon-arrow-trending-down"></i>
        <div class="dashboard-widget-text-wrapper">
          <p class="dashboard-widget-text">Expenses</p>
          <p class="dashboard-widget-balance">{{ expenses }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  @apply rounded-[32px] text-center;
}
.dashboard-balance {
  @apply text-4xl font-semibold mb-7 text-vheading;
}
.dashboard-balance-title {
  @apply text-sm mb-2;
}
.dashboard-widget-container {
  @apply w-full flex gap-8 justify-between text-white;
}
.dashboard-widget {
  @apply rounded-3xl p-4 w-full flex justify-around content-center items-center;
}
.dashboard-widget-text {
  @apply text-sm font-medium;
}
.dashboard-widget-balance {
  @apply text-xl font-semibold;
}
.dashboard-widget-text-wrapper {
  @apply text-center;
}
</style>
