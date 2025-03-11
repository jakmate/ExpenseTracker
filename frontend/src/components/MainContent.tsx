import { Routes, Route } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { ExpensesPage } from '../pages/ExpensePage'
import { IncomesPage } from '../pages/IncomePage'
import { BankPage } from '../pages/BankPage'

export function MainContent() {
  return (
    <div className='ml-20 flex-1'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="/bank" element={<BankPage />} />
      </Routes>
    </div>
  )
}