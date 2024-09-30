import { useContext } from "react";

import Button from "../UI/Button";
import FinanceContext from "../store/FinanceContext";
import RecurringCategoryItem from "./RecurringCategoryItem";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import {
  getRecurring,
  getRecurringStatus,
  getBillsWithStats,
  getTotal,
  getPaidBills,
  getUpcomingBills,
  getDueSoonBills
} from "../utils/recurringBills";

// Recurring component
//
// Used in: Homepage.tsx
// Function:
// -- Displays the user's paid, upcoming, and due soon bill totals.
// -- Allows users to view additional recurring bills details via the CTA.

const Recurring = () => {
  const finCtx = useContext(FinanceContext);
  const recurringBills = getRecurring(finCtx.transactions);
  const recurringBillsStatus = getRecurringStatus(finCtx.transactions, recurringBills);
  const recurringBillsWithStatus = getBillsWithStats(recurringBills, recurringBillsStatus);

  const paidBills = getPaidBills(recurringBillsWithStatus);
  const upcomingBills = getUpcomingBills(recurringBillsWithStatus);
  const dueSoonBills = getDueSoonBills(upcomingBills);

  const paidBillsTotal = getTotal(paidBills);
  const upcomingBillsTotal = getTotal(upcomingBills);
  const dueSoonBillsTotal = getTotal(dueSoonBills);

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-8">
        <SectionHeading
          start={<SectionTitle title="Recurring Bills" size="lg" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex flex-col gap-3">
          <RecurringCategoryItem theme="green" category="Paid Bills" balance={-paidBillsTotal} />
          <RecurringCategoryItem theme="yellow" category="Total Upcoming" balance={-upcomingBillsTotal} />
          <RecurringCategoryItem theme="cyan" category="Due Soon" balance={-dueSoonBillsTotal} />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Recurring;