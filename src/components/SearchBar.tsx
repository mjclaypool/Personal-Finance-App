import searchIcon from "../assets/images/icon-search.svg";
import filterIcon from "../assets/images/icon-filter-mobile.svg";
import sortIcon from "../assets/images/icon-sort-mobile.svg";

const SearchBar = (props: {sort?: boolean, filter?: boolean}) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[215px] flex-1 border-[1px] border-p-beige500 rounded-lg">
        <input
          type="text"
          className="text-p-beige500 rounded-lg px-250 py-150 w-full"
          placeholder="Search transactions"
        />
          <img src={searchIcon} alt="Search Icon" className="absolute top-[50%] -translate-y-[50%] right-5" />
      </div>
      {props.sort && <img src={sortIcon} alt="Sort Icon" className="h-4"/>}
      {props.filter && <img src={filterIcon} alt="Filter Icon" className="h-4"/>}
    </div>
  )
}

export default SearchBar;