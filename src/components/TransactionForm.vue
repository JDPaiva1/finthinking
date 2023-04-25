<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores/store';
import type { Transaction } from '@/interfaces/types';
import InputComponent from '@/components/atoms/InputComponent.vue';

const todayDate = new Date().toJSON().split('T')[0],
  txnForm = ref<Transaction>({ title: '', amount: 0, category: '', date: todayDate }),
  isIncome = ref(false),
  store = useStore(),
  router = useRouter(),
  route = useRoute(),
  isEditForm = !!route.params?.id;

if(isEditForm) {
  store.getTransaction(route.params.id).then((data: Transaction) => {
    txnForm.value = data;
    isIncome.value = txnForm.value.amount > 0;
  }).catch(error => {
    error;
  });
}

function saveTransaction() {
  if (!(txnForm.value.title || txnForm.value.amount || txnForm.value.category || txnForm.value.date)) {
    return;
  }

  updateAmountSign();

  if(isEditForm) {
    store.editTransaction(route.params.id, txnForm.value);
  } else {
    store.addTransaction(txnForm.value);
  }

  router.push({ name: 'home' });
}

function deleteTransaction() {
  store.deleteTransaction(route.params.id);
  router.push({ name: 'home' });
}

function toggle() {
  isIncome.value = !isIncome.value;
  updateAmountSign();
}

function updateAmountSign() {
  txnForm.value.amount = isIncome.value ? Math.abs(txnForm.value.amount) : -Math.abs(txnForm.value.amount);
}
</script>

<template>
  <label for="switch" class="t-form-switch">
    <input name="switch" type="checkbox" class="t-form-switch-input" v-model="isIncome">
    <span class="t-form-switch-span rounded-l-md bg-gray-300" :class="{ 'bg-red-600': !isIncome }" @click="toggle">Expense</span>
    <span class="t-form-switch-span rounded-r-md bg-gray-300" :class="{ 'bg-green-600': isIncome }" @click="toggle">Income</span>
  </label>
  <div class="t-form">
    <InputComponent label="Title" type="text" name="title" required v-model:value="txnForm.title" />
    <InputComponent label="Amount" type="number" name="amount" required v-model:value="txnForm.amount" />
    <InputComponent label="Category" type="select" name="category" :options="store.categories" v-model:value="txnForm.category" />
    <InputComponent label="Date" type="date" name="date" :max="todayDate" required v-model:value="txnForm.date" />
    <button class="form-btn" @click="saveTransaction">
      {{ isEditForm ? 'Update Transaction' : 'Add Transaction' }}
    </button>
    <button v-if="isEditForm" class="form-btn form-btn-error" @click="deleteTransaction">
      Delete Transaction
    </button>
  </div>
</template>

<style scoped>
.t-form {
  @apply flex min-h-full flex-1 flex-col justify-center px-2 py-8;
}

.t-form-switch {
  @apply flex w-full items-center p-2 rounded-md cursor-pointer text-black;
}
.t-form-switch-input {
  @apply hidden;
}
.t-form-switch-span {
  @apply w-full px-4 py-2;
}
</style>