import { JSX } from "react";

const SectionWrapper = ( props: {children: JSX.Element} ) => {
  return (
    <div className="bg-white rounded-xl px-250 py-300">
      {props.children}
    </div>
  )
}

export default SectionWrapper;