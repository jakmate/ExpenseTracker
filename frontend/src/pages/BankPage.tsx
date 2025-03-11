import { BankAccountForm } from '../components/BankAccountForm'
import { ChartWrapper } from '../components/ChartWrapper'

export function BankPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className='text-center'>Bank Page</h2>
      <BankAccountForm />
      <ChartWrapper />
    </div>
  )
}