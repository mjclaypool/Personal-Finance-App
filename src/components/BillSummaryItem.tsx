type summaryItemProps = {
  theme: string,
  category: string,
  balance: number
}

const BillSummaryItem = (props: summaryItemProps) => {
  const colorVariants: {[key: string]: string} = {
    green: "border-l-s-green",
    yellow: "border-l-s-yellow",
    cyan: "border-l-s-cyan",
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={`${colorVariants[props.theme]} border-l-4 bg-p-beige100 flex justify-between items-center rounded-xl p-250`}>
      <h2 className="text-preset4 text-p-grey500">{props.category}</h2>
      <p className="text-preset4 text-p-grey900 font-bold">{formatter.format(props.balance)}</p>
    </div>
  )
}

export default BillSummaryItem;