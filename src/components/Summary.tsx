import SummaryItem from "./SummaryItem";
import { balance } from "../data/data.json";

const Summary = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 py-400">
      <SummaryItem theme="dark" category="Current Balance" balance={balance.current} />
      <SummaryItem theme="light" category="Income" balance={balance.income} />
      <SummaryItem theme="light" category="Expenses" balance={balance.expenses} />
    </div>
  )
}

export default Summary;