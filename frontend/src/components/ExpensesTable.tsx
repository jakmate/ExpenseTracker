import { useEffect, useState } from 'react';
import { Transaction } from '../types/transactionTypes';
import { TransactionService } from '../services/transactionService';
import { CategoryService } from '../services/categoryService';
import { BankAccountService } from '../services/bankAccountService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
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
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch expenses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [refreshTrigger]);

  return (
    <div className='mx-auto w-full relative min-h-[400px]'>
      {isLoading && (
        <div className='absolute inset-0 flex justify-center items-center'>
          <LoadingSpinner size={60} />
        </div>
      )}

      {error && (
        <div className='absolute inset-0 flex justify-center items-center'>
          <ErrorMessage error={error} />
        </div>
      )}

      {!isLoading && !error && (
        <div className='rounded-lg border border-gray-200 shadow'>
          <table className='w-full divide-y divide-gray-200'>
            <thead className='bg-slate-50'>
              <tr>
                {['Date', 'Description', 'Amount'].map((header) => (
                  <th
                    key={header}
                    className='px-4 py-3 text-left text-sm font-medium text-slate-500 uppercase tracking-wider'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className='px-4 py-3 text-sm text-slate-600'>
                    {new Date(expense.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className='px-4 py-3 text-sm text-slate-800'>{expense.description}</td>
                  <td className='px-4 py-3 text-sm text-right font-medium text-red-600'>
                    £{Math.abs(expense.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
