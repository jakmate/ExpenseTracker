import { Budget } from '../types/budgetTypes';

type BudgetProgressProps = {
  budget: Budget & {
    spent?: number;
  };
};

export function BudgetProgress({ budget }: BudgetProgressProps) {
  const amount = parseFloat(budget.amount.toString());
  const spent = budget.spent || 0;
  const percentage = Math.min((spent / budget.amount) * 100, 100);
  const remaining = budget.amount - spent;

  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm font-medium'>
        <span>{budget.category.name}</span>
        <span>£{remaining.toFixed(2)} remaining</span>
      </div>
      <div className='h-4 rounded-full bg-gray-200'>
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            percentage >= 100 ? 'bg-red-600' : percentage >= 80 ? 'bg-yellow-500' : 'bg-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className='flex justify-between text-sm text-gray-600'>
        <span>£{spent.toFixed(2)} spent</span>
        <span>£{amount.toFixed(2)} total</span>
      </div>
    </div>
  );
}
