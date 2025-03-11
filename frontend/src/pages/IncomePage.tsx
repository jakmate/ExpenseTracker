import { IncomeForm } from '../components/IncomeForm'
import { ChartWrapper } from '../components/ChartWrapper'

export function IncomesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className='text-center'>Income Page</h2>
      <IncomeForm />
      <ChartWrapper />
    </div>
  )
}