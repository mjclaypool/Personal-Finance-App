import caretIcon from "../assets/images/icon-caret-right.svg";
import ellipsisIcon from "../assets/images/icon-ellipsis.svg";

const Button = (props: {label?: string, type: string}) => {
  return (
    <>
      {props.type == "primary" &&
        <button type="button" className="text-preset4 text-white font-bold bg-p-grey900 rounded-lg p-200">
          + {props.label}
        </button>
      }
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