export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Card {
  id: number;
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  isDark?: boolean;
}

export interface Transaction {
  id: number;
  type: 'card' | 'paypal' | 'transfer';
  name: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface AppState {
  user: User;
  cards: Card[];
  transactions: Transaction[];
  contacts: Contact[];
} 