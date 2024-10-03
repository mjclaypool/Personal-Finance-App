import { useContext } from "react"

import FinanceContext from "../store/FinanceContext"

const SectionTitle = (props: {title: string, size: string, theme?: string}) => {
  const finCtx = useContext(FinanceContext);
  let color = "bg-p-grey500";

  if (props.theme) {
    color = finCtx.getColorVar(props.theme);
  }

  const sizeVariants: {[key: string]: string} = {
    lg: "text-preset2",
    md: "text-preset3"
  }

  return (
    <div className="flex items-center gap-4">
      {props.theme && <div className={`${color} h-4 w-4 rounded-full`}/>}
      <h2 className={`${sizeVariants[props.size]} text-p-grey900`}>{props.title}</h2>
    </div>
  )
}

export default SectionTitle;