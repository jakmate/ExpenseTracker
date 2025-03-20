import { useState } from 'react';
import { IncomeForm } from '../components/IncomeForm';
import { ChartWrapper } from '../components/ChartWrapper';
import { IncomesTable } from '../components/IncomesTable';
import { AddButton } from '../components/AddButton';
import { FormModal } from '../components/FormModal';

export function IncomesPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Income Page</h2>
      <div className='mb-8 grid grid-cols-1 gap-6'>
        <AddButton label='Add Income' onClick={() => setShowForm(true)} />

        <FormModal
          title='Add New Income'
          show={showForm}
          onClose={() => setShowForm(false)}
        >
          <IncomeForm onSuccess={handleSuccess} />
        </FormModal>
      </div>

      <IncomesTable refreshTrigger={refreshTrigger}/>
      <ChartWrapper />
    </div>
  );
}
