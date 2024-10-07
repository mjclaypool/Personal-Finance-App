import { JSX } from "react";

import caretDown from "../assets/images/icon-caret-down.svg";

const DropdownWrapper = (props: {selected: string, width: string, didToggle: () => void, children?: JSX.Element}) => {
  return (
    <div className={`relative flex items-center h-full ${props.width} bg-white border-[1px] border-p-beige500 rounded-lg pointer-events-none`}>
      <div
        className="flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900 pointer-events-auto cursor-pointer">
        <div className="relative">
          <button type="button" className="w-full h-full text-start px-250 py-[10px]" onClick={props.didToggle}>{props.selected}</button>
          {props.children}
        </div>
      </div>
      <img src={caretDown} alt="Caret down icon" className="absolute right-4 top-[50%] -translate-y-[50%]" />
    </div>
  )
}

export default DropdownWrapper;