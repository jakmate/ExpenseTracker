import { useState } from 'react';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpensesTable } from '../components/ExpensesTable';
import { AddButton } from '../components/AddButton';
import { FormModal } from '../components/FormModal';
import { ExpensePieChart } from '../components/ExpensePieChart';

export function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className='min-h-screen bg-blue-950 p-4 md:p-6'>
      <div className='space-y-6'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8'>
          <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold text-white text-center md:text-left w-full mb-4 md:mb-0'>
            Expense Management
          </h1>
          <AddButton onClick={() => setShowForm(true)} label='Add Expense' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
          <div className='bg-white rounded-lg p-4 md:p-6 shadow-lg lg:col-span-2'>
            <h2 className='text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-6'>
              Recent Expenses
            </h2>
            <div className='overflow-x-auto'>
              <ExpensesTable refreshTrigger={refreshTrigger} />
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 md:p-6 shadow-lg'>
            <h2 className='text-xl md:text-2xl font-bold text-blue-900 mb-4'>Expense Breakdown</h2>
            <div className='h-60 md:h-72 flex-1 overflow-hidden'>
              <ExpensePieChart />
            </div>
          </div>
        </div>
      </div>

      <FormModal title='Add New Expense' show={showForm} onClose={() => setShowForm(false)}>
        <ExpenseForm onSuccess={handleSuccess} />
      </FormModal>
    </div>
  );
}
