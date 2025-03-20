import { useState } from 'react';
import { ExpenseForm } from '../components/ExpenseForm';
import { ChartWrapper } from '../components/ChartWrapper';
import { ExpensesTable } from '../components/ExpensesTable';

export function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Expense Page</h2>
      <div className='mb-8 grid grid-cols-1 gap-6'>
        <button
          onClick={() => setShowForm(true)}
          className='flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-200 p-6 shadow-md transition-shadow hover:shadow-lg'
          type='button'
        >
          <div className='text-2xl font-bold text-gray-500'>+</div>
          <div className='ml-2 text-2xl font-bold text-gray-500'>Add Expense</div>
        </button>

        {showForm && (
          <div className='fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
            <div className='relative w-full max-w-lg rounded-xl bg-white shadow-xl'>
              <button
                onClick={() => setShowForm(false)}
                className='absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-900'
                aria-label='Close form'
              >
                ×
              </button>
              <ExpenseForm
                onSuccess={() => {
                  setShowForm(false);
                  fetchAccounts();
                }}
              />
            </div>
          </div>
        )}
      </div>
      <ExpensesTable />
      <ChartWrapper />
    </div>
  );
}
