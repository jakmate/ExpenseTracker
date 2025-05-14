import { Chart } from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';
import { ErrorMessage } from './ErrorMessage';
import { usePieChart } from '../hooks/usePieChart';
import { LoadingSpinner } from './LoadingSpinner';
import { TimeframeSelector } from './TImeframeSelector';

const getMonthName = (monthOffset: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthOffset);
  return date.toLocaleString('default', { month: 'long' });
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);

export const TransactionPieChart = ({
  transactionType,
  title,
  colors,
}: {
  transactionType: 'income' | 'expense';
  title: string;
  colors: string[];
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [timeframe, setTimeframe] = useState<'current' | 'previous'>('current');
  const { data, isLoading, error } = usePieChart(transactionType, timeframe);

  useEffect(() => {
    if (chartRef.current && Object.keys(data).length > 0) {
      if (chartInstance.current) chartInstance.current.destroy();

      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: colors,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
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
              text: `${title} (${getMonthName(timeframe === 'current' ? 0 : -1)})`,
              padding: { top: 10, bottom: 5 },
              font: { size: 16 },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [data, title, timeframe, colors]);

  const hasData = !isLoading && !error && Object.keys(data).length > 0;

  return (
    <div className='w-full h-full flex flex-col border border-gray-200 rounded-lg p-4 overflow-hidden'>
      <div className='flex justify-end mb-2'>
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div className='relative flex-1 flex justify-center items-center w-full min-h-0'>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} />}

        {!isLoading && !error && !hasData && (
          <div className='text-center text-gray-600 p-4'>
            No {transactionType} recorded for {getMonthName(timeframe === 'current' ? 0 : -1)}
          </div>
        )}

        <div className={`w-full h-full ${hasData ? 'block' : 'hidden'}`}>
          <canvas ref={chartRef} />
        </div>
      </div>

      {hasData && (
        <div className='flex flex-wrap justify-center gap-2 mt-2 text-xs'>
          {Object.keys(data).map((label, index) => (
            <div key={label} className='flex items-center'>
              <div
                className='w-3 h-3 mr-1'
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
