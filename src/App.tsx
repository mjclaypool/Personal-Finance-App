import { useState } from 'react';
import Homepage from './pages/Homepage';
import PotsPage from './pages/PotsPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import RecurringBillsPage from './pages/RecurringBillsPage';
import NavBar from './UI/NavBar';

import { FinanceContextProvider } from "./store/FinanceContext";

import './index.css';

function App() {
  const [page, setPage] = useState("Overview")

  function handleNavSelection(item: string) {
    setPage(item);
  }
  return (
    <FinanceContextProvider>
      <>
        <main className="bg-p-beige100 min-h-[100vh] font-pubSans px-200 py-300 md:px-500 md:py-400">
          {page == "Overview" && <Homepage />}
          {page == "Pots" && <PotsPage />}
          {page == "Transactions" && <TransactionsPage />}
          {page == "Budgets" && <BudgetsPage />}
          {page == "Recurring bills" && <RecurringBillsPage />}
        </main>
        <NavBar onNavSelection={handleNavSelection} />
      </>
    </FinanceContextProvider>
  )
}

export default App;