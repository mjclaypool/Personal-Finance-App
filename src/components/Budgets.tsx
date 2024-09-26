import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import SectionTitle from "./SectionTitle";
import CategorySummary from "./CategorySummary";
import Button from "./Button";
import { budgets } from "../data/data.json";

type budgetData = {
  category: string,
  maximum: number,
  theme: string
}[]

const Budgets = () => {
  const budgetsForDashboard: budgetData = budgets.slice(0, 4);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Budgets" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex flex-wrap gap-y-4">
          {budgetsForDashboard.map(budget => (
            <div key={budget.category} className="w-1/2">
              <CategorySummary name={budget.category} total={formatter.format(budget.maximum)} theme={budget.theme} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Budgets;