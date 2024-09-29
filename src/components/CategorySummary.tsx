// CategorySummary component
//
// Used in: Pots.tsx, Budgets.tsx, BudgetsCategorySummary
// Function:
// -- Displays a vertical colored bar, followed by a category name and total.

type categorySummProps = {
  name: string,
  total: string,
  theme: string
}

const CategorySummary = (props: categorySummProps) => {
  const colorVariants: {[key: string]: string} = {
    "#277C78": "bg-s-green",
    "#F2CDAC": "bg-s-yellow",
    "#82C9D7": "bg-s-cyan",
    "#626070": "bg-s-navy",
    "#C94736": "bg-s-red",
    "#826CB0": "bg-s-purple",
    "free": "bg-p-beige100"
  }

  return (
    <div className="flex gap-4">
      <div className={`${colorVariants[props.theme]} w-[4px] rounded-full`} />
      <div className="flex flex-col gap-1">
        <h4 className="text-preset5 text-p-grey500">{props.name}</h4>
        <p className="text-preset4 text-p-grey900 font-bold">{props.total}</p>
      </div>
    </div>
  )
}

export default CategorySummary;