<script setup lang="ts">
import { useStore } from '@/stores/store';

const store = useStore();
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard-balance-title">Account Balance</h2>
    <h1 class="dashboard-balance">€ {{ store.balance }}</h1>

    <div class="dashboard-widget-container">
      <div class="dashboard-widget bg-green-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
        <div class="dashboard-widget-text-wrapper">
          <p class="dashboard-widget-text">Income</p>
          <p class="dashboard-widget-balance">€ {{ store.income }}</p>
        </div>
      </div>
      <div class="dashboard-widget bg-red-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
        </svg>
        <div class="dashboard-widget-text-wrapper">
          <p class="dashboard-widget-text">Expenses</p>
          <p class="dashboard-widget-balance">€ {{ store.expenses }}</p>
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
