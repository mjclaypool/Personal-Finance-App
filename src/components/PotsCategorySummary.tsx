import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";

// PotsCategorySummary component
//
// Used in: PotsPage.tsx
// Function:
// -- Displays a pot's savings details, including the amount saved and the target amount.

const PotsCategorySummary = (props: {total: number, target: number, theme: string}) => {
  const finCtx = useContext(FinanceContext);
  const percentSaved = (Math.round(props.total * 100)  / props.target).toFixed(2);
  const percentSavedString = percentSaved.toString() + '%';

  return (
    <div className="flex flex-col gap-4 my-[10.5px]">
      <div className="flex justify-between items-center">
        <h3 className="text-preset4 text-p-grey500">Total Saved</h3>
        <p className="text-preset1 text-p-grey900">{finCtx.formatWithCents(props.total)}</p>
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="h-2 bg-p-beige100 rounded-full">
          <div className={`${finCtx.getColorVar(props.theme)} h-full rounded-full`} style={{ width: percentSavedString }} />
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