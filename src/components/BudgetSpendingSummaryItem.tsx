import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// BudgetsSpendingSummaryItem component
//
// Used in: BudgetsSpendingSummary.tsx
// Function:
// -- Displays the amount spent vs amount maximum for a given budget category.

type summaryItemProps = {
  cat: string,
  theme: string,
  spent: number,
  max: number
}

const BudgetSpendingSummaryItem = (props: summaryItemProps) => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className={`${finCtx.getColorVar(props.theme)} w-[4px] h-[21px] rounded-full`} />
        <h3 className="text-preset4 text-p-grey500">{props.cat}</h3>
      </div>
      <div className="flex items-center gap-2">
        <h4 className="text-preset3 text-p-grey900">{finCtx.formatWithCents(props.spent)}</h4>
        <p className="text-preset5 text-p-grey500 font-bold">of {finCtx.formatWithCents(props.max)}</p>
      </div>
    </div>
  )
}

export default BudgetSpendingSummaryItem;