import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactionService';
import { BankAccountService } from '../services/bankAccountService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Transaction } from '../types/transactionTypes';
import { BankAccount } from '../types/bankAccountTypes';
import { BalanceHistoryChart } from '../components/BalanceHistoryChart';

export function Dashboard() {
  const [recentExpenses, setRecentExpenses] = useState<Transaction[]>([]);
  const [recentIncomes, setRecentIncomes] = useState<Transaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [transactions, accounts] = await Promise.all([
          TransactionService.getAll(),
          BankAccountService.getAll(),
        ]);

        setTransactions(transactions);

        const expenses = transactions
          .filter((t) => t.transaction_type === 'expense')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        const incomes = transactions
          .filter((t) => t.transaction_type === 'income')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setRecentExpenses(expenses);
        setRecentIncomes(incomes);
        setBankAccounts(accounts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner size={60} />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-4xl md:text-6xl font-bold text-white'>Dashboard</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <div className='bg-white rounded-lg p-4 shadow-lg'>
          <h3 className='text-xl font-bold mb-4 text-blue-900'>Recent Expenses</h3>
          <RecentTransactions transactions={recentExpenses} type='expense' />
        </div>

        <div className='bg-white rounded-lg p-4 shadow-lg'>
          <h3 className='text-xl font-bold mb-4 text-green-900'>Recent Income</h3>
          <RecentTransactions transactions={recentIncomes} type='income' />
        </div>
      </div>

      <div className='bg-white rounded-lg p-4 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-blue-900'>Balance History</h3>
          <select
            value={selectedAccount}
            onChange={(e) =>
              setSelectedAccount(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className='border rounded p-2'
          >
            <option value='all'>All Accounts</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))}
          </select>
        </div>
        <BalanceHistoryChart
          accountId={selectedAccount}
          transactions={transactions}
          bankAccounts={bankAccounts}
        />
      </div>
    </div>
  );
}

const RecentTransactions = ({
  transactions,
  type,
}: {
  transactions: Transaction[];
  type: 'expense' | 'income';
}) => {
  if (transactions.length === 0) {
    return <div className='text-gray-500'>No {type} transactions found</div>;
  }

  return (
    <table className='w-full'>
      <thead>
        <tr className='text-left border-b'>
          <th className='pb-2'>Date</th>
          <th className='pb-2'>Description</th>
          <th className='pb-2 text-right'>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className='border-b'>
            <td className='py-2'>{new Date(transaction.date).toLocaleDateString()}</td>
            <td className='py-2'>{transaction.description}</td>
            <td
              className={`py-2 text-right ${type === 'expense' ? 'text-red-600' : 'text-green-600'}`}
            >
              ${Math.abs(transaction.amount).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
