import Button from "../UI/Button";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import TransactionItem from "./TransactionItem";

import { transactions } from "../data/data.json";

// BudgetsCategorySpending component
//
// Used in: BudgetsPage.tsx
// Function:
// -- Displays the most recent 3 transactions for a given budget category.

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const BudgetsCategorySpending = (props: {cat: string}) => {
  const categoryTransactions = getSpending(props.cat);
  const transactionsForLatest: transaction[] = categoryTransactions.slice(0, 3);

  function getSpending(category: string) {
    let filteredArray = [];
    for (let i=0; i < transactions.length; i++) {
      if (transactions[i].category == category) {
        filteredArray.push(transactions[i]);
      }
    }
    return filteredArray;
  }

  return (
    <SectionWrapper color="beige">
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Latest Spending" size="md" />}
          end={<Button type="tertiary" label="See All" />}
        />
        <div>
          {transactionsForLatest.map(transaction => (
            <div key={transaction.name + transaction.date}>
              <TransactionItem
                avatar={transaction.avatar}
                avatarVariableVis={true}
                name={transaction.name}
                date={transaction.date}
                amount={transaction.amount}
                size="md"
              />
              {transactionsForLatest.indexOf(transaction) < (transactionsForLatest.length - 1) &&
                <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
              }
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default BudgetsCategorySpending;