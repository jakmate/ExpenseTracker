import { ExpenseForm } from '../components/ExpenseForm';
import { ChartWrapper } from '../components/ChartWrapper';

export function ExpensesPage() {
  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Expense Page</h2>
      <ExpenseForm />
      <ChartWrapper />
    </div>
  );
}
