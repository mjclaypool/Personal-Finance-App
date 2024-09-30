import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import PageHeading from "../UI/PageHeading";
import SearchBar from "../UI/SearchBar";
import SectionWrapper from "../UI/SectionWrapper";
import TransactionItem from "../components/TransactionItem";

// Transactions Page
//
// -- Displays 10 transactions at a time, allowing the user to view additional transactions by clicking through subpages.
// -- Allows the user to search, filter, and sort transactions.

const TransactionsPage = () => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Transactions" />
      <SectionWrapper color="white">
        <div className="flex flex-col gap-6">
          <SearchBar sort={true} filter={true} />
          <div>
            {finCtx.transactions.map(transaction => (
              <div key={transaction.name + transaction.date}>
                <TransactionItem
                  avatar={transaction.avatar}
                  category={transaction.category}
                  name={transaction.name}
                  date={transaction.date}
                  amount={transaction.amount}
                  size="md"
                />
                {finCtx.transactions.indexOf(transaction) < (finCtx.transactions.length - 1) &&
                  <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
                }
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

export default TransactionsPage;