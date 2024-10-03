import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// PotsProgressBar component
//
// Used in: PotsCategorySummary.tsx
// Function:
// -- Displays a pot's savings details, including the amount saved and the target amount.

type potsBarProps = {
  title: string,
  total: number,
  add?: number,
  withdraw?: number,
  target: number,
  theme: string
}

const PotsProgressBar = (props: potsBarProps) => {
  const finCtx = useContext(FinanceContext);

  let barColor = finCtx.getColorVar(props.theme);
  if (props.theme == "#201F24") {
    barColor = "bg-p-grey900"
  }

  const changeAmount = props.add || props.withdraw || 0;
  let changeBarColor = "bg-s-green";
  if (props.withdraw) {
    changeBarColor = "bg-s-red"
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
          {changeAmount > 0 && <div className={`${changeBarColor} h-full rounded-full`} style={{ width: changePercentAsString }} />}
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