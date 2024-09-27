const PotsCategorySummary = (props: {total: number, target: number, theme: string}) => {
  const colorVariants: {[key: string]: string} = {
    "#277C78": "bg-s-green",
    "#F2CDAC": "bg-s-yellow",
    "#82C9D7": "bg-s-cyan",
    "#626070": "bg-s-navy",
    "#C94736": "bg-s-red",
    "#826CB0": "bg-s-purple"
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const percentSaved = (Math.round(props.total * 100)  / props.target).toFixed(2);
  const percentSavedString = percentSaved.toString() + '%';

  return (
    <div className="flex flex-col gap-4 my-[10.5px]">
      <div className="flex justify-between items-center">
        <h3 className="text-preset4 text-p-grey500">Total Saved</h3>
        <p className="text-preset1 text-p-grey900">{formatter.format(props.total)}</p>
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="h-2 bg-p-beige100 rounded-full">
          <div className={`${colorVariants[props.theme]} h-full rounded-full`} style={{ width: percentSavedString }} />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-preset5 text-p-grey500 font-bold">{percentSavedString}</h4>
          <p className="text-preset5 text-p-grey500">Target of ${props.target}</p>
        </div>
      </div>
    </div>
  )
}

export default PotsCategorySummary;