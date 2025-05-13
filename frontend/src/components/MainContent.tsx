import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { ExpensesPage } from '../pages/ExpensePage';
import { IncomesPage } from '../pages/IncomePage';
import { BankPage } from '../pages/BankPage';
import BudgetsPage from '../pages/BudgetsPage';

export function MainContent() {
  return (
    <div className='flex-1'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/budgets' element={<BudgetsPage />} />
        <Route path='/expenses' element={<ExpensesPage />} />
        <Route path='/incomes' element={<IncomesPage />} />
        <Route path='/bank' element={<BankPage />} />
      </Routes>
    </div>
  );
}
