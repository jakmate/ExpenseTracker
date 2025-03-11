import { ExpenseForm } from '../components/ExpenseForm'
import { ChartWrapper } from '../components/ChartWrapper'

export function ExpensesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className='text-center'>Expense Page</h2>
      <ExpenseForm />
      <ChartWrapper />
    </div>
  )
}