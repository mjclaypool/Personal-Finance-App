import { useContext } from "react";

import BudgetsCategorySpending from "./BudgetsCategorySpending";
import Button from "../UI/Button";
import CategorySummary from "../components/CategorySummary";
import DropdownEditDelete from "../UI/DropdownEditDelete";
import FinanceContext from "../store/FinanceContext";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

// BudgetsCategorySummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the amount spent vs amount free for a given budget category, both in text and via a progress bar.

type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const BudgetsCategorySummary = ( props: {cat: string, max: number, theme: string, spending: transactionType[]} ) => {
  const finCtx = useContext(FinanceContext);

  const spent = finCtx.getBudgetSpendingByCat(props.cat, props.spending);
  const avail = props.max - spent;
  let percentSpent = "";
  if ((spent / props.max) * 100 > 100) {
    percentSpent = '100%';
  } else {
    percentSpent = ((spent / props.max) * 100).toString() + '%';
  }

  return (
    <>
      <SectionWrapper color="white">
        <div className="relative flex flex-col gap-5">
          <SectionHeading
            start={<SectionTitle title={props.cat} size="lg" theme={props.theme} />}
            end={<div onClick={() => finCtx.updateDropdown(props.cat)}><Button type="ellipse"/></div>}
          />
          {finCtx.dropdown == props.cat && <DropdownEditDelete type="Budget" />}
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
          <BudgetsCategorySpending cat={props.cat} />
        </div>
      </SectionWrapper>
    </>
  )
}

export default BudgetsCategorySummary;