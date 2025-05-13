import { Budget } from '../types/budgetTypes';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

type BudgetsListProps = {
  budgets: (Budget & { spent?: number })[];
  isLoading: boolean;
  error: string | null;
  onEdit: (budget: Budget) => void;
  onDelete: (budgetId: number) => Promise<void>;
};

export function BudgetsList({ budgets, isLoading, error, onEdit, onDelete }: BudgetsListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (budgets.length === 0)
    return <p className='text-gray-600 p-4'>No budgets found. Create one to get started!</p>;

  return (
    <div className='space-y-4'>
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className='bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>{budget.category.name}</h3>
              <p className='text-sm text-gray-600'>
                {budget.budget_type.charAt(0).toUpperCase() + budget.budget_type.slice(1)} Budget
              </p>
            </div>
            <div className='text-right'>
              <p className='text-xl font-bold text-blue-600'>£{Number(budget.amount).toFixed(2)}</p>
              <div className='space-x-2'>
                <button
                  onClick={() => onEdit(budget)}
                  className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(budget.id)}
                  className='text-red-600 hover:text-red-800 text-sm font-medium'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <div className='h-2 rounded-full bg-gray-200'>
              <div
                className='h-full rounded-full transition-all duration-500'
                style={{
                  width: `${Math.min(((budget.spent || 0) / budget.amount) * 100, 100)}%`,
                  backgroundColor:
                    (budget.spent || 0) > budget.amount
                      ? '#EF4444'
                      : (budget.spent || 0) > budget.amount * 0.8
                        ? '#F59E0B'
                        : '#3B82F6',
                }}
              />
            </div>
            <div className='flex justify-between text-sm text-gray-600 mt-2'>
              <span>£{(budget.spent || 0).toFixed(2)} spent</span>
              <span>£{(budget.amount - (budget.spent || 0)).toFixed(2)} remaining</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
