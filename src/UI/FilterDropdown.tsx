import { useContext } from "react";

import DropdownMenu from "./DropdownMenu";
import FinanceContext from "../store/FinanceContext";

import filterIcon from "../assets/images/icon-filter-mobile.svg";

const FilterDropdown = () => {
  const finCtx = useContext(FinanceContext);
  let filterOptions = finCtx.getCatArray("transactions", "category");
  filterOptions.unshift("All Transactions");

  function handleUserSelect(rule: string) {
    finCtx.updateFilterRule(rule);
  }

  return (
    <>
      <img src={filterIcon} alt="Filter Icon" className="h-4 md:hidden"/>
      <div className="hidden md:flex items-center h-full gap-2">
        <p className="text-preset4 text-p-grey500">Category</p>
        <DropdownMenu options={filterOptions} didChange={handleUserSelect} />
      </div>
    </>
  )
}

export default FilterDropdown;