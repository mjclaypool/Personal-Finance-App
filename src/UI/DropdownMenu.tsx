import caretDown from "../assets/images/icon-caret-down.svg";

const DropdownMenu = (props: {options: string[], didChange: (rule: string) => void}) => {
  function handleChange(e: any) {
    props.didChange(e.target.value)
  }

  return (
    <div className="relative flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg pointer-events-none">
      <select
        onChange={handleChange}
        className="appearance-none flex px-250 pr-500 py-[10px] bg-white rounded-lg text-preset4 text-p-grey900 pointer-events-auto"
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img src={caretDown} alt="Caret down icon" className="absolute right-4 top-[50%] -translate-y-[50%]" />
    </div>
  )
}

export default DropdownMenu;