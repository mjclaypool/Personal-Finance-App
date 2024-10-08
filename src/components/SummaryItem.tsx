import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// SummaryItem component
//
// Used in: Summary.tsx
// Function: Displays either the user's current balance, income, or expenses.

type summaryItemProps = {
  theme: string,
  category: string,
  balance: number
}

const SummaryItem = (props: summaryItemProps) => {
  const finCtx = useContext(FinanceContext);
  const colorVariants: {[key: string]: string} = {
    dark: "bg-p-grey900 text-white",
    light: "bg-white text-p-grey900",
  }

  return (
    <div className={`${colorVariants[props.theme]} flex-1 rounded-xl p-250`}>
      <h2 className="text-preset4 pb-150">{props.category}</h2>
      <p className="text-preset1">{finCtx.formatWithCents(props.balance)}</p>
    </div>
  )
}

export default SummaryItem;