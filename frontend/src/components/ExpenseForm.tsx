import { useEffect, useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { BankAccountService } from '../services/bankAccountService';
import { CategoryService } from '../services/categoryService';
import { Category } from '../types/categoryTypes';
import { BankAccount } from '../types/bankAccountTypes';

export function ExpenseForm({ onSuccess }: { onSuccess?: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    CategoryService.getExpenseCategories().then(setCategories);
    BankAccountService.getAll().then(setBankAccounts);
  }, []);

  return (
    <TransactionForm
      transaction_type='expense'
      categories={categories}
      bankAccounts={bankAccounts}
      onSuccess={onSuccess}
    />
  );
}
