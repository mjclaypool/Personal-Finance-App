import RecurringItem from "../components/RecurringItem";

// RecurringItemsList component
//
// Used in: RecurringBillsPage.tsx
// Function:
// -- Displays a list of all recurring monthly bills.

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean,
  paid?: boolean
}

const RecurringItemsList = (props: {bills: transaction[]}) => {
  return (
    <div>
      {props.bills.map(transaction => (
        <div key={transaction.name + transaction.date}>
          <RecurringItem
            avatar={transaction.avatar}
            name={transaction.name}
            date={transaction.date}
            amount={transaction.amount}
            size="md"
            paid={transaction.paid}
          />
          {props.bills.indexOf(transaction) < (props.bills.length - 1) &&
            <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
          }
        </div>
      ))}
    </div>
  )
}

export default RecurringItemsList;