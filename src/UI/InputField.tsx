const InputField = (props: {placeholder: string, plainText?: boolean, editValue?: boolean, didChange: (rule: string) => void}) => {
  const placeholderText = props.placeholder;
  let fieldIndent = "pl-500";
  let placeholderColor = "placeholder:text-p-beige500";
  if (props.plainText) {
    fieldIndent = "";
  }
  if (props.editValue) {
    placeholderColor = "placeholder:text-p-grey900";
  }

  function handleChange(e: any) {
    props.didChange(e.target.value)
  }

  return (
    <div className="flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg">
      <div className="relative flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900">
        <input
          type="text"
          className={`text-p-grey900 rounded-lg outline-none px-250 ${fieldIndent} py-[10px] ${placeholderColor}`}
          placeholder={placeholderText}
          onChange={handleChange}
        />
        {!props.plainText && <p className="absolute top-[50%] -translate-y-[50%] left-5 text-p-grey500">$</p>}
      </div>
    </div>
  )
}

export default InputField;