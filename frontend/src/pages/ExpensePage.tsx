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
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Expense Page</h2>
      <div className='mb-8 grid grid-cols-1 gap-6'>
        <AddButton label='Add Expense' onClick={() => setShowForm(true)} />

        <FormModal title='Add New Expense' show={showForm} onClose={() => setShowForm(false)}>
          <ExpenseForm onSuccess={handleSuccess} />
        </FormModal>
      </div>

      <ExpensesTable refreshTrigger={refreshTrigger} />
      <ExpensePieChart />
    </div>
  );
}
