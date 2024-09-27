import PageHeading from "../components/PageHeading";
import Summary from "../components/Summary";
import Pots from "../components/Pots";
import Transactions from "../components/Transactions";
import Budgets from "../components/Budgets";
import Recurring from "../components/Recurring";

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