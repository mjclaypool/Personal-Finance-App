import { useState } from "react";

import caretDown from "../assets/images/icon-caret-down.svg";

const DropdownMenu = (props: {options: string[], didChange: (rule: string) => void}) => {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  function toggleDropdown() {
    if (dropdownIsOpen == false) {
      setDropdownIsOpen(true);
    } else {
      setDropdownIsOpen(false);
    }
  }

  function handleChange(option: string) {
    setDropdownIsOpen(false);
    setSelectedOption(option);
    props.didChange(option)
  }

  return (
    <div className="relative flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg pointer-events-none">
      <div className="flex flex-col flex-1 px-250 pr-500 py-[10px] bg-white rounded-lg text-preset4 text-p-grey900 pointer-events-auto" onClick={toggleDropdown}>
        <div>{selectedOption}</div>
        {dropdownIsOpen == true &&
          <div className="absolute z-10 w-full top-14 right-0 flex flex-col bg-white rounded-lg py-150 px-250 shadow-dropdown">
            {props.options.map((option) => (
              <div key={option}>
                <div className="cursor-pointer" onClick={() => handleChange(option)}>
                  <p>{option}</p>
                </div>
                {props.options.indexOf(option) < (props.options.length - 1) &&
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

export default DropdownMenu;