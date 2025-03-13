import { useEffect, useState, useCallback } from 'react';
import { BankAccountForm } from '../components/BankAccountForm';
import { ChartWrapper } from '../components/ChartWrapper';
import { BankAccountService } from '../services/bankAccountService';
import { BankAccount } from '../types/bankAccountTypes';
import { formatSortCode } from '../utils/format';

export function BankPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAccounts = useCallback(async () => {
    try {
      const data = await BankAccountService.getAll();
      setBankAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const getBankImage = (bankName: string) => {
    switch (bankName.toLowerCase()) {
      case 'barclays':
        return '/images/barclays.svg';
      case 'hsbc':
        return '/images/hsbc.svg';
      case 'lloyds':
        return '/images/lloyds.svg';
      case 'monzo':
        return '/images/monzo.svg';
      case 'natwest':
        return '/images/natwest.svg';
      case 'santander':
        return '/images/santander.svg';
      default:
        return '/images/default.svg';
    }
  };

  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-center text-6xl font-bold text-white'>Bank Accounts</h1>

        <div className='mb-8 grid grid-cols-1 gap-6'>
          <button
            onClick={() => setShowForm(true)}
            className='flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-200 p-6 shadow-md transition-shadow hover:shadow-lg'
            type='button'
          >
            <div className='text-2xl font-bold text-gray-500'>+</div>
            <div className='ml-2 text-2xl font-bold text-gray-500'>Add Account</div>
          </button>

          {showForm && (
            <div className='fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
              <div className='relative w-full max-w-lg rounded-xl bg-white shadow-xl'>
                <button
                  onClick={() => setShowForm(false)}
                  className='absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-900'
                  aria-label='Close form'
                >
                  ×
                </button>
                <BankAccountForm
                  onSuccess={() => {
                    setShowForm(false);
                    fetchAccounts();
                  }}
                />
              </div>
            </div>
          )}

          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className='rounded-xl bg-gray-200 p-6 shadow-md transition-shadow hover:shadow-lg'
            >
              <div className='grid w-full grid-cols-[1fr_auto] gap-4'>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-semibold'>{account.account_name}</h2>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='border-r border-gray-400 pr-4'>
                      <span className='font-medium'>Bank:</span> {account.bank_name}
                    </div>
                    <div className='pl-4'>
                      <span className='font-medium'>Type:</span> {account.account_type}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='border-r border-gray-400 pr-4'>
                      <span className='font-medium'>Account:</span> {account.account_number}
                    </div>
                    <div className='pl-4'>
                      <span className='font-medium'>Sortcode:</span>{' '}
                      {formatSortCode(account.sortcode)}
                    </div>
                  </div>
                  <div className='mt-4'>
                    <span className='font-medium'>Balance:</span> ${account.balance}
                  </div>
                </div>
                <div className='flex items-center justify-end'>
                  <img
                    src={getBankImage(account.bank_name)}
                    alt={`${account.bank_name} card`}
                    className='w-2xs'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ChartWrapper />
      </div>
    </div>
  );
}
