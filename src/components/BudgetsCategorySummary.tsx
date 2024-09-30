import { useContext } from "react";

import BudgetsCategorySpending from "./BudgetsCategorySpending";
import Button from "../UI/Button";
import CategorySummary from "../components/CategorySummary";
import FinanceContext from "../store/FinanceContext";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

// BudgetsCategorySummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the amount spent vs amount free for a given budget category, both in text and via a progress bar.

const BudgetsCategorySummary = ( props: {cat: string, max: number, theme: string} ) => {
  const finCtx = useContext(FinanceContext);

  const spent = finCtx.getBudgetSpendingByCat(props.cat);
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
        <div className="flex flex-col gap-5">
          <SectionHeading
            start={<SectionTitle title={props.cat} size="lg" theme={props.theme} />}
            end={<Button type="ellipse"/>}
          />
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