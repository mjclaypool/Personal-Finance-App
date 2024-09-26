type transactionProps = {
  avatar: string,
  name: string,
  date: string,
  amount: number,
}

const TransactionItem = (props: transactionProps) => {
  const day = props.date.substring(8, 10);
  const month = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(props.date.substring(5, 7)));
  const year = props.date.substring(0, 4);
  const date = day + " " + month + ", " + year;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={props.avatar} alt="avatar image" className="h-8 object-cover rounded-full" />
        <h3 className="text-preset4 text-p-grey900 font-bold">{props.name}</h3>
      </div>
      <div className="flex flex-col items-end gap-2">
        {props.amount > 0 ?
          <p className="text-preset4 text-s-green font-bold">+{formatter.format(props.amount)}</p>
        :
          <p className="text-preset4 text-p-grey900 font-bold">{formatter.format(props.amount)}</p>
        }
        <p className="text-preset5 text-p-grey500">{date}</p>
      </div>
    </div>
  )
}

export default TransactionItem;