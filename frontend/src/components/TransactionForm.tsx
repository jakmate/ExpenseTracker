import { useState } from 'react';
import { TransactionFormProps } from '../types/transactionTypes';

export function TransactionForm({
  type,
  categories,
  bankAccounts,
  onSubmit,
}: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBankAccountId, setSelectedBankAccountId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      description,
      category_id: parseInt(selectedCategoryId),
      bank_account_id: parseInt(selectedBankAccountId),
    };

    onSubmit(transactionData);
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-xl font-semibold text-gray-800'>
        {type === 'expense' ? 'Add Expense' : 'Add Income'}
      </h2>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label htmlFor='amount' className='mb-1 block text-sm font-medium text-gray-700'>
              Amount
            </label>
            <input
              type='number'
              placeholder='0.00'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
              step='0.01'
              required
            />
          </div>

          <div>
            <label htmlFor='date' className='mb-1 block text-sm font-medium text-gray-700'>
              Date
            </label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            {type === 'expense' ? 'From Account' : 'To Account'}
          </label>
          <select
            value={selectedBankAccountId}
            onChange={(e) => setSelectedBankAccountId(e.target.value)}
            className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value=''>Select Account</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bank_name} ({account.account_number})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='category_id' className='mb-1 block text-sm font-medium text-gray-700'>
            Category
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value=''>Select Category</option>
            {categories
              .filter((category) => category.category_type === type)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor='description' className='mb-1 block text-sm font-medium text-gray-700'>
            Description
          </label>
          <input
            type='text'
            placeholder='Add description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
}
