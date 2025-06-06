export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    currency: string;
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface AIInsight {
  id: string;
  type: 'spending' | 'saving' | 'budget';
  title: string;
  description: string;
  date: Date;
  severity: 'low' | 'medium' | 'high';
  actionItems?: string[];
} 