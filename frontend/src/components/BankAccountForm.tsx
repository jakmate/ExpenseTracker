import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BankAccountService } from '../services/bankAccountService';

export function BankAccountForm() {
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
        user_id: 2
      });
      reset();
      alert('Bank account created successfully!');
    } catch (error) {
      console.error('Error creating bank account:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Add Bank Account
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor='bank_name' className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                {...register('bank_name', {
                  required: "Bank Name is required",
                  maxLength: {
                    value: 32,
                    message: "Bank Name must be less than 32 characters"
                  },
                })}
                type="text"
                placeholder="e.g. National Bank"
                className={`w-full p-2 border rounded-md ${
                  errors.bank_name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.bank_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bank_name.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='account_number' className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                {...register('account_number', {
                  required: "Account number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Must be a valid number"
                  },
                  minLength: {
                    value: 8,
                    message: "Must be exactly 8 digits"
                  },
                  maxLength: {
                    value: 8,
                    message: "Must be exactly 8 digits"
                  }
                })}
                type="text"
                placeholder="12345678"
                className={`w-full p-2 border rounded-md ${
                  errors.account_number ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.account_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_number.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor='account_name' className="block text-sm font-medium text-gray-700 mb-1">
                Account Name
              </label>
              <input
                {...register('account_name', {
                  required: "Account name is required",
                  maxLength: {
                    value: 32,
                    message: "Must be less than 32 characters"
                  }
                })}
                type="text"
                placeholder="e.g. My Checking Account"
                className={`w-full p-2 border rounded-md ${
                  errors.account_name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.account_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_name.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='account_type' className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <select
                {...register('account_type', {
                  required: "Account type is required"
                })}
                className={`w-full p-2 border rounded-md ${
                  errors.account_type ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Type</option>
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
              </select>
              {errors.account_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.account_type.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor='sortcode' className="block text-sm font-medium text-gray-700 mb-1">
                Sort Code
              </label>
              <input
                {...register('sortcode', {
                  required: "Sort code is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Must be a valid number"
                  },
                  minLength: {
                    value: 6,
                    message: "Must be exactly 6 digits"
                  },
                  maxLength: {
                    value: 6,
                    message: "Must be exactly 6 digits"
                  }
                })}
                type="text"
                placeholder="12-34-56"
                className={`w-full p-2 border rounded-md ${
                  errors.sortcode ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.sortcode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sortcode.message?.toString()}
                </p>
              )}
            </div>

            <div>
              <label htmlFor='balance' className="block text-sm font-medium text-gray-700 mb-1">
                Initial Balance
              </label>
              <input
                {...register('balance', {
                  required: "Initial balance is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Balance cannot be negative"
                  }
                })}
                type="number"
                placeholder="0.00"
                step="0.01"
                className={`w-full p-2 border rounded-md ${
                  errors.balance ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
              {errors.balance && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.balance.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full md:w-3/4 bg-blue-600 text-white py-2 px-4 rounded-md
                       hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Add Bank Account'}
          </button>
        </div>
      </form>
    </div>
  )
}