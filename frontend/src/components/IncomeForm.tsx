import { useEffect, useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { BankAccountService } from '../services/bankAccountService';
import { CategoryService } from '../services/categoryService';
import { Category } from '../types/categoryTypes';
import { BankAccount } from '../types/bankAccountTypes';

export function IncomeForm({ onSuccess }: { onSuccess?: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    CategoryService.getIncomeCategories().then(setCategories);
    BankAccountService.getAll().then(setBankAccounts);
  }, []);

  return (
    <TransactionForm
      type='income'
      categories={categories}
      bankAccounts={bankAccounts}
      onSuccess={onSuccess}
    />
  );
}
