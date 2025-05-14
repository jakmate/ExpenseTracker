import { Category } from '../types/categoryTypes';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const CategoryService = {
  getExpenseCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/api/categories?type=expense`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch expenses');
    }
    return response.json();
  },
  getIncomeCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/api/categories?type=income`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch incomes');
    }
    return response.json();
  },
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/api/categories`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to fetch categories');
    }
    return response.json();
  },
};
