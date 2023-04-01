import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebaseConfig'
import { ref as firebaseRef, onValue, set, push, child, query, limitToLast } from 'firebase/database'
import type { Transaction, Transactions } from '@/interfaces/types'

export const useTransactionStore = defineStore('transaction', () => {
  const transactionsRef = firebaseRef(db, 'transactions/')
  const transactions = ref<Transactions>()
  const categories = ref([
    'Housting',
    'Transportation',
    'Food',
    'Utilities',
    'Insurance',
    'Healthcare',
    'Saving & Spending',
    'Personal Spending',
    'Entertainment',
    'Miscellaneous'
  ])

  const fetchTransactions = query(transactionsRef, limitToLast(25))

  onValue(fetchTransactions, (snapshot) => {
    const data = snapshot.val() as Transactions
    transactions.value = orderByDate(data)
  })

  function addTransaction(transaction: Transaction) {
    const newKey = push(child(firebaseRef(db), 'transactions')).key

    set(firebaseRef(db, 'transactions/' + newKey), transaction)
  }
  return { transactions, categories, addTransaction }
})

function orderByDate(transactions:Transactions) {
  const sorted = Object.entries(transactions).reverse().sort(
    (a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime()
  )

  const obj:Transactions = {}

  for(const element of sorted) {
    obj[element[0]] = element[1]
  }

  return obj
}
