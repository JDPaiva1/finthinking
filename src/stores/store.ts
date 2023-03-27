import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebaseConfig'
import { ref as firebaseRef, onValue, set, push, child } from 'firebase/database'
import type { Transaction, Transactions } from '@/interfaces/types'

export const useTransactionStore = defineStore('transaction', () => {
  const transactionsRef = firebaseRef(db, 'transactions/')
  const transactions = ref<Transactions>()

  onValue(transactionsRef, snapshot => {
    const data = snapshot.val() as Transactions
    transactions.value = data
  })

  function addTransaction(transaction: Transaction) {
    const newKey = push(child(firebaseRef(db), 'transactions')).key

    set(firebaseRef(db, 'transactions/' + newKey), transaction)
  }
  return { transactions, addTransaction }
})

