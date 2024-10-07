import { useContext } from "react";

import AddBudgetModal from "../UI/AddBudgetModal";
import BudgetsCategorySummary from "../components/BudgetsCategorySummary";
import BudgetSpendingSummary from "../components/BudgetSpendingSummary";
import Button from "../UI/Button";
import FinanceContext from "../store/FinanceContext";
import UserProgressContext from "../store/UserProgressContext";
import PageHeading from "../UI/PageHeading";

// Budgets Page
//
// -- Allows the user to add new budget categories.
// -- Displays a spending summary of all budget categories, including a graph of total spending compared to budget limits.
// -- Displays each category's spending details, including the most recent 3 transactions in each category.
// ---- Allows the user to edit/delete individual budget categories.

const BudgetsPage = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const budgetSpending = finCtx.getBudgetSpending();

  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        pageTitle="Budgets"
        button={
          <div onClick={() => userCtx.updateModalType("Add New Budget")}>
            <Button label="+ Add New Budget" type="primary"/>
          </div>
        }
      />
      <div className="flex flex-col xl:flex-row gap-6">
        <BudgetSpendingSummary spending={budgetSpending} />
        <div className="flex flex-col gap-6 xl:flex-1">
          {finCtx.budgets.map((budget) => (
            <div key={budget.category}>
              <BudgetsCategorySummary budget={budget} spending={budgetSpending} />
            </div>
          ))}
        </div>
      </div>
      {userCtx.modalType == "Add New Budget" && <AddBudgetModal />}
    </div>
  )
}

export default BudgetsPage;