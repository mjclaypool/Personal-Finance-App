import { useContext } from "react";

import CategorySummary from "../components/CategorySummary";
import FinanceContext from "../store/FinanceContext";

// BudgetsCategorySummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the amount spent vs amount free for a given budget category, both in text and via a progress bar.

const BudgetsCategorySummary = ( props: {cat: string, max: number, theme: string} ) => {
  const finCtx = useContext(FinanceContext);
  const spent = getSpending(props.cat);
  const avail = props.max - spent;
  let percentSpent = "";
  if ((spent / props.max) * 100 > 100) {
    percentSpent = '100%';
  } else {
    percentSpent = ((spent / props.max) * 100).toString() + '%';
  }

  function getSpending(category: string) {
    let amount = 0;
    for (let i = 0; i < finCtx.transactions.length; i++) {
      if (finCtx.transactions[i].category == category) {
        amount += -finCtx.transactions[i].amount;
      }
    }
    return amount;
  }

  return (
    <>
      <p className="text-preset4 text-p-grey500">Maximum of {finCtx.formatWithCents(props.max)}</p>
      <div className="h-8 bg-p-beige100 rounded-[4px] p-1">
        <div className={`${finCtx.getColorVar(props.theme)} h-full rounded-[4px]`} style={{ width: percentSpent }} />
      </div>
      <div className="flex">
        <div className="flex-1">
          <CategorySummary name="Spent" total={finCtx.formatWithCents(spent)} theme={props.theme} />
        </div>
        <div className="flex-1">
          <CategorySummary name="Free" total={avail < 0 ? finCtx.formatWithCents(0) : finCtx.formatWithCents(avail)} theme="free" />
        </div>
      </div>
    </>
  )
}

export default BudgetsCategorySummary;