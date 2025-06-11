# Expense Tracker

A modern mobile application for tracking personal expenses and income, built with React Native and Expo.

## Features

- Track income and expenses
- Categorize transactions
- Visualize spending patterns with charts
- Set and monitor budgets
- Persistent storage using AsyncStorage
- Modern and intuitive UI

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Victory Native (for charts)
- AsyncStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React Context for state management
│   ├── data/          # Default data and constants
│   ├── navigation/    # Navigation configuration
│   ├── screens/       # Screen components
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── App.tsx           # Root component
└── package.json      # Project dependencies
.
```

## Features in Detail

### Expense Tracking
- Add income and expenses with descriptions
- Categorize transactions
- View transaction history
- Filter transactions by category or date

### Budget Management
- Set monthly budgets for different categories
- Track spending against budgets
- Receive notifications when approaching budget limits

### Analytics
- Visual representation of spending patterns
- Category-wise expense breakdown
- Income vs. expense comparison
- Monthly and yearly trends

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Ionicons
- Charts powered by Victory Native
- UI inspiration from various modern mobile applications
