import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { TransactionService } from '../services/transactionService';
import { TransactionFormProps } from '../types/transactionTypes';

export function TransactionForm({
  type,
  categories,
  bankAccounts,
  onSuccess,
}: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    const amount = type === 'expense' ? -Math.abs(data.amount) : data.amount;
    setIsSubmitting(true);
    try {
      await TransactionService.create({
        amount: parseFloat(amount),
        description: data.description,
        date: data.date,
        category_id: Number(data.category_id),
        bank_account_id: Number(data.bank_account_id),
      });
      reset();
      alert('Transaction created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-center text-xl font-bold text-gray-800'>
        Add {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='bank_account_id' className='mb-1 block text-sm font-medium text-gray-700'>
            Bank Account
          </label>
          <select
            {...register('bank_account_id', {
              required: 'Bank account is required',
            })}
            className={`w-full rounded-md border p-2 ${
              errors.bank_account_id ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value=''>Select Account</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name}
              </option>
            ))}
          </select>
          {errors.bank_account_id && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.bank_account_id.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='category_id' className='mb-1 block text-sm font-medium text-gray-700'>
            Category
          </label>
          <select
            {...register('category_id', {
              required: 'Category is required',
            })}
            className={`w-full rounded-md border p-2 ${
              errors.category_id ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
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
          <label htmlFor='description' className='mb-1 block text-sm font-medium text-gray-700'>
            Description
          </label>
          <input
            {...register('description', {
              maxLength: {
                value: 64,
                message: 'Must be below 64 digits',
              },
            })}
            type='text'
            placeholder='Add description...'
            className={`w-full rounded-md border p-2 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor='date' className='mb-1 block text-sm font-medium text-gray-700'>
            Date
          </label>
          <input
            {...register('date', {
              required: 'Date is required',
              validate: {
                notFuture: (value) =>
                  new Date(value) <= new Date() || 'Date cannot be in the future',
                minDate: (value) =>
                  new Date(value) >= new Date('1980-01-01') || 'Date cannot be before 1980',
              },
            })}
            type='date'
            min='1980-01-01'
            max={new Date().toISOString().split('T')[0]}
            className={`w-full rounded-md border p-2 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          />
          {errors.date && (
            <p className='mt-1 text-sm text-red-500'>{errors.date.message?.toString()}</p>
          )}
        </div>

        <div>
          <label htmlFor='amount' className='mb-1 block text-sm font-medium text-gray-700'>
            Amount
          </label>
          <input
            {...register('amount', {
              required: 'Amount is required',
              valueAsNumber: true,
            })}
            type='number'
            placeholder='0.00'
            step='0.01'
            className={`w-full rounded-md border p-2 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className='mt-6 flex justify-center'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='w-full rounded-md bg-blue-700 px-4 py-2 text-white transition-colors
                        duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-3/4'
          >
            {isSubmitting ? 'Submitting...' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
}
