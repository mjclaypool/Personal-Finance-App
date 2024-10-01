import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import RecurringSummaryItem from "./RecurringSummaryItem";

// RecurringSummary component
//
// Used in: RecurringBillsPage.tsx
// Function:
// -- Displays quantities and amounts of paid, upcoming, and due soon recurring bills.

const RecurringSummary = () => {
  const finCtx = useContext(FinanceContext);
  const paidBills = finCtx.getRecurringBillsByStatus("paid");
  const upcomingBills = finCtx.getRecurringBillsByStatus("upcoming");
  const dueSoonBills = finCtx.getRecurringBillsByStatus("due-soon");

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-preset3 text-p-grey900">Summary</h2>
      <div>
        <RecurringSummaryItem
          title="Paid Bills"
          qty={paidBills.length}
          total={finCtx.getRecurringBillsByStatusTotal(paidBills)}
          color="default"
        />
        <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
        <RecurringSummaryItem
          title="Total Upcoming"
          qty={upcomingBills.length}
          total={finCtx.getRecurringBillsByStatusTotal(upcomingBills)}
          color="default"
        />
        <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
        <RecurringSummaryItem
          title="Due Soon"
          qty={dueSoonBills.length}
          total={finCtx.getRecurringBillsByStatusTotal(dueSoonBills)}
          color="red"
        />
      </div>
    </div>
  )
}

export default RecurringSummary;