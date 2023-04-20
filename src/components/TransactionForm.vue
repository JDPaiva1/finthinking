<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores/store';
import type { Transaction } from '@/interfaces/types';
import InputComponent from '@/components/atoms/InputComponent.vue';

const title = ref<string>();
const amount = ref<number>();
const category = ref<string>();
const date = ref<string>();
const transaction = ref<Transaction>();

const todayDate = ref(new Date().toJSON().split('T')[0]);

const store = useStore();
const router = useRouter();
const route = useRoute();

const isEditForm = !!route.params?.id;

if(isEditForm) {
  store.getTransaction(route.params.id).then((data:Transaction) => {
    transaction.value = data;
    title.value = data.title;
    amount.value = data.amount;
    category.value = data.category;
    date.value = data.date;
  }).catch(error => {
    error;
  });
}

function getFormData():Transaction {
  return {
    title: title.value || '',
    amount: amount.value || 0,
    category: category.value || '',
    date: date.value || todayDate.value
  };
}

function saveTransaction() {
  if(!(title.value || amount.value || category.value || date.value)) {
    return;
  }

  if(isEditForm) {
    store.editTransaction(route.params.id, getFormData(), transaction.value);
  } else {
    store.addTransaction(getFormData());
  }

  router.push({ name: 'home' });
}

function deleteTransaction() {
  store.deleteTransaction(route.params.id, getFormData());
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="t-form">
    <InputComponent label="Title" type="text" name="title" required v-model:value="title" />
    <InputComponent label="Amount" type="number" name="amount" required v-model:value="amount" />
    <InputComponent label="Category" type="select" name="category" :options="store.categories" v-model:value="category" />
    <InputComponent label="Date" type="date" name="date" :max="todayDate" required v-model:value="date" />
    <button class="t-form-btn" @click="saveTransaction">
      {{ isEditForm ? 'Update Transaction' : 'Add Transaction' }}
    </button>
    <button v-if="isEditForm" class="t-form-btn text-red-500" @click="deleteTransaction">
      Delete Transaction
    </button>
  </div>
</template>

<style scoped>
.t-form {
  @apply px-2;
}

.t-form-btn {
  @apply w-full p-4 mt-2 rounded-lg;
  background-color: var(--color-background-mute);
}

.t-form-btn:hover {
  background-color: var(--color-background-soft);
}
</style>