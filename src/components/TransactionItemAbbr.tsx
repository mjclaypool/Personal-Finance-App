import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// TransactionItem component
//
// Used in: Transactions.tsx, BudgetsCategorySpending.tsx
// Function:
// -- Displays a transaction, including an image, name, date, and amount.

type transactionProps = {
  avatar: string,
  avatarHiddenSmScreen?: boolean,
  name: string,
  date: string,
  amount: number,
}

const TransactionItemAbbr = (props: transactionProps) => {
  const finCtx = useContext(FinanceContext);

  let avatarVisibility = "block";
  if (props.avatarHiddenSmScreen) {
    avatarVisibility = "hidden md:block";
  }

  let amountTextColor = "text-p-grey900";
  if (props.amount > 0) {
    amountTextColor = "text-s-green";
  }

  return (
    <div className="flex justify-between items-center md:gap-8">
      <div className="flex items-center gap-4 md:flex-1">
        <img src={props.avatar} alt="avatar image" className={`${avatarVisibility} h-8 object-cover rounded-full`} />
        <h3 className="text-preset4 text-p-grey900 font-bold md:flex-1">{props.name}</h3>
      </div>
      <div className="flex flex-col items-end text-end gap-2">
        <p className={`text-preset4 ${amountTextColor} font-bold md:w-[88px] xl:w-[200px]`}>{finCtx.formatWithCents(props.amount)}</p>
        <p className="text-preset5 text-p-grey500 md:w-[88px] xl:w-[120px]">{finCtx.formatDate(props.date)}</p>
      </div>
    </div>
  )
}

export default TransactionItemAbbr;