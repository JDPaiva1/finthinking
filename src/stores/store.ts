import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebaseConfig'
import { ref as firebaseRef, onValue } from 'firebase/database'
import type { Transactions } from '@/interfaces/types'

export const useTransactionStore = defineStore('transaction', () => {
  const transactionsRef = firebaseRef(db, 'transactions/')
  const transactions = ref<Transactions>()

  onValue(transactionsRef, snapshot => {
    const data = snapshot.val() as Transactions
    transactions.value = data
  })

  return { transactions }
})

