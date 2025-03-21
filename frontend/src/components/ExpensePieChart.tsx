import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { TransactionService } from '../services/transactionService';
import { CategoryService } from '../services/categoryService';

export function ExpensePieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      try {
        const [transactions, categories] = await Promise.all([
          TransactionService.getAll(),
          CategoryService.getExpenseCategories()
        ]);

        const currentDate = new Date();
        const currentMonthTransactions = transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate.getMonth() === currentDate.getMonth() && 
                 transactionDate.getFullYear() === currentDate.getFullYear() &&
                 transaction.transaction_type === 'expense';
        });

        const categoryMap = categories.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {} as Record<number, string>);

        const data = currentMonthTransactions.reduce((acc, transaction) => {
          const categoryName = categoryMap[transaction.category_id] || 'Unknown';
          acc[categoryName] = (acc[categoryName] || 0) + Math.abs(transaction.amount);
          return acc;
        }, {} as Record<string, number>);

        if (chartRef.current) {
          if (chartInstance.current) chartInstance.current.destroy();

          chartInstance.current = new Chart(chartRef.current, {
            type: 'pie',
            data: {
              labels: Object.keys(data),
              datasets: [{
                data: Object.values(data),
                backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                  '#9966FF', '#FF9F40', '#E7E9ED', '#8C9EFF'
                ],
                hoverOffset: 4
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                title: { 
                  display: true, 
                  text: 'Expenses by Category (This Month)',
                  padding: 20
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Error loading expense chart data:', error);
      }
    };

    fetchDataAndCreateChart();

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}
