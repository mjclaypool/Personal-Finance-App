import Summary from "../components/Summary";
import Pots from "../components/Pots";
import Transactions from "../components/Transactions";
import Budgets from "../components/Budgets";
import Recurring from "../components/Recurring";

const Homepage = () => {
  return (
    <>
      <h1 className="text-preset1 text-p-grey900">Overview</h1>
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