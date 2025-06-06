import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { Navigation } from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <ExpenseProvider>
        <Navigation />
      </ExpenseProvider>
    </NavigationContainer>
  );
}
