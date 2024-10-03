import RecurringItem from "../components/RecurringItem";
import TransactionHeaderBar from "./TransactionHeaderBar";

// RecurringItemsList component
//
// Used in: RecurringBillsPage.tsx
// Function:
// -- Displays a list of all recurring monthly bills.

type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const RecurringItemsList = (props: {bills: transactionType[]}) => {
  return (
    <div>
      <TransactionHeaderBar type="recurring" />
      {props.bills.map(transaction => (
        <div key={transaction.name + transaction.date}>
          <RecurringItem
            avatar={transaction.avatar}
            name={transaction.name}
            date={transaction.date}
            amount={transaction.amount}
          />
          {props.bills.indexOf(transaction) < (props.bills.length - 1) &&
            <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-5"/>
          }
        </div>
      ))}
    </div>
  )
}

export default RecurringItemsList;