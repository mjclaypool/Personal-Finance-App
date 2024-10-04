import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import RecurringItem from "../components/RecurringItem";
import TransactionHeaderBar from "./TransactionHeaderBar";

// RecurringItemsList component
//
// Used in: RecurringBillsPage.tsx
// Function:
// -- Displays a list of all recurring monthly bills.

const RecurringItemsList = () => {
  const finCtx = useContext(FinanceContext);
  const recurringBills = finCtx.getRecurringBills();

  return (
    <div>
      <TransactionHeaderBar type="recurring" />
      {recurringBills.map(transaction => (
        <div key={transaction.name + transaction.date}>
          <RecurringItem
            avatar={transaction.avatar}
            name={transaction.name}
            date={transaction.date}
            amount={transaction.amount}
          />
          {recurringBills.indexOf(transaction) < (recurringBills.length - 1) &&
            <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-5"/>
          }
        </div>
      ))}
    </div>
  )
}

export default RecurringItemsList;