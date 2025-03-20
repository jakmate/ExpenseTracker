import { BankAccount } from '../types/bankAccountTypes';

export const BankAccountService = {
  create: async (bankAccount: Omit<BankAccount, 'id'>) => {
    const response = await fetch('http://localhost:3001/api/bank_accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({
        bank_account: {
          ...bankAccount,
          user_id: 1  ,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to create account');
    }

    return response.json();
  },

  getAll: async (): Promise<BankAccount[]> => {
    const response = await fetch('http://localhost:3001/api/bank_accounts?user_id=1');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch accounts');
    }
    return response.json();
  },
};
