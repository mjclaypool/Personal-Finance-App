import { useContext } from "react";

import DropdownMenu from "./DropdownMenu";
import FinanceContext from "../store/FinanceContext";

import sortIcon from "../assets/images/icon-sort-mobile.svg";

const SortDropdown = () => {
  const finCtx = useContext(FinanceContext);
  const sortOptions = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];

  function handleUserSelect(rule: string) {
    finCtx.updateSortingRule(rule);
  }

  return (
    <>
      <img src={sortIcon} alt="Sort Icon" className="h-4 md:hidden"/>
      <div className="hidden md:flex items-center h-full gap-2">
        <p className="text-preset4 text-p-grey500">Sort by</p>
        <DropdownMenu options={sortOptions} didChange={handleUserSelect} />
      </div>
    </>
  )
}

export default SortDropdown;