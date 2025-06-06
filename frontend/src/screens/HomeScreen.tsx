import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../theme';
import { Expense } from '../types';
import { useExpense } from '../context/ExpenseContext';
import { VictoryPie, VictoryPieProps } from 'victory-native';

// Mock data - replace with actual data from your backend
const mockExpenses: Expense[] = [
  {
    id: '1',
    amount: 25.99,
    category: 'Food',
    description: 'Lunch at Chipotle',
    date: new Date(),
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    amount: 45.00,
    category: 'Transport',
    description: 'Uber ride',
    date: new Date(),
    type: 'expense',
    paymentMethod: 'PayPal',
  },
  {
    id: '3',
    amount: 1200.00,
    category: 'Income',
    description: 'Salary',
    date: new Date(),
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { expenses, categories } = useExpense();

  const totalExpenses = expenses.reduce((sum, expense) => {
    return expense.type === 'expense' ? sum + expense.amount : sum;
  }, 0);

  const totalIncome = expenses.reduce((sum, expense) => {
    return expense.type === 'income' ? sum + expense.amount : sum;
  }, 0);

  const categoryData = categories.map(category => {
    const categoryExpenses = expenses.filter(
      expense => expense.category === category.id && expense.type === 'expense'
    );
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
      x: category.name,
      y: total,
      color: category.color,
    };
  });

  const recentTransactions = expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity style={styles.expenseItem}>
      <View style={styles.expenseIcon}>
        <Ionicons
          name={item.type === 'expense' ? 'arrow-down' : 'arrow-up'}
          size={24}
          color={item.type === 'expense' ? colors.error : colors.success}
        />
      </View>
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseCategory}>{item.category}</Text>
      </View>
      <Text
        style={[
          styles.expenseAmount,
          { color: item.type === 'expense' ? colors.error : colors.success },
        ]}
      >
        {item.type === 'expense' ? '-' : '+'}${item.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Income</Text>
          <Text style={[styles.summaryAmount, styles.income]}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
          <Text style={[styles.summaryAmount, styles.expense]}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Expense Distribution</Text>
        <VictoryPie
          data={categoryData}
          colorScale={categoryData.map(d => d.color)}
          width={300}
          height={300}
          innerRadius={70}
          labelRadius={({ innerRadius }: { innerRadius: number }) => innerRadius + 40}
          style={{ labels: { fill: 'white', fontSize: 14, fontWeight: 'bold' } }}
        />
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map(transaction => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionCategory}>
                {categories.find(c => c.id === transaction.category)?.name}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.income : styles.expense,
              ]}
            >
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#F44336',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.light,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  expenseCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  expenseAmount: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 