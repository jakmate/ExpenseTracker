import { useState } from 'react';
import { IncomeForm } from '../components/IncomeForm';
import { IncomesTable } from '../components/IncomesTable';
import { AddButton } from '../components/AddButton';
import { FormModal } from '../components/FormModal';
import { IncomePieChart } from '../components/IncomePieChart';

export function IncomesPage() {
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
          <h2 className='text-3xl font-bold text-slate-800'>Income Management</h2>
          <AddButton label='Add New Income' onClick={() => setShowForm(true)} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Incomes Table */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
            <h3 className='text-xl font-semibold text-slate-700 mb-4'>Recent Incomes</h3>
            <IncomesTable refreshTrigger={refreshTrigger} />
          </div>

          {/* Income Breakdown Chart */}
          <div className='bg-white rounded-xl p-6 shadow-sm border border-slate-200'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-slate-700'>Income Breakdown</h3>
            </div>
            <div className='h-96'>
              <IncomePieChart />
            </div>
          </div>
        </div>
      </div>

      <FormModal title='Add New Income' show={showForm} onClose={() => setShowForm(false)}>
        <IncomeForm onSuccess={handleSuccess} />
      </FormModal>
    </div>
  );
}
