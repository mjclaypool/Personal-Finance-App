import { useContext } from "react";

import BudgetsChart from "./BudgetsChart";
import BudgetSpendingSummaryItem from "./BudgetSpendingSummaryItem";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import FinanceContext from "../store/FinanceContext";

// BudgetsSpendingSummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays a spending summary of all budget categories, including a graph of total spending compared to budget limits.

type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const BudgetSpendingSummary = (props: {spending: transactionType[] }) => {
  const finCtx = useContext(FinanceContext);

  return (
    <SectionWrapper color='white'>
      <div className="flex flex-col md:flex-row md:items-center xl:flex-col xl:w-[364px] gap-8">
        <BudgetsChart />
        <div className="flex flex-col gap-6 md:flex-1 xl:w-full">
          <SectionTitle title="Spending Summary" size="md" />
          <div>
            {finCtx.budgets.map((budget) => (
              <div key={budget.category}>
                <BudgetSpendingSummaryItem
                  cat={budget.category}
                  theme={budget.theme}
                  spent={finCtx.getBudgetSpendingByCat(budget.category, props.spending)}
                  max={budget.maximum}
                />
                {finCtx.budgets.indexOf(budget) < (finCtx.budgets.length - 1) && <div className="h-[1px] bg-p-grey100 my-4"/>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default BudgetSpendingSummary;