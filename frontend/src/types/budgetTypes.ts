import { Category } from './categoryTypes';

export type Budget = {
  id: number;
  amount: number;
  budget_type: 'weekly' | 'monthly' | 'custom';
  category_id: number;
  category: Category;
  created_at: string;
};

export type BudgetCreateData = Omit<Budget, 'id' | 'created_at' | 'category'>;
export type BudgetUpdateData = Partial<BudgetCreateData>;
