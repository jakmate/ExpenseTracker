import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BudgetService } from '../services/budgetService';
import { Budget, BudgetCreateData } from '../types/budgetTypes';
import { Category } from '../types/categoryTypes';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

type BudgetFormProps = {
  categories: Category[];
  onSuccess?: () => void;
  existingBudget?: Budget;
};

export function BudgetForm({ categories, onSuccess, existingBudget }: BudgetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: existingBudget || { budget_type: 'monthly' },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const budgetData: BudgetCreateData = {
        category_id: Number(data.category_id),
        budget_type: data.budget_type,
        amount: parseFloat(data.amount),
      };

      if (existingBudget) {
        await BudgetService.update(existingBudget.id, budgetData);
      } else {
        await BudgetService.create(budgetData);
      }

      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error saving budget:', error);
      setError(error instanceof Error ? error.message : 'Failed to save budget');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-center text-xl font-bold text-gray-800'>
        {existingBudget ? 'Edit Budget' : 'Create New Budget'}
      </h2>

      {error && <ErrorMessage error={error} />}

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='category_id' className='mb-1 block text-sm font-medium text-gray-700'>
            Category
          </label>
          <select
            {...register('category_id', { required: 'Category is required' })}
            className={`w-full rounded-md border p-2 ${
              errors.category_id ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
            disabled={!!existingBudget}
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className='mt-1 text-sm text-red-500'>{errors.category_id.message?.toString()}</p>
          )}
        </div>

        <div>
          <label htmlFor='budget_type' className='mb-1 block text-sm font-medium text-gray-700'>
            Budget Type
          </label>
          <select
            {...register('budget_type', { required: 'Budget type is required' })}
            className={`w-full rounded-md border p-2 ${
              errors.budget_type ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='custom'>Custom Period</option>
          </select>
        </div>

        <div>
          <label htmlFor='amount' className='mb-1 block text-sm font-medium text-gray-700'>
            Amount
          </label>
          <input
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
              min: { value: 0.01, message: 'Amount must be greater than 0' },
            })}
            type='number'
            step='0.01'
            className={`w-full rounded-md border p-2 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          />
          {errors.amount && (
            <p className='mt-1 text-sm text-red-500'>{errors.amount.message?.toString()}</p>
          )}
        </div>

        <div className='mt-6 flex justify-center'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='w-full rounded-md bg-blue-700 px-4 py-2 text-white transition-colors
                      duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                      focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-3/4'
          >
            {isSubmitting ? <LoadingSpinner /> : 'Save Budget'}
          </button>
        </div>
      </form>
    </div>
  );
}
