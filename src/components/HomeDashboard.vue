<script setup lang="ts">
import { ref } from 'vue';

const balance = ref(9400);
const income = ref(5000);
const expenses = ref(12000);
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard-balance-title">Account Balance</h2>
    <h1 class="dashboard-balance">€ {{ balance }}</h1>

    <div class="dashboard-widget-container">
      <div class="dashboard-widget bg-green-800">
        <p class="dashboard-widget-text">Income</p>
        <p class="dashboard-widget-balance">€ {{ income }}</p>
      </div>
      <div class="dashboard-widget bg-red-800">
        <p class="dashboard-widget-text">Expense</p>
        <p class="dashboard-widget-balance">€ {{ expenses }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  @apply rounded-[32px] text-center;
}
.dashboard-balance {
  @apply text-4xl font-semibold mb-7;
  color: var(--color-heading);
}
.dashboard-balance-title {
  @apply text-sm mb-2;
}
.dashboard-widget-container {
  @apply w-full flex gap-8 justify-between text-white;
}
.dashboard-widget {
  @apply rounded-3xl p-4 w-full;
}
.dashboard-widget-text {
  @apply text-sm font-medium;
}
.dashboard-widget-balance {
  @apply text-xl font-semibold;
}
</style>
