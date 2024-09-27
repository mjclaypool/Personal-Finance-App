import PageHeading from "../components/PageHeading";
import SectionWrapper from "../components/SectionWrapper";
import SectionHeading from "../components/SectionHeading";
import SectionTitle from "../components/SectionTitle";
import BudgetsCategorySummary from "../components/BudgetsCategorySummary";
import Button from "../components/Button";
import { budgets } from "../data/data.json";

const BudgetsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Budgets" button={<Button label="Add New Budget" type="primary"/>} />
      <div className="flex flex-col gap-6">
        {budgets.map((budget) => (
          <div key={budget.category}>
            <SectionWrapper>
              <div className="flex flex-col gap-5">
                <SectionHeading
                  start={<SectionTitle title={budget.category} theme={budget.theme} />}
                  end={<Button type="ellipse"/>}
                />
                <BudgetsCategorySummary
                  cat={budget.category}
                  max={budget.maximum}
                  theme={budget.theme}
                />
              </div>
            </SectionWrapper>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetsPage;