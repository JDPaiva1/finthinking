import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Transaction, Transactions } from '@/interfaces/types';
import useDb from '@/helpers/database.helper';
import { orderByDate } from '@/helpers/utils.helper';
import { getCurrentUID } from '@/helpers/auth.helper';

export const useStore = defineStore('store', () => {
  const transactions = ref<Transactions>();
  const categories = ref<string[]>();

  let txnDb:useDb;

  const userDb = new useDb(`/users/${getCurrentUID()}/`);
  userDb.get('/wallets').then(wallets => {
    const wallet = Object.keys(wallets)[0];

    txnDb = new useDb(`/wallets/${wallet}/transactions`);

    txnDb.fetchAll((data: Transactions) => {
      transactions.value = orderByDate(data);
    }, {});
  }).catch(error => console.error('error getting wallet', error));

  const categoriesDb = new useDb('/categories');

  // const txnDb = new useDb(`/wallets/${'-NTDYPke5YSi7qiSdR5i'}/transactions`);
  // txnDb.fetchAll((data: Transactions) => {
  //   transactions.value = orderByDate(data);
  //   console.log('transactions', transactions.value);
  //   console.log('data', data);
  // }, {});

  categoriesDb.fetchAll((data:string[]) => {
    categories.value = data;
  }, {});

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