import DropdownSortFilter from "./DropdownSortFilter";

import searchIcon from "../assets/images/icon-search.svg";

const SearchBar = (props: {didChange: (rule: string) => void, sort?: boolean, filter?: boolean}) => {
  function handleChange(e: any) {
    props.didChange(e.target.value)
  }

  return (
    <div className="flex justify-between items-center gap-6 h-[45px]">
      <div className="relative flex flex-1 items-center w-[215px] max-w-[320px] h-full border-[1px] border-p-beige500 rounded-lg">
        <input
          type="text"
          className="placeholder:text-preset4 placeholder:text-p-beige500 text-p-grey900 rounded-lg px-250 pr-500 w-full outline-none overflow-ellipsis"
          placeholder="Search transactions"
          onChange={handleChange}
        />
          <img src={searchIcon} alt="Search Icon" className="absolute top-[50%] -translate-y-[50%] right-5" />
      </div>
      <div className="flex items-center gap-6">
        {props.sort && <DropdownSortFilter label="Sort by" initial="Latest" />}
        {props.filter && <DropdownSortFilter label="Category" initial="All Transactions" filter={true} />}
      </div>
    </div>
  )
}

export default SearchBar;