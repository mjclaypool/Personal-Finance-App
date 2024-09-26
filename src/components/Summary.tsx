import SummaryItem from "./SummaryItem";
import { balance } from "../data/data.json";

const Summary = () => {
  return (
    <div className="flex flex-col gap-3 py-400">
      <SummaryItem theme="dark" category="Current Balance" balance={balance.current} />
      <SummaryItem theme="light" category="Income" balance={balance.income} />
      <SummaryItem theme="light" category="Expenses" balance={balance.expenses} />
    </div>
  )
}

export default Summary;