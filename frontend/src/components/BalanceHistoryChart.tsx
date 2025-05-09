import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { Transaction } from '../types/transactionTypes';
import { BankAccount } from '../types/bankAccountTypes';

interface BalanceHistoryChartProps {
  accountId: number | 'all';
  transactions: Transaction[];
  bankAccounts: BankAccount[];
}

export const BalanceHistoryChart = ({
  accountId,
  transactions,
  bankAccounts,
}: BalanceHistoryChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const processData = () => {
      if (accountId === 'all') {
        return calculateTotalBalanceHistory(transactions, bankAccounts);
      }
      return calculateAccountBalanceHistory(accountId, transactions, bankAccounts);
    };

    const balanceData = processData();
    const ctx = chartRef.current.getContext('2d');

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: balanceData.map((d) => new Date(d.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Account Balance',
            data: balanceData.map((d) => d.balance),
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB55',
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Balance History',
            font: { size: 18 },
          },
          tooltip: {
            callbacks: {
              label: (context) => `Balance: $${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Date' },
            grid: { display: false },
          },
          y: {
            title: { display: true, text: 'Amount' },
            beginAtZero: false,
          },
        },
      },
    });
  }, [accountId, transactions, bankAccounts]);

  const calculateAccountBalanceHistory = (
    accountId: number,
    transactions: Transaction[],
    bankAccounts: BankAccount[],
  ) => {
    const account = bankAccounts.find((acc) => acc.id === accountId);
    if (!account) return [];

    const startDate = account.created_at || new Date().toISOString();
    let balance = account.balance;
    const history = [{ date: startDate, balance }];

    transactions
      .filter((t) => t.bank_account_id === accountId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach((transaction) => {
        balance += transaction.amount;
        history.push({
          date: transaction.date,
          balance: Number(balance.toFixed(2)),
        });
      });

    return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const calculateTotalBalanceHistory = (
    transactions: Transaction[],
    bankAccounts: BankAccount[],
  ) => {
    const events: Array<{ date: string; amount: number }> = [];

    bankAccounts.forEach((account) => {
      events.push({
        date: account.created_at || new Date().toISOString(),
        amount: Number(account.balance) || 0,
      });
    });

    transactions.forEach((transaction) => {
      events.push({
        date: transaction.date,
        amount: Number(transaction.amount) || 0,
      });
    });

    events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    let totalBalance = 0;
    const history: { date: string; balance: number }[] = [];

    events.forEach((event) => {
      totalBalance += event.amount;
      history.push({
        date: event.date,
        balance: Number(totalBalance.toFixed(2)),
      });
    });

    const dateMap = new Map<string, number>();
    history.forEach((entry) => {
      dateMap.set(entry.date, entry.balance);
    });

    const consolidatedHistory = Array.from(dateMap, ([date, balance]) => ({
      date,
      balance,
    }));

    consolidatedHistory.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return consolidatedHistory;
  };

  return (
    <div className='h-96'>
      <canvas ref={chartRef} className='w-full h-full' />
    </div>
  );
};
