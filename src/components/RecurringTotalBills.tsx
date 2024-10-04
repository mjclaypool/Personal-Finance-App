import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

import billsIcon from "../assets/images/icon-recurring-bills.svg";

const RecurringTotalBills = () => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex md:flex-col items-center md:items-start gap-5 md:gap-8">
      <img src={billsIcon} alt="Recurring bills icon" />
      <div className="flex flex-col gap-[11px]">
        <h2 className="text-preset4 text-white">Total bills</h2>
        <p className="text-preset1 text-white">{finCtx.formatWithCents(finCtx.getRecurringBillsTotal())}</p>
      </div>
    </div>
  )
}

export default RecurringTotalBills;