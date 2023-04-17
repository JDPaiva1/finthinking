import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Transaction, Transactions } from '@/interfaces/types';
import useDb from '@/helpers/database.helper';
import { orderByDate } from '@/helpers/utils.helper';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transactions>();
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
  ]);

  const txnDb = new useDb('transactions');

  txnDb.fetchAll((data: Transactions) => {
    transactions.value = orderByDate(data);
  });

  function addTransaction(transaction:Transaction) {
    txnDb.add(transaction);
  }

  function getTransaction(id: string | string[]) {
    return txnDb.get(`${id}`) as Promise<Transaction>;
  }

  function editTransaction(id: string | string[], transaction: Transaction) {
    txnDb.update(`${id}`, transaction);
  }

  function deleteTransaction(id: string | string[]) {
    txnDb.delete(`${id}`);
  }

  return {
    transactions,
    categories,
    addTransaction,
    getTransaction,
    editTransaction,
    deleteTransaction
  };
});