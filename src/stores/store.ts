import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Transaction, Transactions } from '@/interfaces/types';
import useDb from '@/helpers/database.helper';
import { orderByDate } from '@/helpers/utils.helper';
import { getCurrentUID } from '@/helpers/auth.helper';

export const useStore = defineStore('store', () => {
  const transactions = ref<Transactions>({ '0': { category: '', amount: 0, title: '', date: new Date().toISOString() } });
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

  categoriesDb.fetchAll((data:string[]) => {
    categories.value = data;
  }, {});

  const balance = computed(() => {
    let balanceTmp = 0;
    for(const t in transactions.value) {
      balanceTmp += Number(transactions.value[t].amount);
    }
    return balanceTmp;
  });

  const getExpenses = computed(() => {
    const expensesTmpObj: Transactions = {};
    for (const t in transactions.value) {
      if (transactions.value[t].amount < 0) expensesTmpObj[t] = transactions.value[t];
    }
    return expensesTmpObj;
  });

  const expenses = computed(() => {
    let expensesTmp = 0;
    for(const t in getExpenses.value) {
      expensesTmp += Number(getExpenses.value[t].amount);
    }
    return expensesTmp;
  });

  const getIncome = computed(() => {
    const incomeTmpObj: Transactions = {};
    for (const t in transactions.value) {
      if (transactions.value[t].amount > 0) incomeTmpObj[t] = transactions.value[t];
    }
    return incomeTmpObj;
  });

  const income = computed(() => {
    let incomeTmp = 0;
    for (const t in getIncome.value) {
      incomeTmp += Number(getIncome.value[t].amount);
    }
    return incomeTmp;
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
    balance,
    getExpenses,
    expenses,
    getIncome,
    income,
    addTransaction,
    getTransaction,
    editTransaction,
    deleteTransaction
  };
});