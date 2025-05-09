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

export const PieChart = ({
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
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 14 } },
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
  }, [data, title, timeframe, colors]);

  const hasData = !isLoading && !error && Object.keys(data).length > 0;

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        position: 'relative',
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px',
          height: '40px',
        }}
      >
        <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div
        style={{
          flex: 1,
          position: 'relative',
          height: 'calc(100% - 40px)',
        }}
      >
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} />}

        {!isLoading && !error && !hasData && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: '#666',
              padding: '20px',
            }}
          >
            No {transactionType} recorded for {getMonthName(timeframe === 'current' ? 0 : -1)}
          </div>
        )}

        <canvas
          ref={chartRef}
          style={{
            display: hasData ? 'block' : 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
