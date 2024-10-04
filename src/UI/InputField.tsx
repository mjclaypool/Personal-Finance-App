import { useState } from "react";

type inputProps = {
  placeholder?: string,
  plainText?: boolean,
  initialValue?: string,
  didChange: (rule: string) => void
}

const InputField = (props: inputProps) => {
  const [currentValue, setCurrentValue] = useState(props.initialValue || "");
  let fieldIndent = "pl-500";

  if (props.plainText) {
    fieldIndent = "";
  }

  function handleChange(e: any) {
    setCurrentValue(e.target.value);
    props.didChange(e.target.value)
  }

  return (
    <div className="flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg">
      <div className="relative flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900">
        <input
          type="text"
          className={`text-p-grey900 rounded-lg outline-none px-250 ${fieldIndent} py-[10px] placeholder:text-p-beige500`}
          placeholder={props.placeholder || ""}
          onChange={handleChange}
          value={currentValue}
        />
        {!props.plainText && <p className="absolute top-[50%] -translate-y-[50%] left-5 text-p-grey500">$</p>}
      </div>
    </div>
  )
}

export default InputField;