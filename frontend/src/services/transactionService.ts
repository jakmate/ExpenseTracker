import { Transaction } from '../types/transactionTypes'

const API_BASE = 'http://localhost:3001/api';

export const createTransaction = async (transactionData: Omit<Transaction, "id">) => {
  try {
    const response = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ transaction: transactionData }),
    });
    
    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
    
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
    }
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const fetchCategories = async (type: 'income' | 'expense') => {
  try {
    const response = await fetch(`${API_BASE}/categories?type=${type}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
    
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchBankAccounts = async () => {
  try {
    const response = await fetch(`${API_BASE}/bank_accounts`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    throw error;
  }
};