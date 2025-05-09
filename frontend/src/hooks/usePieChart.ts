import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactionService';
import { CategoryService } from '../services/categoryService';

export const usePieChart = (
  transactionType: 'income' | 'expense',
  timeframe: 'current' | 'previous',
) => {
  const [data, setData] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [transactions, categories] = await Promise.all([
          TransactionService.getAll(),
          transactionType === 'income'
            ? CategoryService.getIncomeCategories()
            : CategoryService.getExpenseCategories(),
        ]);

        const currentDate = new Date();
        const targetDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + (timeframe === 'current' ? 0 : -1),
        );

        const filteredTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === targetDate.getMonth() &&
            transactionDate.getFullYear() === targetDate.getFullYear() &&
            transaction.transaction_type === transactionType
          );
        });

        const categoryMap = categories.reduce(
          (acc, category) => ({ ...acc, [category.id]: category.name }),
          {} as Record<number, string>,
        );

        const chartData = filteredTransactions.reduce(
          (acc, transaction) => {
            const categoryName = categoryMap[transaction.category_id] || 'Unknown';
            acc[categoryName] = (acc[categoryName] || 0) + Math.abs(transaction.amount);
            return acc;
          },
          {} as Record<string, number>,
        );

        setData(chartData);
      } catch (error) {
        console.error(`Error loading ${transactionType} chart data:`, error);
        setError(`Failed to load ${transactionType} data. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeframe, transactionType]);

  return { data, isLoading, error };
};
