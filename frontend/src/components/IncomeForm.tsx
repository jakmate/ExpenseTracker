import { useState, useEffect } from 'react';
import { TransactionForm } from './TransactionForm';
import { fetchCategories, fetchBankAccounts, createTransaction } from '../services/transactionService';
import { Transaction } from '../types/transactionTypes';
import { Category } from '../types/categoryTypes';
import { BankAccount } from '../types/bankAccountTypes';

export function IncomeForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, accounts] = await Promise.all([
          fetchCategories('income'),
          fetchBankAccounts()
        ]);
        
        if (!cats.length) {
          throw new Error('No income categories found');
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

  const handleIncomeSubmit = async (data: Omit<Transaction, "id">) => {
    try {
      await createTransaction(data);
      // Handle success
      console.log('Income created successfully');
    } catch (err) {
      console.error('Error creating income:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TransactionForm
      type="income"
      categories={categories}
      bankAccounts={bankAccounts}
      onSubmit={handleIncomeSubmit}
    />
  );
}