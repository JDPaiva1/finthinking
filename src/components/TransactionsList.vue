<script setup lang="ts">
import { useTransactionStore } from '@/stores/store';
import { useRouter } from 'vue-router';
import TransactionItem from '@/components/TransactionItem.vue';

const store = useTransactionStore();
const router = useRouter();

function gotoEdit(id: any) {
  router.push(`/edit/${id}`);
}
</script>

<template>
  <div class="transactions-list">
    <h3 class="transactions-list-title">
      Recent Transaction
    </h3>
    <template v-for="(transaction, index) in store.transactions" :key="index">
      <TransactionItem :transaction="transaction" @click="gotoEdit(index)"/>
    </template>
  </div>
</template>

<style scoped>
.transactions-list-title {
  @apply font-semibold text-lg py-4 mt-2;
}
</style>
