import { createHashRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/Homepage';
import PotsPage from './pages/PotsPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import RecurringBillsPage from './pages/RecurringBillsPage';
import RootLayout from './pages/Root';

import { FinanceContextProvider } from "./store/FinanceContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

import './index.css';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/budgets', element: <BudgetsPage /> },
      { path: '/pots', element: <PotsPage /> },
      { path: '/recurring', element: <RecurringBillsPage /> },
    ]
  }
])

function App() {
  return (
    <UserProgressContextProvider>
      <FinanceContextProvider>
        <RouterProvider router={router} />
      </FinanceContextProvider>
    </UserProgressContextProvider>
  )
}

export default App;