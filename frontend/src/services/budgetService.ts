import { Budget, BudgetCreateData } from '../types/budgetTypes';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const BudgetService = {
  getAll: async (userId: number = 1): Promise<Budget[]> => {
    const response = await fetch(`${API_BASE}/api/budgets?user_id=${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.errors?.join(', ') || 'Failed to fetch budgets';
      } catch {
        errorMessage = `Failed to fetch budgets: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  create: async (budgetData: BudgetCreateData): Promise<Budget> => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: { ...budgetData, user_id: 1 } }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to create budget');
    }
    return response.json();
  },

  update: async (id: number, budgetData: BudgetCreateData): Promise<Budget> => {
    const response = await fetch(`${API_BASE}/api/budgets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: budgetData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to update budget');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/budgets/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to delete budget');
    }
  },
};
