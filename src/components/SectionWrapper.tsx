import { JSX } from "react";

const SectionWrapper = ( props: {color: string, children: JSX.Element} ) => {
  const colorVariants: {[key: string]: string} = {
    white: "bg-white px-250 py-300 md:p-400",
    beige: "bg-p-beige100 p-200"
  }

  return (
    <div className={`${colorVariants[props.color]} rounded-xl`}>
      {props.children}
    </div>
  )
}

export default SectionWrapper;