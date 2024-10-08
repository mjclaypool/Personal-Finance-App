import { JSX } from "react";

type headingProps = {
  start: JSX.Element,
  end: JSX.Element
}

const SectionHeading = (props: headingProps) => {
  return (
    <div className="flex justify-between items-center">
      {props.start}
      {props.end}
    </div>
  )
}

export default SectionHeading;