import { formatterWithCents } from "../utils/currencyFormatter";

import paidIcon from "../assets/images/icon-bill-paid.svg";
import dueIcon from "../assets/images/icon-bill-due.svg";

type transactionProps = {
  avatar: string,
  name: string,
  date: string,
  amount: number,
  size: string,
  paid?: boolean
}

const RecurringItem = (props: transactionProps) => {
  const dayDue = props.date.substring(8, 10);
  let day = dayDue;
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }

  let suffix = "th";
  if (day == '1' || day == "21") {
    suffix = "st";
  } else if (day == '2' || day == '22') {
    suffix = "nd";
  } else if (day == '3' || day == '23') {
    suffix = "rd";
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        <h3 className="text-preset4 text-p-grey900 font-bold">{props.name}</h3>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <p className="text-preset5 text-s-green">Monthly - {day}{suffix}</p>
          {props.paid && <img src={paidIcon} alt="Paid Icon" />}
          {(!props.paid && (dayDue > "19" && dayDue < "25")) && <img src={dueIcon} alt="Due Icon" />}
        </div>
        {(!props.paid && (dayDue > "19" && dayDue < "25")) ?
          <p className="text-preset4 text-s-red font-bold">{formatterWithCents.format(-props.amount)}</p>
        :
          <p className="text-preset4 text-p-grey900 font-bold">{formatterWithCents.format(-props.amount)}</p>
        }
      </div>
    </div>
  )
}

export default RecurringItem;