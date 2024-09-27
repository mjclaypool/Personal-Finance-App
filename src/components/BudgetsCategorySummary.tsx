import CategorySummary from "../components/CategorySummary";
import { transactions } from "../data/data.json";

const BudgetsCategorySummary = ( props: {cat: string, max: number, theme: string} ) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const spent = getSpending(props.cat);
  const avail = props.max - spent;

  function getSpending(category: string) {
    let amount = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].category == category) {
        amount += -transactions[i].amount;
      }
    }
    return amount;
  }

  return (
    <>
      <p className="text-preset4 text-p-grey500">Maximum of {formatter.format(props.max)}</p>
      <div className="flex">
        <div className="flex-1">
          <CategorySummary name="Spent" total={formatter.format(spent)} theme={props.theme} />
        </div>
        <div className="flex-1">
          <CategorySummary name="Free" total={avail < 0 ? formatter.format(0) : formatter.format(avail)} theme="free" />
        </div>
      </div>
    </>
  )
}

export default BudgetsCategorySummary;