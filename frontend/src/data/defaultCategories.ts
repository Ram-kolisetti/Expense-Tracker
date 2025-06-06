import { Category } from '../types';

export const defaultCategories: Omit<Category, 'id'>[] = [
  {
    name: 'Food & Dining',
    color: '#FF6B6B',
    icon: 'restaurant',
  },
  {
    name: 'Shopping',
    color: '#4ECDC4',
    icon: 'cart',
  },
  {
    name: 'Transportation',
    color: '#45B7D1',
    icon: 'car',
  },
  {
    name: 'Entertainment',
    color: '#96CEB4',
    icon: 'film',
  },
  {
    name: 'Bills & Utilities',
    color: '#FFEEAD',
    icon: 'receipt',
  },
  {
    name: 'Health & Fitness',
    color: '#D4A5A5',
    icon: 'fitness',
  },
  {
    name: 'Travel',
    color: '#9B59B6',
    icon: 'airplane',
  },
  {
    name: 'Education',
    color: '#3498DB',
    icon: 'school',
  },
  {
    name: 'Personal Care',
    color: '#E67E22',
    icon: 'cut',
  },
  {
    name: 'Gifts & Donations',
    color: '#E74C3C',
    icon: 'gift',
  },
  {
    name: 'Business',
    color: '#2ECC71',
    icon: 'briefcase',
  },
  {
    name: 'Investments',
    color: '#F1C40F',
    icon: 'trending-up',
  },
  {
    name: 'Salary',
    color: '#27AE60',
    icon: 'cash',
  },
  {
    name: 'Freelance',
    color: '#8E44AD',
    icon: 'laptop',
  },
  {
    name: 'Other Income',
    color: '#16A085',
    icon: 'add-circle',
  },
]; 