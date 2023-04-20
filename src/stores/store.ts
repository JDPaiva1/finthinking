import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Transaction, Transactions } from '@/interfaces/types';
import useDb from '@/helpers/database.helper';
import { orderByDate } from '@/helpers/utils.helper';
import { getCurrentUID } from '@/helpers/auth.helper';

export const useStore = defineStore('store', () => {
  const transactions = ref<Transactions>();
  const categories = ref<string[]>();
  const balance = ref(0);
  const expenses = ref(0);
  const income = ref(0);

  let txnDb:useDb;
  let walletDb:useDb;

  const userDb = new useDb(`/users/${getCurrentUID()}/`);
  userDb.get('/wallets').then(wallets => {
    const wallet = Object.keys(wallets)[0];

    txnDb = new useDb(`/wallets/${wallet}/transactions`);

    txnDb.fetchAll((data: Transactions) => {
      transactions.value = orderByDate(data);
    }, {});

    walletDb = new useDb(`/wallets/${wallet}`);

    walletDb.fetchAll((data:{balance:number, expenses:number, income:number}) => {
      balance.value = data.balance as number;
      expenses.value = data.expenses as number;
      income.value = data.income as number;
    }, {});
  }).catch(error => console.error('error getting wallet', error));

  const categoriesDb = new useDb('/categories');

  categoriesDb.fetchAll((data:string[]) => {
    categories.value = data;
  }, {});

  function addTransaction(transaction:Transaction) {
    txnDb.add(transaction);
    updateBalance(Number(transaction.amount));
  }

  function getTransaction(id: string | string[]) {
    return txnDb.get(`${id}`) as Promise<Transaction>;
  }

  function editTransaction(id: string | string[], transaction: Transaction, oldValue?: Transaction) {
    txnDb.update(`${id}`, transaction);
    if(oldValue) {
      updateBalance(Number(transaction.amount), Number(oldValue?.amount));
    }
  }

  function deleteTransaction(id: string | string[], transaction: Transaction) {
    txnDb.delete(`${id}`);
    updateBalance(Number(transaction.amount), 'delete');
  }

  function updateBalance(v = 0, option?:string|number) {
    const newAmount = Number(v);
    const update = {
      balance: balance.value,
      expenses: expenses.value,
      income: income.value
    };

    const deleteValue = (subtractNumber:number) => {
      update.balance = balance.value + subtractNumber * -1;

      if (subtractNumber < 0) {
        update.expenses = expenses.value - subtractNumber;
      } else if (subtractNumber > 0) {
        update.income = income.value - subtractNumber;
      }
    };

    const addValue = (addNumber:number) => {
      update.balance = balance.value + addNumber;

      if (addNumber < 0) {
        update.expenses = expenses.value + addNumber;
      } else if (addNumber > 0) {
        update.income = income.value + addNumber;
      }
    };

    if (typeof option === 'string') {
      deleteValue(newAmount);
    } else if (typeof option === 'number') {
      const oldAmount = Number(option);
      update.balance = balance.value + oldAmount * -1;

      if (oldAmount < 0) {
        update.expenses = expenses.value - oldAmount;
      } else if (oldAmount > 0) {
        update.income = income.value - oldAmount;
      }

      update.balance = update.balance + newAmount;

      if (newAmount < 0) {
        update.expenses = update.expenses + newAmount;
      } else if (newAmount > 0) {
        update.income = update.income + newAmount;
      }
    } else {
      addValue(newAmount);
    }

    walletDb.update('/', update);
  }

  return {
    transactions,
    categories,
    balance,
    expenses,
    income,
    addTransaction,
    getTransaction,
    editTransaction,
    deleteTransaction
  };
});