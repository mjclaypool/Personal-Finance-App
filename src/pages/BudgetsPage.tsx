import BudgetsCategorySpending from "../components/BudgetsCategorySpending";
import BudgetsCategorySummary from "../components/BudgetsCategorySummary";
import Button from "../UI/Button";
import PageHeading from "../UI/PageHeading";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

import { budgets } from "../data/data.json";

// Budgets Page
//
// -- Allows the user to add new budget categories.
// -- Displays a spending summary of all budget categories, including a graph of total spending compared to budget limits.
// -- Displays each category's spending details, including the most recent 3 transactions in each category.
// ---- Allows the user to edit/delete individual budget categories.

const BudgetsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        pageTitle="Budgets"
        button={<Button label="+ Add New Budget" type="primary"/>}
      />
      <div className="flex flex-col gap-6">
        {budgets.map((budget) => (
          <div key={budget.category}>
            <SectionWrapper color="white">
              <div className="flex flex-col gap-5">
                <SectionHeading
                  start={<SectionTitle title={budget.category} size="lg" theme={budget.theme} />}
                  end={<Button type="ellipse"/>}
                />
                <BudgetsCategorySummary
                  cat={budget.category}
                  max={budget.maximum}
                  theme={budget.theme}
                />
                <BudgetsCategorySpending cat={budget.category} />
              </div>
            </SectionWrapper>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetsPage;