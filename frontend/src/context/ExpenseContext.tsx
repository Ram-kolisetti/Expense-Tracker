import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Category, Budget } from '../types';
import { defaultCategories } from '../data/defaultCategories';

interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  deleteExpense: (id: string) => void;
  deleteCategory: (id: string) => void;
  deleteBudget: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [expensesData, categoriesData, budgetsData] = await Promise.all([
        AsyncStorage.getItem('expenses'),
        AsyncStorage.getItem('categories'),
        AsyncStorage.getItem('budgets'),
      ]);

      if (expensesData) setExpenses(JSON.parse(expensesData));
      if (categoriesData) setCategories(JSON.parse(categoriesData));
      if (budgetsData) setBudgets(JSON.parse(budgetsData));

      // Initialize with default categories if none exist
      if (!categoriesData) {
        const initialCategories = defaultCategories.map(category => ({
          ...category,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        }));
        setCategories(initialCategories);
        saveData('categories', initialCategories);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveData('expenses', updatedExpenses);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveData('categories', updatedCategories);
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget = { ...budget, id: Date.now().toString() };
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    saveData('budgets', updatedBudgets);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveData('expenses', updatedExpenses);
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    saveData('categories', updatedCategories);
  };

  const deleteBudget = (id: string) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== id);
    setBudgets(updatedBudgets);
    saveData('budgets', updatedBudgets);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        budgets,
        addExpense,
        addCategory,
        addBudget,
        deleteExpense,
        deleteCategory,
        deleteBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}; 