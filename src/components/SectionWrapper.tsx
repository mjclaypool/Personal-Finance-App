import { JSX } from "react";

const SectionWrapper = ( props: {children: JSX.Element} ) => {
  return (
    <div className="bg-white rounded-xl px-250 py-300 md:p-400">
      {props.children}
    </div>
  )
}

export default SectionWrapper;