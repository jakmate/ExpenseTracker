import { BankAccount } from './bankAccountTypes';
import { Category } from './categoryTypes';

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  category_id: number;
  bank_account_id: number;
  transaction_type?: 'income' | 'expense';
}

export interface TransactionFormProps {
  transaction_type: 'income' | 'expense';
  categories: Category[];
  bankAccounts: BankAccount[];
  onSuccess?: () => void;
}
