import { useContext } from "react";

import Button from "../UI/Button";
import FinanceContext from "../store/FinanceContext";
import RecurringCategoryItem from "./RecurringCategoryItem";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

// Recurring component
//
// Used in: Homepage.tsx
// Function:
// -- Displays the user's paid, upcoming, and due soon bill totals.
// -- Allows users to view additional recurring bills details via the CTA.

const Recurring = () => {
  const finCtx = useContext(FinanceContext);
  const paidBills = finCtx.getRecurringBillsByStatus("paid");
  const upcomingBills = finCtx.getRecurringBillsByStatus("upcoming");
  const dueSoonBills = finCtx.getRecurringBillsByStatus("due-soon");

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-8">
        <SectionHeading
          start={<SectionTitle title="Recurring Bills" size="lg" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex flex-col gap-3">
          <RecurringCategoryItem
            theme="green"
            category="Paid Bills"
            balance={finCtx.getRecurringBillsByStatusTotal(paidBills)}
          />
          <RecurringCategoryItem
            theme="yellow"
            category="Total Upcoming"
            balance={finCtx.getRecurringBillsByStatusTotal(upcomingBills)}
          />
          <RecurringCategoryItem
            theme="cyan"
            category="Due Soon"
            balance={finCtx.getRecurringBillsByStatusTotal(dueSoonBills)}
          />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Recurring;