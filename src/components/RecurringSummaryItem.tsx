import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// RecurringSummaryItem component
//
// Used in: RecurringSummary.tsx
// Function:
// -- Displays the title, quantity, and total for a given recurring bill category.

type summaryItemProps = {
  title: string,
  qty: number,
  total: number,
  color: string
}

const RecurringSummaryItem = (props: summaryItemProps) => {
  const finCtx = useContext(FinanceContext);
  const colorVariants: {[key: string]: string} = {
    default: "text-p-grey500",
    red: "text-s-red",
  }

  return (
    <div className="flex justify-between items-center">
      <h3 className={`${colorVariants[props.color]} text-preset5`}>{props.title}</h3>
      <p className={`${colorVariants[props.color]} text-preset5 text-p-grey900 font-bold`}>{props.qty} ({finCtx.formatWithCents(props.total)})</p>
    </div>
  )
}

export default RecurringSummaryItem;