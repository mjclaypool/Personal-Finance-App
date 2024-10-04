const InputFieldReadOnly = (props: {label: string, value: string}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-preset5 text-p-grey500 font-bold">{props.label}</h2>
      <div className="flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg">
        <div className="relative flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900">
          <input
            type="text"
            className="text-p-beige500 rounded-lg outline-none px-250 py-[10px]"
            value={props.value}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default InputFieldReadOnly;