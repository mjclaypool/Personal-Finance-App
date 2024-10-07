import { useState, useContext } from "react";

import FinanceContext from "../store/FinanceContext";

import caretDown from "../assets/images/icon-caret-down.svg";

type colorsProps = {
  code: string,
  color: string,
  name: string
}

const ColorsDropdown = (props: {initialName?: string, initialColor?: string, didChange: (rule: string) => void}) => {
  const finCtx = useContext(FinanceContext);
  const [selectedName, setSelectedName] = useState(props.initialName || "Green");
  const [selectedColor, setSelectedColor] = useState(props.initialColor || "bg-s-green");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const colorOptions = finCtx.getColorOptions();

  function toggleDropdown() {
    if (dropdownIsOpen == false) {
      setDropdownIsOpen(true);
    } else {
      setDropdownIsOpen(false);
    }
  }

  function handleChange(option: colorsProps) {
    setDropdownIsOpen(false);
    setSelectedName(option.name);
    setSelectedColor(option.color)
    props.didChange(option.code)
  }

  return (
    <div className="relative flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg pointer-events-none">
      <div className="flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900 pointer-events-auto cursor-pointer">
        <button className="flex items-center w-full gap-3 px-250 py-[10px]" onClick={toggleDropdown}>
          <div className={`${selectedColor} h-4 w-4 rounded-full`}/>
          {selectedName}
        </button>
        {dropdownIsOpen == true &&
          <div className="absolute z-10 w-full max-h-[212px] top-14 right-0 flex flex-col bg-white rounded-lg py-150 px-250 shadow-dropdown overflow-y-scroll">
            {colorOptions.map((option) => (
              <div key={option.name}>
                <button className="flex items-center w-full gap-3 cursor-pointer" onClick={() => handleChange(option)}>
                  <div className={`${option.color} h-4 w-4 rounded-full`}/>
                  {option.name}
                </button>
                {colorOptions.indexOf(option) < (colorOptions.length - 1) &&
                  <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
                }
              </div>
            ))}
          </div>
        }
      </div>
      <img src={caretDown} alt="Caret down icon" className="absolute right-4 top-[50%] -translate-y-[50%]" />
    </div>
  )
}

export default ColorsDropdown;