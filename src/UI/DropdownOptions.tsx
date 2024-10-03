const DropdownOptions = (props: {options: string[], didSelect: (option: string) => void}) => {
  return (
    <div className="absolute z-10 w-[177px] md:w-full top-14 right-0 flex flex-col bg-white rounded-lg py-150 px-250 shadow-dropdown">
      {props.options.map((option) => (
        <div key={option}>
          <div className="cursor-pointer" onClick={() => props.didSelect(option)}>
            <p>{option}</p>
          </div>
          {props.options.indexOf(option) < (props.options.length - 1) &&
            <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
          }
        </div>
      ))}
    </div>
  )
}

export default DropdownOptions;