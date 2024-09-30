import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// TransactionItem component
//
// Used in: Transactions.tsx, TransactionsPage.tsx, BudgetsCategorySpending.tsx
// Function:
// -- Displays a transaction, including an image (optional), name, date, and amount.

type transactionProps = {
  avatar: string,
  avatarVariableVis?: boolean,
  category?: string,
  name: string,
  date: string,
  amount: number,
  size: string,
}

const TransactionItem = (props: transactionProps) => {
  const finCtx = useContext(FinanceContext);
  const day = props.date.substring(8, 10);
  const month = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(props.date.substring(5, 7)));
  const year = props.date.substring(0, 4);
  const date = day + " " + month + ", " + year;

  const sizeVariants: {[key: string]: string} = {
    lg: "gap-2",
    md: "gap-1"
  }

  return (
    <div className="flex justify-between items-center md:gap-8">
      <div className="flex items-center gap-4 md:flex-1">
        {props.avatarVariableVis ?
          <img src={props.avatar} alt="avatar image" className="hidden md:block h-8 object-cover rounded-full" />
        :
          <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        }
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-8 md:flex-1">
          <h3 className="text-preset4 text-p-grey900 font-bold md:flex-1">{props.name}</h3>
          {props.category && <p className="text-preset5 text-p-grey500 md:w-[80px] xl:w-[120px]">{props.category}</p>}
        </div>
      </div>
      <div className={`${sizeVariants[props.size]} flex flex-col items-end md:flex-row-reverse md:items-center md:gap-8`}>
        {props.amount > 0 ?
          <p className="text-preset4 text-s-green font-bold md:text-end md:w-[88px] xl:w-[200px]">+{finCtx.formatWithCents(props.amount)}</p>
        :
          <p className="text-preset4 text-p-grey900 font-bold md:text-end md:w-[88px] xl:w-[200px]">{finCtx.formatWithCents(props.amount)}</p>
        }
        <p className="text-preset5 text-p-grey500 md:w-[88px] xl:w-[120px]">{date}</p>
      </div>
    </div>
  )
}

export default TransactionItem;