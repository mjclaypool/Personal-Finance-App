import { JSX } from "react";

type headingProps = {
  pageTitle: string,
  button?: JSX.Element
}

const PageHeading = (props: headingProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-preset1 text-p-grey900">{props.pageTitle}</h1>
      {props.button}
    </div>
  )
}

export default PageHeading;