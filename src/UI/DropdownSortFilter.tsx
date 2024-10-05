import { useState, useContext } from "react";

import DropdownWrapper from "./DropdownWrapper";
import DropdownOptions from "./DropdownOptions";
import FinanceContext from "../store/FinanceContext";

import sortIcon from "../assets/images/icon-sort-mobile.svg";
import filterIcon from "../assets/images/icon-filter-mobile.svg";

const DropdownSortFilter = (props: {label: string, initial: string, filter?: boolean}) => {
  const [selectedOption, setSelectedOption] = useState(props.initial);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const finCtx = useContext(FinanceContext);

  let dropdownOptions: string[];
  let wrapperWidth = "";
  if (props.filter) {
    let initialCategory = [props.initial];
    let categoryList = (finCtx.getCatArray("transactions", "category"));
    dropdownOptions = initialCategory.concat(categoryList);
    wrapperWidth = "w-[177px]";
  } else {
    dropdownOptions = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
    wrapperWidth = "w-[114px]";
  }

  function handleToggle() {
    if (dropdownIsOpen == false) {
      setDropdownIsOpen(true);
    } else {
      setDropdownIsOpen(false);
    }
  }

  function handleUserSelect(rule: string) {
    if (props.filter) {
      finCtx.updateFilterRule(rule);
    } else {
      finCtx.updateSortingRule(rule);
    }
    setSelectedOption(rule);
    setDropdownIsOpen(false);
  }

  return (
    <>
      <div className="relative md:hidden text-preset4 text-p-grey900">
        {props.filter && <img src={filterIcon} alt="Filter Icon" className="h-4 md:hidden cursor-pointer" onClick={handleToggle}/>}
        {!props.filter && <img src={sortIcon} alt="Sort Icon" className="h-4 md:hidden cursor-pointer" onClick={handleToggle}/>}
        {dropdownIsOpen && <DropdownOptions open={dropdownIsOpen} options={dropdownOptions} didSelect={handleUserSelect} />}
      </div>
      <div className="hidden md:flex items-center h-full gap-2">
        <p className="text-preset4 text-p-grey500">{props.label}</p>
        <DropdownWrapper selected={selectedOption} width={wrapperWidth} didToggle={handleToggle}>
          <DropdownOptions open={dropdownIsOpen} options={dropdownOptions} didSelect={handleUserSelect} />
        </DropdownWrapper>
      </div>
    </>
  )
}

export default DropdownSortFilter;