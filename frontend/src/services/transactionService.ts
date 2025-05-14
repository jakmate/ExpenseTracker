import { Transaction } from '../types/transactionTypes';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const TransactionService = {
  create: async (transactionData: Omit<Transaction, 'id'>) => {
    const response = await fetch(`${API_BASE}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({
        transaction: {
          ...transactionData,
          transaction_type: transactionData.amount > 0 ? 'income' : 'expense',
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
    const response = await fetch(`${API_BASE}/api/transactions`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch transactions');
    }
    const data = await response.json();
    return data.map((transaction: Transaction) => ({
      ...transaction,
      amount: Number(transaction.amount),
      date: transaction.date || new Date().toISOString(),
    }));
  },
};
