import type { Transactions } from '@/interfaces/types'

export function orderByDate(transactions: Transactions) {
  const sorted = Object.entries(transactions)
    .reverse()
    .sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime())

  const obj: Transactions = {}

  for (const element of sorted) {
    obj[element[0]] = element[1]
  }

  return obj
}
