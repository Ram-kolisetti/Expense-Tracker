import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { colors, spacing, typography, shadows } from '../theme';

// Mock data - replace with actual data from your backend
const categoryData = [
  { x: 'Food', y: 35 },
  { x: 'Transport', y: 25 },
  { x: 'Shopping', y: 20 },
  { x: 'Bills', y: 15 },
  { x: 'Other', y: 5 },
];

const monthlyData = [
  { x: 'Jan', y: 1200 },
  { x: 'Feb', y: 1500 },
  { x: 'Mar', y: 1800 },
  { x: 'Apr', y: 1400 },
  { x: 'May', y: 1600 },
  { x: 'Jun', y: 2000 },
];

const StatsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spending Analytics</Text>
        <Text style={styles.subtitle}>Track your expenses and income</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Spending by Category</Text>
        <View style={styles.chartContainer}>
          <VictoryPie
            data={categoryData}
            colorScale={[
              colors.categories.food,
              colors.categories.transport,
              colors.categories.shopping,
              colors.categories.bills,
              colors.categories.other,
            ]}
            width={screenWidth - spacing.xl * 2}
            height={300}
            innerRadius={70}
            labelRadius={({ innerRadius }) => (innerRadius as number) + 40}
            style={{ labels: { fill: colors.text.primary, fontSize: 12 } }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Overview</Text>
        <View style={styles.chartContainer}>
          <VictoryChart
            width={screenWidth - spacing.xl * 2}
            height={300}
            padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
          >
            <VictoryAxis
              style={{
                axis: { stroke: colors.text.secondary },
                tickLabels: { fill: colors.text.secondary },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: colors.text.secondary },
                tickLabels: { fill: colors.text.secondary },
              }}
            />
            <VictoryBar
              data={monthlyData}
              style={{
                data: {
                  fill: colors.primary,
                  width: 20,
                },
              }}
            />
          </VictoryChart>
        </View>
      </View>

      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>AI Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Your food expenses have increased by 15% this month. Consider meal
            planning to reduce costs.
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            You're on track to save $500 this month! Keep up the good work.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.background.light,
    borderRadius: 12,
    padding: spacing.lg,
    margin: spacing.lg,
    ...shadows.small,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightsContainer: {
    padding: spacing.lg,
  },
  insightsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  insightCard: {
    backgroundColor: colors.background.light,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  insightText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    lineHeight: 24,
  },
});

export default StatsScreen; 