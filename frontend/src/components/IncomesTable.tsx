import { useEffect, useState } from 'react';
import { Transaction } from '../types/transactionTypes';
import { TransactionService } from '../services/transactionService';
import { CategoryService } from '../services/categoryService';
import { BankAccountService } from '../services/bankAccountService';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface Income extends Transaction {
  category_name: string;
  account_name: string;
}

interface IncomesTableProps {
  refreshTrigger: number;
}

export function IncomesTable({ refreshTrigger }: IncomesTableProps) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        setIsLoading(true);
        const [transactions, categories, accounts] = await Promise.all([
          TransactionService.getAll(),
          CategoryService.getIncomeCategories(),
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

        const incomes = transactions
          .filter((t) => t.transaction_type === 'income')
          .map((income) => ({
            ...income,
            category_name: categoryMap[income.category_id] || 'Unknown Category',
            account_name: accountMap[income.bank_account_id] || 'Unknown Account',
          }));

        setIncomes(incomes);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch incomes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncomes();
  }, [refreshTrigger]);

  return (
    <div className='w-full relative min-h-[300px]'>
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
        <div className='w-full overflow-x-auto'>
          <table className='w-full divide-y divide-gray-200 table-auto'>
            <thead className='bg-slate-50'>
              <tr>
                <th className='px-3 py-3 text-left text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-3 py-3 text-left text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider'>
                  Description
                </th>
                <th className='px-3 py-3 text-right text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {incomes.length === 0 ? (
                <tr>
                  <td colSpan={3} className='px-3 py-4 text-center text-sm text-slate-500'>
                    No incomes recorded
                  </td>
                </tr>
              ) : (
                incomes.map((income) => (
                  <tr key={income.id} className='hover:bg-slate-50'>
                    <td className='px-3 py-2 md:py-3 text-xs md:text-sm text-slate-600 whitespace-nowrap'>
                      {new Date(income.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className='px-3 py-2 md:py-3 text-xs md:text-sm text-slate-800'>
                      {income.description}
                    </td>
                    <td className='px-3 py-2 md:py-3 text-xs md:text-sm text-right font-medium text-green-600 whitespace-nowrap'>
                      £{Math.abs(income.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
