const DropdownOptions = (props: {open: boolean, options: string[], didSelect: (option: string) => void}) => {
  const visibility: {[key: string]: string} = {
    true: "flex",
    false: "hidden"
  }

  return (
    <div className={`${visibility[props.open.toString()]} absolute z-10 min-w-[177px] w-full top-[46px] right-0 flex-col bg-white rounded-lg py-150 px-250 shadow-dropdown`}>
      {props.options.map((option) => (
        <div key={option}>
          <button type="button" className="w-full text-start cursor-pointer" onClick={() => props.didSelect(option)}>
            {option}
          </button>
          {props.options.indexOf(option) < (props.options.length - 1) && <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>}
        </div>
      ))}
    </div>
  )
}

export default DropdownOptions;