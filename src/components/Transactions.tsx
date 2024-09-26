import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import SectionTitle from "./SectionTitle";
import TransactionItem from "./TransactionItem";
import Button from "./Button";
import { transactions } from "../data/data.json";

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const Transactions = () => {
  const transactionsForDashboard: transaction[] = transactions.slice(0, 5);

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-8">
        <SectionHeading
          start={<SectionTitle title="Transactions" />}
          end={<Button label="View All" type="tertiary"/>}
        />
        <div>
          {transactionsForDashboard.map(transaction => (
            <div key={transaction.name}>
              <TransactionItem
                avatar={transaction.avatar}
                name={transaction.name}
                date={transaction.date}
                amount={transaction.amount}
              />
              {transactionsForDashboard.indexOf(transaction) < (transactionsForDashboard.length - 1) &&
                <div className="h-[1px] bg-p-grey100 my-5"/>
              }
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Transactions;