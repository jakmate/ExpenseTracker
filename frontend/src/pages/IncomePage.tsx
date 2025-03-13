import { IncomeForm } from '../components/IncomeForm';
import { ChartWrapper } from '../components/ChartWrapper';

export function IncomesPage() {
  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Income Page</h2>
      <IncomeForm />
      <ChartWrapper />
    </div>
  );
}
