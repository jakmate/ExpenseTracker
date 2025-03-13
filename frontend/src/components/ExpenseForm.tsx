import { useState, useEffect } from 'react';
import { TransactionForm } from './TransactionForm';
import {
  fetchCategories,
  fetchBankAccounts,
  createTransaction,
} from '../services/transactionService';
import { Transaction } from '../types/transactionTypes';
import { Category } from '../types/categoryTypes';
import { BankAccount } from '../types/bankAccountTypes';

export function ExpenseForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, accounts] = await Promise.all([
          fetchCategories('expense'),
          fetchBankAccounts(),
        ]);

        if (!cats.length) {
          throw new Error('No expense categories found');
        }

        if (!accounts.length) {
          throw new Error('No bank accounts found');
        }

        setCategories(cats);
        setBankAccounts(accounts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleExpenseSubmit = async (data: Omit<Transaction, 'id'>) => {
    try {
      await createTransaction(data);
      console.log('Expense created successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error creating expense:', errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TransactionForm
      type='expense'
      categories={categories}
      bankAccounts={bankAccounts}
      onSubmit={handleExpenseSubmit}
    />
  );
}
