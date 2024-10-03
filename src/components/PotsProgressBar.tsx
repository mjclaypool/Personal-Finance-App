import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// PotsProgressBar component
//
// Used in: PotsCategorySummary.tsx
// Function:
// -- Displays a pot's savings details, including the amount saved and the target amount.

const PotsProgressBar = (props: {title: string, total: number, add?: number, withdraw?: number, target: number, theme: string}) => {
  const finCtx = useContext(FinanceContext);

  let barColor = finCtx.getColorVar(props.theme);
  if (props.theme == "#201F24") {
    barColor = "bg-p-grey900"
  }

  let changeAmount = 0;
  if (props.add) {
    changeAmount = props.add;
  } else if (props.withdraw) {
    changeAmount = props.withdraw;
  }

  let totalPercentageAsString = getPercentage(props.total);
  const changePercentAsString = getPercentage(changeAmount);
  let newTotalPercentAsString = getPercentage(props.total + changeAmount);
  let newTotal = (props.total + changeAmount)
  if (props.withdraw) {
    totalPercentageAsString = getPercentage(props.total - changeAmount);
    newTotalPercentAsString = getPercentage(props.total - changeAmount);
    newTotal = (props.total - changeAmount);
  }

  function getPercentage(value: number) {
    let amountAsPercentage = (Math.round(value * 100)  / props.target).toFixed(2)
    return (amountAsPercentage.toString()+ '%');
  }

  return (
    <div className="flex flex-col gap-4 my-[10.5px]">
      <div className="flex justify-between items-center">
        <h3 className="text-preset4 text-p-grey500">{props.title}</h3>
        <p className="text-preset1 text-p-grey900">{finCtx.formatWithCents(newTotal)}</p>
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="flex h-2 bg-p-beige100 rounded-full">
          <div className={`${barColor} h-full rounded-full`} style={{ width: totalPercentageAsString }} />
          {(changeAmount > 0 && props.add) && <div className="bg-s-green h-full rounded-full" style={{ width: changePercentAsString }} />}
          {(changeAmount > 0 && props.withdraw) && <div className="bg-s-red h-full rounded-full" style={{ width: changePercentAsString }} />}
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-preset5 text-p-grey500 font-bold">{newTotalPercentAsString}</h4>
          <p className="text-preset5 text-p-grey500">Target of ${props.target}</p>
        </div>
      </div>
    </div>
  )
}

export default PotsProgressBar;