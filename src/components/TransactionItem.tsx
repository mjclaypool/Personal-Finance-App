import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// TransactionItem component
//
// Used in: TransactionsPage.tsx
// Function:
// -- Displays a transaction, including an image, category, name, date, and amount.

type transactionProps = {
  avatar: string,
  category: string,
  name: string,
  date: string,
  amount: number,
}

const TransactionItem = (props: transactionProps) => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex justify-between items-center md:gap-8">
      <div className="flex items-center gap-4 md:flex-1">
        <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-8 md:flex-1">
          <h3 className="text-preset4 text-p-grey900 font-bold md:flex-1">{props.name}</h3>
          <p className="text-preset5 text-p-grey500 md:w-[80px] xl:w-[120px]">{props.category}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end md:flex-row-reverse md:items-center md:gap-8">
        {props.amount > 0 && <p className="text-preset4 text-s-green font-bold md:text-end md:w-[88px] xl:w-[200px]">+{finCtx.formatWithCents(props.amount)}</p>}
        {props.amount <= 0 && <p className="text-preset4 text-p-grey900 font-bold md:text-end md:w-[88px] xl:w-[200px]">{finCtx.formatWithCents(props.amount)}</p>}
        <p className="text-preset5 text-p-grey500 md:w-[88px] xl:w-[120px]">{finCtx.formatDate(props.date)}</p>
      </div>
    </div>
  )
}

export default TransactionItem;