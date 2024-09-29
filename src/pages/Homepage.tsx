import Budgets from "../components/Budgets";
import PageHeading from "../UI/PageHeading";
import Pots from "../components/Pots";
import Recurring from "../components/Recurring";
import Summary from "../components/Summary";
import Transactions from "../components/Transactions";

// Homepage (aka Overview Page)
//
// -- Displays a Summary of a user's current balance, income, and expenses.
// -- Displays an overview of a user's Pots, Transactions, Budgets, and Recurring Bills.
// ---- Allows users to view additional details by clicking the respective overview's CTA.

const Homepage = () => {
  return (
    <>
      <PageHeading pageTitle="Overview" />
      <Summary />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Pots />
          <Transactions />
        </div>
        <div className="flex flex-col gap-4">
          <Budgets />
          <Recurring />
        </div>
      </div>
    </>
  )
}

export default Homepage;