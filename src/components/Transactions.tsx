import { useContext } from "react";

import Button from "../UI/Button";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import TransactionItem from "./TransactionItem";

import FinanceContext from "../store/FinanceContext";

// Transactions component
//
// Used in: Homepage.tsx
// Function:
// -- Displays the user's most recent 5 transactions.
// -- Allows users to view additional transactions details via the CTA.

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const Transactions = () => {
  const finCtx = useContext(FinanceContext);
  const transactionsForDashboard: transaction[] = finCtx.transactions.slice(0, 5);

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-8">
        <SectionHeading
          start={<SectionTitle title="Transactions" size="lg" />}
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
                size="lg"
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