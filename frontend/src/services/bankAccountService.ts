import { BankAccount } from '../types/bankAccountTypes';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const BankAccountService = {
  create: async (bankAccount: Omit<BankAccount, 'id'>) => {
    const response = await fetch(`${API_BASE}/api/bank_accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({
        bank_account: {
          ...bankAccount,
          user_id: 1,
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
    const response = await fetch(`${API_BASE}/api/bank_accounts?user_id=1`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch accounts');
    }
    const data = await response.json();
    return data.map((account: BankAccount) => ({
      ...account,
      balance: Number(account.balance),
      created_at: account.created_at || new Date().toISOString(),
    }));
  },
};
