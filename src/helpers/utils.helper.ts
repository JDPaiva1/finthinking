import type { Transaction, Transactions } from '@/interfaces/types';

export function orderByDate(transactions: Transactions) {
  const sorted = Object.entries(transactions)
    .reverse()
    .sort((a:any, b:any) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime());

  return arrayToTransactions(sorted);
}

export function arrayToTransactions(array: Array<[string, Transaction]>) {
  const obj: Transactions = {};

  for (const element of array) {
    obj[element[0]] = element[1];
  }

  return obj;
}

export function currencyFormatter(amount: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function isFieldValid(value: string | number | undefined, type: string):string {
  if(!value || (typeof value !== 'number' && !value.trim())) {
    return 'This field is required';
  } else if (typeof value == 'number') {
    return '';
  }

  if (type === 'password' && value.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (type === 'email' && !emailRegex.test(value)) {
    return 'Please enter a valid email';
  }

  return '';
}

export function validateEmail(value:string) {
  // if the field is empty
  if (!value) {
    return 'The email is required';
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'This field must be a valid email';
  }
  // All is good
  return true;
}

export function validatePassword(value: string) {
  // if the field is empty
  if (!value) {
    return 'The password is required';
  }
  // if the field is not a valid password
  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  // All is good
  return true;
}