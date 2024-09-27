import { formatterWithCents } from "../utils/currencyFormatter";

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
  const day = props.date.substring(8, 10);
  const month = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(props.date.substring(5, 7)));
  const year = props.date.substring(0, 4);
  const date = day + " " + month + ", " + year;

  const sizeVariants: {[key: string]: string} = {
    lg: "gap-2",
    md: "gap-1"
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {props.avatarVariableVis ?
          <img src={props.avatar} alt="avatar image" className="hidden md:block h-8 object-cover rounded-full" />
        :
          <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        }
        <div className="flex flex-col">
          <h3 className="text-preset4 text-p-grey900 font-bold">{props.name}</h3>
          {props.category && <p className="text-preset5 text-p-grey500">{props.category}</p>}
        </div>
      </div>
      <div className={`${sizeVariants[props.size]} flex flex-col items-end`}>
        {props.amount > 0 ?
          <p className="text-preset4 text-s-green font-bold">+{formatterWithCents.format(props.amount)}</p>
        :
          <p className="text-preset4 text-p-grey900 font-bold">{formatterWithCents.format(props.amount)}</p>
        }
        <p className="text-preset5 text-p-grey500">{date}</p>
      </div>
    </div>
  )
}

export default TransactionItem;