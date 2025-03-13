import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BankAccountService } from '../services/bankAccountService';

export function BankAccountForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    try {
      await BankAccountService.create({
        bank_name: data.bank_name,
        account_number: Number(data.account_number),
        account_type: data.account_type,
        account_name: data.account_name,
        sortcode: Number(data.sortcode),
        balance: parseFloat(data.balance),
        user_id: 1,
      });
      reset();
      alert('Bank account created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating bank account:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-6 text-center text-4xl font-semibold text-gray-800'>Add Bank Account</h2>

      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label htmlFor='bank_name' className='mb-1 block font-medium text-gray-700'>
                Bank Name
              </label>
              <input
                {...register('bank_name', {
                  required: 'Bank Name is required',
                  maxLength: {
                    value: 32,
                    message: 'Bank Name must be less than 32 characters',
                  },
                })}
                type='text'
                placeholder='e.g. National Bank'
                className={`w-full rounded-md border p-2 ${
                  errors.bank_name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.bank_name && (
                <p className='mt-1 text-sm text-red-500'>{errors.bank_name.message?.toString()}</p>
              )}
            </div>

            <div>
              <label htmlFor='account_number' className='mb-1 block font-medium text-gray-700'>
                Account Number
              </label>
              <input
                {...register('account_number', {
                  required: 'Account number is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Must be a valid number',
                  },
                  minLength: {
                    value: 8,
                    message: 'Must be exactly 8 digits',
                  },
                  maxLength: {
                    value: 8,
                    message: 'Must be exactly 8 digits',
                  },
                })}
                type='text'
                placeholder='12345678'
                className={`w-full rounded-md border p-2 ${
                  errors.account_number ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.account_number && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.account_number.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label htmlFor='account_name' className='mb-1 block font-medium text-gray-700'>
                Account Name
              </label>
              <input
                {...register('account_name', {
                  required: 'Account name is required',
                  maxLength: {
                    value: 32,
                    message: 'Must be less than 32 characters',
                  },
                })}
                type='text'
                placeholder='e.g. My Checking Account'
                className={`w-full rounded-md border p-2 ${
                  errors.account_name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.account_name && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.account_name.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='account_type' className='mb-1 block font-medium text-gray-700'>
                Account Type
              </label>
              <select
                {...register('account_type', {
                  required: 'Account type is required',
                })}
                className={`w-full rounded-md border p-2 ${
                  errors.account_type ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value=''>Select Type</option>
                <option value='Current'>Current</option>
                <option value='Savings'>Savings</option>
                <option value='Credit'>Credit</option>
              </select>
              {errors.account_type && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.account_type.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label htmlFor='sortcode' className='mb-1 block font-medium text-gray-700'>
                Sort Code
              </label>
              <input
                {...register('sortcode', {
                  required: 'Sort code is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Must be a valid number',
                  },
                  minLength: {
                    value: 6,
                    message: 'Must be exactly 6 digits',
                  },
                  maxLength: {
                    value: 6,
                    message: 'Must be exactly 6 digits',
                  },
                })}
                type='text'
                placeholder='12-34-56'
                className={`w-full rounded-md border p-2 ${
                  errors.sortcode ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.sortcode && (
                <p className='mt-1 text-sm text-red-500'>{errors.sortcode.message?.toString()}</p>
              )}
            </div>

            <div>
              <label htmlFor='balance' className='mb-1 block font-medium text-gray-700'>
                Initial Balance
              </label>
              <input
                {...register('balance', {
                  required: 'Initial balance is required',
                  valueAsNumber: true,
                })}
                type='number'
                placeholder='0.00'
                step='0.01'
                className={`w-full rounded-md border p-2 ${
                  errors.balance ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.balance && (
                <p className='mt-1 text-sm text-red-500'>{errors.balance.message?.toString()}</p>
              )}
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-center'>
          <button
            disabled={isSubmitting}
            type='submit'
            className='w-full rounded-md bg-blue-700 px-4 py-2 text-white transition-colors
                       duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-3/4'
          >
            {isSubmitting ? 'Submitting...' : 'Add Bank Account'}
          </button>
        </div>
      </form>
    </div>
  );
}
