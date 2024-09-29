import CategorySummary from "../components/CategorySummary";

import { formatterWithCents } from "../utils/currencyFormatter";
import { transactions } from "../data/data.json";

// BudgetsCategorySummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the amount spent vs amount free for a given budget category, both in text and via a progress bar.

const BudgetsCategorySummary = ( props: {cat: string, max: number, theme: string} ) => {
  const colorVariants: {[key: string]: string} = {
    "#277C78": "bg-s-green",
    "#F2CDAC": "bg-s-yellow",
    "#82C9D7": "bg-s-cyan",
    "#626070": "bg-s-navy",
    "#C94736": "bg-s-red",
    "#826CB0": "bg-s-purple"
  }

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
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].category == category) {
        amount += -transactions[i].amount;
      }
    }
    return amount;
  }

  return (
    <>
      <p className="text-preset4 text-p-grey500">Maximum of {formatterWithCents.format(props.max)}</p>
      <div className="h-8 bg-p-beige100 rounded-[4px] p-1">
        <div className={`${colorVariants[props.theme]} h-full rounded-[4px]`} style={{ width: percentSpent }} />
      </div>
      <div className="flex">
        <div className="flex-1">
          <CategorySummary name="Spent" total={formatterWithCents.format(spent)} theme={props.theme} />
        </div>
        <div className="flex-1">
          <CategorySummary name="Free" total={avail < 0 ? formatterWithCents.format(0) : formatterWithCents.format(avail)} theme="free" />
        </div>
      </div>
    </>
  )
}

export default BudgetsCategorySummary;