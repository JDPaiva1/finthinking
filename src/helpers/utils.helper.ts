import type { Transactions } from '@/interfaces/types';

export function orderByDate(transactions: Transactions) {
  const sorted = Object.entries(transactions)
    .reverse()
    .sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime());

  const obj: Transactions = {};

  for (const element of sorted) {
    obj[element[0]] = element[1];
  }

  return obj;
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

  const emailRegex = /^[A-Za-z0-9._%+-]+[A-Za-z0-9_%+-]@[A-Za-z0-9_%+-]+[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (type === 'email' && !emailRegex.test(value)) {
    return 'Please enter a valid email';
  }

  return '';
}