import { Transaction } from '../types/transactionTypes';

export const TransactionService = {
  create: async (transactionData: Omit<Transaction, 'id'>) => {
    const response = await fetch(`http://localhost:3001/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({
        transaction: {
          ...transactionData,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to process transaction');
    }

    return response.json();
  },

  getAll: async (): Promise<Transaction[]> => {
    const response = await fetch('http://localhost:3001/api/transactions');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch transactions');
    }
    return response.json();
  },
};
