import Button from "../UI/Button";
import CategorySummary from "./CategorySummary";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

import { formatterWithCents } from "../utils/currencyFormatter";
import { budgets } from "../data/data.json";

// Budgets component
//
// Used in: Homepage.tsx
// Function:
// -- Graphically displays the user's total spending across all budgets.
// -- Displays up to 4 budgets and the amount spent in each.
// -- Allows users to view additional budgets details via the CTA.

type budgetData = {
  category: string,
  maximum: number,
  theme: string
}

const Budgets = () => {
  const budgetsForDashboard: budgetData[] = budgets.slice(0, 4);

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Budgets" size="lg" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex flex-wrap gap-y-4">
          {budgetsForDashboard.map(budget => (
            <div key={budget.category} className="w-1/2">
              <CategorySummary name={budget.category} total={formatterWithCents.format(budget.maximum)} theme={budget.theme} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Budgets;