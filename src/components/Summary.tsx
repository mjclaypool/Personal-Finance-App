import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import SummaryItem from "./SummaryItem";

// Summary component
//
// Used in: Homepage.tsx
// Function: Displays the user's current balance, income, and expenses.

const Summary = () => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 py-400">
      <SummaryItem theme="dark" category="Current Balance" balance={finCtx.balance.current} />
      <SummaryItem theme="light" category="Income" balance={finCtx.balance.income} />
      <SummaryItem theme="light" category="Expenses" balance={finCtx.balance.expenses} />
    </div>
  )
}

export default Summary;