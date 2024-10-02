const DropdownEditDelete = (props: {type: string}) => {
  return (
    <div className="absolute top-6 right-0 bg-white rounded-lg py-150 px-250 shadow-dropdown">
      <p className="text-preset4 text-p-grey900 cursor-pointer">Edit {props.type}</p>
      <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
      <p className="text-preset4 text-s-red cursor-pointer">Delete {props.type}</p>
    </div>
  )
}

export default DropdownEditDelete;