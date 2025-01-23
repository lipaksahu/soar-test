import { User, Card, Transaction } from "../context/types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const dummyCards: Card[] = [
  {
    id: 1,
    balance: '5,756',
    cardHolder: 'Eddy Cusuma',
    validThru: '12/24',
    cardNumber: '3778 **** **** 1234',
    isDark: true
  },
  {
    id: 2,
    balance: '3,234',
    cardHolder: 'Eddy Cusuma',
    validThru: '01/25',
    cardNumber: '4455 **** **** 5677',
    isDark: false
  },
];

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    type: 'card',
    name: 'Deposit from my Card',
    date: '28 January 2024',
    amount: '-$850',
    isPositive: false
  },
  {
    id: 2,
    type: 'paypal',
    name: 'Deposit PayPal',
    date: '25 January 2024',
    amount: '+$2,500',
    isPositive: true
  },
  {
    id: 3,
    type: 'transfer',
    name: 'Jemi Wilson',
    date: '21 January 2024',
    amount: '+$5,400',
    isPositive: true
  },
  {
    id: 4,
    type: 'card',
    name: 'Netflix Subscription',
    date: '15 January 2024',
    amount: '-$14.99',
    isPositive: false
  },
  {
    id: 5,
    type: 'transfer',
    name: 'Sarah Parker',
    date: '14 January 2024',
    amount: '+$1,200',
    isPositive: true
  }
];

export const api = {
  async getUser() {
    await delay(500);
    return {
      name: 'Charlene Reed',
      email: 'charlenereed@gmail.com',
      avatar: '/path-to-avatar.jpg'
    };
  },

  async updateUser(userData: Partial<User>) {
    await delay(500);
    return userData;
  },

  async getCards() {
    await delay(500);
    return dummyCards;
  },

  async getTransactions() {
    await delay(500);
    return dummyTransactions;
  }
}; 