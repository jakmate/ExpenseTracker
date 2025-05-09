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
    <div className='min-h-screen bg-blue-950 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-slate-800'>Expense Management</h2>
          <AddButton label='Add New Expense' onClick={() => setShowForm(true)} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Expenses Table */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
            <h3 className='text-xl font-semibold text-slate-700 mb-4'>Recent Expenses</h3>
            <ExpensesTable refreshTrigger={refreshTrigger} />
          </div>

          {/* Expense Breakdown Chart */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-slate-700'>Expense Breakdown</h3>
            </div>
            <div className='h-96'>
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
