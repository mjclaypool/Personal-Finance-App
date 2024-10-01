import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

import paidIcon from "../assets/images/icon-bill-paid.svg";
import dueIcon from "../assets/images/icon-bill-due.svg";

// RecurringItem component
//
// Used in: RecurringItemsList.tsx
// Function:
// -- Displays a given recurring bill, including a visual indicator for paid and due soon bills as applicable.

type transactionProps = {
  avatar: string,
  name: string,
  date: string,
  amount: number,
}

const RecurringItem = (props: transactionProps) => {
  const finCtx = useContext(FinanceContext);
  const dayDue = props.date.substring(8, 10);
  const currentDay = "19";
  const daySoon = "26";

  let paymentStatus = "";
  if (dayDue <= currentDay) {
    paymentStatus = "paid";
  } else if (dayDue > currentDay && dayDue < daySoon) {
    paymentStatus = "due-soon";
  } else {
    paymentStatus = "unpaid";
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      <div className="flex items-center gap-4">
        <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        <h3 className="text-preset4 text-p-grey900 font-bold">{props.name}</h3>
      </div>
      <div className="flex justify-between items-center md:gap-8">
        <div className="flex gap-2 md:w-[120px]">
          {paymentStatus == "paid" && <p className="text-preset5 text-s-green">Monthly - {finCtx.formatDay(dayDue)}</p>}
          {paymentStatus !== "paid" && <p className="text-preset5 text-p-grey500">Monthly - {finCtx.formatDay(dayDue)}</p>}
          {paymentStatus == "paid" && <img src={paidIcon} alt="Paid Icon" />}
          {paymentStatus == "due-soon" && <img src={dueIcon} alt="Due Icon" />}
        </div>
        {paymentStatus == "due-soon" && <p className="text-preset4 text-s-red font-bold md:w-[100px] md:text-end">{finCtx.formatWithCents(-props.amount)}</p>}
        {paymentStatus !== "due-soon" && <p className="text-preset4 text-p-grey900 font-bold md:w-[100px] md:text-end">{finCtx.formatWithCents(-props.amount)}</p>}
      </div>
    </div>
  )
}

export default RecurringItem;