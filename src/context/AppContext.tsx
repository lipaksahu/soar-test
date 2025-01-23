import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, Card, Transaction, Contact } from './types';

// Initial state
const initialState: AppState = {
  user: {
    name: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    avatar: '/path-to-avatar.jpg'
  },
  cards: [
    {
      id: 1,
      balance: '$5,756',
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      isDark: true
    },
    {
      id: 2,
      balance: '$5,756',
      cardHolder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      isDark: false
    },
  ],
  transactions: [
    {
      id: 1,
      type: 'card',
      name: 'Deposit from my Card',
      date: '28 January 2021',
      amount: '-$850',
      isPositive: false
    },
    {
      id: 2,
      type: 'paypal',
      name: 'Deposit Paypal',
      date: '25 January 2021',
      amount: '+$2,500',
      isPositive: true
    },
    {
      id: 3,
      type: 'transfer',
      name: 'Jemi Wilson',
      date: '21 January 2021',
      amount: '+$5,400',
      isPositive: true
    }
  ],
  contacts: [
    {
      id: 1,
      name: 'Livia Bator',
      role: 'CEO',
      image: '/Mask Group.png'
    },
    {
      id: 2,
      name: 'Randy Press',
      role: 'Director',
      image: '/Mask_group_1.png'
    },
    {
      id: 3,
      name: 'Workman',
      role: 'Designer',
      image: '/Mask_group_2.png'
    }
  ]
};

// Action types
type Action = 
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'UPDATE_CARDS'; payload: Card[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_CONTACTS'; payload: Contact[] };

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'UPDATE_CARDS':
      return {
        ...state,
        cards: action.payload
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case 'UPDATE_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 