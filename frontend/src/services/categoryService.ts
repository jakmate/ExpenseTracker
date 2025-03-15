import { Category } from '../types/categoryTypes';

export const CategoryService = {
  getExpenseCategories: async (): Promise<Category[]> => {
    const response = await fetch('http://localhost:3001/api/categories?type=expense');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch expenses');
    }
    return response.json();
  },
  getIncomeCategories: async (): Promise<Category[]> => {
    const response = await fetch('http://localhost:3001/api/categories?type=income');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch incomes');
    }
    return response.json();
  },
  getAll: async (): Promise<Category[]> => {
    const response = await fetch('http://localhost:3001/api/categories');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch categories');
    }
    return response.json();
  },
};
