import { useContext } from "react";
import { Link } from "react-router-dom";

import BudgetsChart from "./BudgetsChart";
import Button from "../UI/Button";
import CategorySummary from "./CategorySummary";
import FinanceContext from "../store/FinanceContext";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import UserProgressContext from "../store/UserProgressContext";

// Budgets component
//
// Used in: Homepage.tsx
// Function:
// -- Graphically displays the user's total spending across all budgets.
// -- Displays up to 4 budgets and the amount spent in each.
// -- Allows users to view additional budgets details via the CTA.

type budget = {
  category: string,
  maximum: number,
  theme: string
}

const Budgets = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const budgetsForDashboard: budget[] = finCtx.budgets.slice(0, 4);

  function handleClick() {
    userCtx.updateCurrentPage("Budgets");
    window.scrollTo(0, 0);
  }

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Budgets" size="lg" />}
          end={<Link to="/budgets" onClick={handleClick}><Button label="See Details" type="tertiary"/></Link>}
        />
        <div className="flex flex-col md:flex-row md:justify-between gap-5 md:py-[31px]">
          <BudgetsChart />
          <div className="flex flex-wrap md:flex-col gap-y-4">
            {budgetsForDashboard.map(budget => (
              <div key={budget.category} className="w-[50%] md:w-auto">
                <CategorySummary name={budget.category} total={finCtx.formatWithCents(budget.maximum)} theme={budget.theme} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Budgets;