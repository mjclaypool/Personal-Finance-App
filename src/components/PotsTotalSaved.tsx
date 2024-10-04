import potIcon from "../assets/images/icon-pot.svg";

// PotsTotalSaved component
//
// Used in: Pots.tsx
// Function:
// -- Displays the user's total savings across all pots.

const PotsTotalSaved = (props: {total: string}) => {
  return (
    <div className="flex items-center gap-4 bg-p-beige100 rounded-xl px-200 py-250 md:min-w-[247px]">
      <div className="py-[2px] px-[6px]">
        <img src={potIcon} alt="Icon for money pots" />
      </div>
      <div className="flex flex-col gap-[11px]">
        <h3 className="text-preset4 text-p-grey500">Total Saved</h3>
        <p className="text-preset1 text-p-grey900">{props.total}</p>
      </div>
    </div>
  )
}

export default PotsTotalSaved;