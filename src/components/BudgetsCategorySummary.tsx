import { useContext } from "react";

import EditBudgetModal from "../UI/EditBudgetModal";
import BudgetsCategorySpending from "./BudgetsCategorySpending";
import Button from "../UI/Button";
import CategorySummary from "../components/CategorySummary";
import DeleteModal from "../UI/DeleteModal";
import DropdownEditDelete from "../UI/DropdownEditDelete";
import FinanceContext from "../store/FinanceContext";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import UserProgressContext from "../store/UserProgressContext";

// BudgetsCategorySummary component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the amount spent vs amount free for a given budget category, both in text and via a progress bar.

type budgetType = {
  category: string,
  maximum: number,
  theme: string
}

type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const BudgetsCategorySummary = ( props: {budget: budgetType, spending: transactionType[]} ) => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);

  const spent = finCtx.getBudgetSpendingByCat(props.budget.category, props.spending);
  const avail = props.budget.maximum - spent;
  let percentSpent = "";
  if ((spent / props.budget.maximum) * 100 > 100) {
    percentSpent = '100%';
  } else {
    percentSpent = ((spent / props.budget.maximum) * 100).toString() + '%';
  }

  return (
    <>
      <SectionWrapper color="white">
        <div className="relative flex flex-col gap-5">
          <SectionHeading
            start={<SectionTitle title={props.budget.category} size="lg" theme={props.budget.theme} />}
            end={
              <div onClick={() => userCtx.updateSection(props.budget.category)}>
                <Button type="ellipse"/>
              </div>
            }
          />
          <p className="text-preset4 text-p-grey500">Maximum of {finCtx.formatWithCents(props.budget.maximum)}</p>
          <div className="h-8 bg-p-beige100 rounded-[4px] p-1">
            <div className={`${finCtx.getColorVar(props.budget.theme)} h-full rounded-[4px]`} style={{ width: percentSpent }} />
          </div>
          <div className="flex">
            <div className="flex-1">
              <CategorySummary
                name="Spent"
                total={finCtx.formatWithCents(spent)}
                theme={props.budget.theme}
              />
            </div>
            <div className="flex-1">
              <CategorySummary
                name="Free"
                total={avail < 0 ? finCtx.formatWithCents(0) : finCtx.formatWithCents(avail)}
                theme="free"
              />
            </div>
          </div>
          <BudgetsCategorySpending cat={props.budget.category} />
          {userCtx.section == props.budget.category && <DropdownEditDelete />}
          {(userCtx.section == props.budget.category && userCtx.modalType == "Edit " + userCtx.page ) && <EditBudgetModal budget={props.budget} />}
          {(userCtx.section == props.budget.category && userCtx.modalType == "Delete") && <DeleteModal name={props.budget.category} />}
        </div>
      </SectionWrapper>
    </>
  )
}

export default BudgetsCategorySummary;