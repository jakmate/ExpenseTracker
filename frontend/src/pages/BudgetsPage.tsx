import { useEffect, useState, useCallback } from 'react';
import { Budget } from '../types/budgetTypes';
import { BudgetForm } from '../components/BudgetForm';
import { BudgetsList } from '../components/BudgetsList';
import { BudgetService } from '../services/budgetService';
import { Category } from '../types/categoryTypes';
import { CategoryService } from '../services/categoryService';
import { AddButton } from '../components/AddButton';
import { FormModal } from '../components/FormModal';
import { TransactionService } from '../services/transactionService';
import { Transaction } from '../types/transactionTypes';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | undefined>();
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const fetchBudgets = useCallback(async () => {
    try {
      const data = await BudgetService.getAll();
      setBudgets(data);
      return true;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      return false;
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await TransactionService.getAll();
      setTransactions(data);
      return true;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return false;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoryService.getExpenseCategories();
      setCategories(data);
      return true;
    } catch (error) {
      console.error('Failed to load categories:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [budgetsData, transactionsData, categoriesData] = await Promise.all([
          fetchBudgets(),
          fetchTransactions(),
          fetchCategories(),
        ]);

        if (!budgetsData || !transactionsData || !categoriesData) {
          throw new Error('Failed to load some data');
        }
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying (${retryCount}/${maxRetries})...`);
          await new Promise((resolve) => window.setTimeout(resolve, retryDelay));
          await loadData();
        } else {
          setError('Failed to load data after multiple attempts. Please refresh the page.');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchBudgets, fetchTransactions, fetchCategories]);

  const calculateSpent = (categoryId: number) => {
    return transactions
      .filter((t) => t.transaction_type === 'expense' && t.category_id === categoryId)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const budgetsWithSpent = budgets.map((budget) => ({
    ...budget,
    spent: calculateSpent(budget.category_id),
  }));

  const totalBudget = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalSpent = budgetsWithSpent.reduce((sum, b) => sum + (b.spent || 0), 0);

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchBudgets();
    setEditingBudget(undefined);
  };

  const openCreateModal = () => {
    setMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (budget: Budget) => {
    setMode('edit');
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleDelete = async (budgetId: number) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await BudgetService.delete(budgetId);
        await fetchBudgets();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to delete budget');
      }
    }
  };

  return (
    <div className='min-h-screen bg-blue-950 p-6'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-white text-center w-full'>
            Budget Management
          </h1>
          <AddButton onClick={openCreateModal} label='Add Budget' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg p-6 shadow-lg col-span-2'>
            <h2 className='text-2xl font-bold text-blue-900 mb-6'>Active Budgets</h2>
            <BudgetsList
              budgets={budgetsWithSpent}
              isLoading={isLoading}
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-900 mb-6'>Budget Overview</h2>
            <div className='space-y-6'>
              <div className='bg-blue-50 rounded-lg p-4'>
                <h3 className='text-sm font-semibold text-blue-800 mb-2'>Total Budgets</h3>
                <p className='text-3xl font-bold text-blue-600'>£{totalBudget.toFixed(2)}</p>
              </div>
              <div className='bg-green-50 rounded-lg p-4'>
                <h3 className='text-sm font-semibold text-green-800 mb-2'>Remaining Funds</h3>
                <p className='text-3xl font-bold text-green-600'>
                  £{(totalBudget - totalSpent).toFixed(2)}
                </p>
              </div>
              <div className='bg-purple-50 rounded-lg p-4'>
                <h3 className='text-sm font-semibold text-purple-800 mb-2'>Categories Used</h3>
                <p className='text-3xl font-bold text-purple-600'>
                  {new Set(budgets.map((b) => b.category_id)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormModal
          show={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBudget(undefined);
          }}
          title={mode === 'create' ? 'Create New Budget' : 'Edit Budget'}
        >
          <BudgetForm
            categories={categories}
            onSuccess={handleSuccess}
            existingBudget={editingBudget}
          />
        </FormModal>
      </div>
    </div>
  );
}
