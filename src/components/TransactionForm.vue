<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/store'
import type { Transaction } from '@/interfaces/types'

const title = ref<string>()
const amount = ref<number>()
const category = ref<string>()
const date = ref<string>()

const showErrorMsg = ref(false)
const todayDate = ref(new Date().toJSON().split('T')[0])

const store = useTransactionStore()
const router = useRouter()
const route = useRoute()

const isEditForm = !!route.params?.id

if(isEditForm) {
  store.getTransaction(route.params.id).then((data:Transaction) => {
    title.value = data.title
    amount.value = data.amount
    category.value = data.category
    date.value = data.date
  }).catch(error => {
    error
  })
}

function getFormData():Transaction {
  return {
    title: title.value || '',
    amount: amount.value || 0,
    category: category.value || '',
    date: date.value || todayDate.value
  }
}

function saveTransaction() {
  if(!(title.value || amount.value || category.value || date.value)) {
    showErrorMsg.value = true
    return
  }

  const newTransaction:Transaction = getFormData()

  if(isEditForm) {
    store.editTransaction(route.params.id, newTransaction)
  } else {
    store.addTransaction(newTransaction)
  }

  router.push({name: 'home'})
}

function deleteTransaction() {
  store.deleteTransaction(route.params.id)
  router.push({name: 'home'})
}
</script>

<template>
  <div class="t-form">
    <div class="t-form-wrapper">
      <label class="t-form-label" for="title">
        Title
      </label>
      <input class="t-form-input" type="text" name="title" required v-model="title"/>
    </div>
    <div class="t-form-wrapper">
      <label class="t-form-label" for="amount">
        Amount
      </label>
      <input class="t-form-input" type="number" name="amount" required v-model="amount"/>
    </div>
    <div class="t-form-wrapper">
      <label class="t-form-label" for="category">
        Category
      </label>
      <select class="t-form-input" name="category" v-model="category">
        <option v-for="(c, index) in store.categories" :key="index" :value="c">
          {{ c }}
        </option>
      </select>
    </div>
    <div class="t-form-wrapper">
      <label class="t-form-label" for="date">
        Date
      </label>
      <input class="t-form-input" type="date" name="date" :max="todayDate" required v-model="date"/>
    </div>
    <p v-if="showErrorMsg" class="text-red-500">All fields are required</p>
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
.t-form-label, .t-form-input {
  @apply w-full block py-2 mb-2 rounded-lg;
}
.t-form-label {
  @apply capitalize;
}
.t-form-input {
  @apply mt-2 px-0.5 border-0 border-b-2 focus:ring-0;
  background-color: var(--color-background-mute);
  border-color: var(--color-border);
}
.t-form-input:focus {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
.t-form-btn {
  @apply w-full p-4 mt-2 rounded-lg;
  background-color: var(--color-background-mute);
}
.t-form-btn:hover {
  background-color: var(--color-background-soft);
}
</style>