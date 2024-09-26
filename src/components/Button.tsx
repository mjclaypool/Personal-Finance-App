import caretIcon from "../assets/images/icon-caret-right.svg";
import ellipsisIcon from "../assets/images/icon-ellipsis.svg";

const Button = (props: {label?: string, type: string}) => {
  return (
    <>
      {props.type == "tertiary" &&
        <div className="flex items-center gap-3 text-preset4 text-p-grey500">
          <p>{props.label}</p>
          <div>
            <img src={caretIcon} alt="caret right icon" />
          </div>
        </div>
      }
      {props.type == "ellipse" &&
        <div>
          <img src={ellipsisIcon} alt="ellipsis icon" />
        </div>
      }
    </>
  )
}

export default Button;