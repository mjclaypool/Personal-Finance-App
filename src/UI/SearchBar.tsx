import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";

import searchIcon from "../assets/images/icon-search.svg";

const SearchBar = (props: {sort?: boolean, filter?: boolean}) => {
  return (
    <div className="flex justify-between items-center gap-6 h-[45px]">
      <div className="relative flex flex-1 items-center w-[215px] max-w-[320px] h-full border-[1px] border-p-beige500 rounded-lg">
        <input
          type="text"
          className="text-p-beige500 rounded-lg px-250 w-full"
          placeholder="Search transactions"
        />
          <img src={searchIcon} alt="Search Icon" className="absolute top-[50%] -translate-y-[50%] right-5" />
      </div>
      <div className="flex items-center gap-6">
        {props.sort && <SortDropdown />}
        {props.filter && <FilterDropdown />}
      </div>
    </div>
  )
}

export default SearchBar;