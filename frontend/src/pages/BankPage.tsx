import { useEffect, useState, useCallback } from 'react';
import { BankAccountForm } from '../components/BankAccountForm';
import { BankAccountService } from '../services/bankAccountService';
import { BankAccount } from '../types/bankAccountTypes';
import { formatSortCode } from '../utils/format';
import { AddButton } from '../components/AddButton';
import { FormModal } from '../components/FormModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export function BankPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await BankAccountService.getAll();
      setBankAccounts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bank accounts');
    } finally {
      setLoading(false);
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

  if (loading) return <LoadingSpinner size={60} />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className='min-h-screen bg-blue-950 p-4'>
      <h2 className='mb-8 text-center text-4xl md:text-6xl font-bold text-white'>Bank Accounts</h2>

      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 flex justify-end'>
          <AddButton label='Add Account' onClick={() => setShowForm(true)} />
        </div>

        <FormModal title='Add New Bank Account' show={showForm} onClose={() => setShowForm(false)}>
          <BankAccountForm
            onSuccess={() => {
              setShowForm(false);
              fetchAccounts();
            }}
          />
        </FormModal>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow'
            >
              <div className='flex justify-between items-start'>
                <div className='space-y-4 flex-1'>
                  <h3 className='text-xl font-bold text-blue-900'>{account.account_name}</h3>

                  <div className='grid grid-cols-2 gap-4 text-gray-600'>
                    <div>
                      <p className='font-medium'>Bank Name</p>
                      <p>{account.bank_name}</p>
                    </div>
                    <div>
                      <p className='font-medium'>Account Type</p>
                      <p>{account.account_type}</p>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 text-gray-600'>
                    <div>
                      <p className='font-medium'>Account Number</p>
                      <p>{account.account_number}</p>
                    </div>
                    <div>
                      <p className='font-medium'>Sort Code</p>
                      <p>{formatSortCode(account.sortcode)}</p>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <p className='text-lg font-bold text-blue-900'>
                      Balance: £{account.balance.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className='ml-4'>
                  <img
                    src={getBankImage(account.bank_name)}
                    alt={`${account.bank_name} logo`}
                    className='w-20 h-20 object-contain'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
