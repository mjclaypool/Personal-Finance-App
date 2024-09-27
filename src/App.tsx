import { useState } from 'react';
import Homepage from './pages/Homepage';
import PotsPage from './pages/Potspage';
import TransactionsPage from './pages/Transactionspage';
import BudgetsPage from './pages/Budgetspage';
import RecurringBillsPage from './pages/RecurringBillspage';
import NavBar from './components/NavBar';
import './index.css'

function App() {
  const [page, setPage] = useState("Overview")

  function handleNavSelection(item: string) {
    setPage(item);
  }
  return (
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
  )
}

export default App;