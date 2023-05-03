<script setup lang="ts">
import { useRouter } from 'vue-router';
import TransactionItem from '@/components/TransactionItem.vue';
import type { Transactions } from '@/interfaces/types';

defineProps<{ transactions: Transactions }>();

const router = useRouter();

function gotoEdit(id: string | number) {
  router.push(`/edit/${id}`);
}
</script>

<template>
  <div class="transactions-list">
    <h3 class="transactions-list-title">
      {{ $t('recentTransaction') }}
    </h3>
    <template v-for="(transaction, index) in transactions" :key="index">
      <TransactionItem :transaction="transaction" @click="gotoEdit(index)"/>
    </template>
  </div>
</template>

<style scoped>
.transactions-list-title {
  @apply font-semibold text-lg py-4 mt-2;
}
</style>
