import { useEffect, useState } from 'react';
import { Transaction } from '../types/transactionTypes';
import { TransactionService } from '../services/transactionService';
import { CategoryService } from '../services/categoryService';
import { BankAccountService } from '../services/bankAccountService';

interface Expense extends Transaction {
  category_name: string;
  account_name: string;
}

interface ExpensesTableProps {
  refreshTrigger: number;
}

export function ExpensesTable({ refreshTrigger }: ExpensesTableProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const [transactions, categories, accounts] = await Promise.all([
          TransactionService.getAll(),
          CategoryService.getExpenseCategories(),
          BankAccountService.getAll(),
        ]);

        const categoryMap = categories.reduce(
          (map, category) => ({ ...map, [category.id]: category.name }),
          {} as Record<number, string>,
        );

        const accountMap = accounts.reduce(
          (map, account) => ({ ...map, [account.id]: account.account_name }),
          {} as Record<number, string>,
        );

        const expenses = transactions
          .filter((t) => t.transaction_type === 'expense')
          .map((expense) => ({
            ...expense,
            category_name: categoryMap[expense.category_id] || 'Unknown Category',
            account_name: accountMap[expense.bank_account_id] || 'Unknown Account',
          }));

        setExpenses(expenses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, [refreshTrigger]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='mx-auto w-3/4 space-y-6'>
      <div className='rounded-lg border border-gray-200 shadow'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {['Date', 'Description', 'Category', 'Account', 'Amount'].map((header) => (
                <th
                  key={header}
                  className='px-6 py-3 text-left text-xs font-medium uppercase text-gray-500'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 text-sm text-gray-900'>{expense.description}</td>
                <td className='px-6 py-4 text-sm text-gray-900'>{expense.category_name}</td>
                <td className='px-6 py-4 text-sm text-gray-900'>{expense.account_name}</td>
                <td className='whitespace-nowrap px-6 py-4 text-sm text-red-600'>
                  ${Math.abs(expense.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
