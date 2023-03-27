<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/store'
import type { Transaction } from '@/interfaces/types'

const title = ref('')
const amount = ref(0)
const category = ref('')
const date = ref('')
const showErrorMsg = ref(false)
const store = useTransactionStore()

function saveTransaction() {
  if(!(title.value || amount.value || category.value || date.value)) {
    showErrorMsg.value = true
    return
  }

  const newTransaction:Transaction = {
    title: title.value,
    amount: amount.value,
    category: category.value,
    date: date.value
  }

  store.addTransaction(newTransaction)

  title.value = ''
  amount.value = 0
  category.value = ''
  date.value = ''
}
</script>

<template>
  <div>
    <div>
      <label for="title">Title</label>
      <input type="text" name="title" v-model="title"/>
    </div>
    <div>
      <label for="amount">Amount</label>
      <input type="number" name="amount" v-model="amount"/>
    </div>
    <div>
      <label for="category">Category</label>
      <input type="text" name="category" v-model="category"/>
    </div>
    <div for="date">
      <label>Date</label>
      <input type="date" name="date" v-model="date"/>
    </div>
    <p v-if="showErrorMsg" class="text-red-500">All fields are required</p>
    <button @click="saveTransaction">Add Transaction</button>
  </div>
</template>

<style scoped>
form {
  @apply px-2;
}
label, input {
  @apply w-full block py-2 mb-2 rounded-lg;
}
input {
  @apply mt-2 px-0.5 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}
input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
button {
  @apply w-full p-4 mt-2 rounded-lg;
  background-color: var(--color-background-mute);
}
button:hover {
  background-color: var(--color-background-soft);
}
</style>