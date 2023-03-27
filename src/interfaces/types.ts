export interface Transaction {
  category: string
  amount: number
  title: string
  date: string
}

export interface Transactions {
  [transactionID: string]: Transaction
}

export interface User {
  name: string
  email: string
  wallets: object
}

export interface Users {
  [UserID: string]: User
}

export interface Wallet {
  name: string
  balance: number
  income: number
  expenses: number
  transactions: object
}

export interface Wallets {
  [WalletID: string]: Wallet
}
