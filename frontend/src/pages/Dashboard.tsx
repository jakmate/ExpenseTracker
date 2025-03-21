import { ExpensePieChart } from '../components/ExpensePieChart';
import { IncomePieChart } from '../components/IncomePieChart';

export function Dashboard() {
  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-6xl font-bold text-white'>Dashboard</h2>
      <IncomePieChart />
      <ExpensePieChart />
    </div>
  );
}
