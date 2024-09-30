import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// CategorySummary component
//
// Used in: Pots.tsx, Budgets.tsx, BudgetsCategorySummary
// Function:
// -- Displays a vertical colored bar, followed by a category name and total.

type categorySummProps = {
  name: string,
  total: string,
  theme: string
}

const CategorySummary = (props: categorySummProps) => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex gap-4">
      <div className={`${finCtx.getColorVar(props.theme)} w-[4px] rounded-full`} />
      <div className="flex flex-col gap-1">
        <h4 className="text-preset5 text-p-grey500">{props.name}</h4>
        <p className="text-preset4 text-p-grey900 font-bold">{props.total}</p>
      </div>
    </div>
  )
}

export default CategorySummary;