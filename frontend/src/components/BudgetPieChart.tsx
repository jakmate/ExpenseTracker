import { Chart } from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';
import { Budget } from '../types/budgetTypes';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { TimeframeSelector } from './TImeframeSelector';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);

type BudgetPieChartProps = {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
};

export const BudgetPieChart = ({ budgets, isLoading, error }: BudgetPieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [timeframe, setTimeframe] = useState<'current' | 'previous'>('current');

  useEffect(() => {
    if (chartRef.current && budgets.length > 0) {
      if (chartInstance.current) chartInstance.current.destroy();

      const groupedData = budgets.reduce(
        (acc, budget) => {
          acc[budget.category.name] = (acc[budget.category.name] || 0) + budget.amount;
          return acc;
        },
        {} as Record<string, number>,
      );

      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: Object.keys(groupedData),
          datasets: [
            {
              data: Object.values(groupedData),
              backgroundColor: [
                '#3B82F6',
                '#10B981',
                '#F59E0B',
                '#EF4444',
                '#8B5CF6',
                '#EC4899',
                '#14B8A6',
                '#F97316',
                '#64748B',
                '#A855F7',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 12,
                },
                boxWidth: 15,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${formatCurrency(value)}`;
                },
              },
            },
            title: {
              display: true,
              text: 'Budget Distribution',
              padding: 20,
              font: { size: 18 },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [budgets, timeframe]);

  const hasData = budgets.length > 0;

  return (
    <div className='relative rounded-lg p-4'>
      <div className='mb-4 flex justify-end'>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div className='relative h-64' style={{ position: 'relative' }}>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} />}

        {!isLoading && !error && !hasData && (
          <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
            No budgets found for selected period
          </div>
        )}

        <canvas
          ref={chartRef}
          className={hasData ? 'block' : 'hidden'}
          style={{
            maxHeight: '100%',
            width: '100% !important',
            height: 'auto !important',
          }}
        />
      </div>
    </div>
  );
};
