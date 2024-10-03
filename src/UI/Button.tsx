import caretIcon from "../assets/images/icon-caret-right.svg";
import ellipsisIcon from "../assets/images/icon-ellipsis.svg";

const Button = (props: {label?: string, type: string}) => {
  return (
    <>
      {props.type == "primary" &&
        <button type="button" className="flex-1 text-preset4 text-white font-bold bg-p-grey900 rounded-lg p-200 hover:bg-p-grey500">
          {props.label}
        </button>
      }
      {props.type == "secondary" &&
        <button type="button" className="flex-1 text-preset4 text-p-grey900 font-bold bg-p-beige100 border-[1px] border-transparent rounded-lg p-200 hover:bg-white hover:border-p-beige500">
          {props.label}
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
      {props.type == "destroy" &&
        <button type="button" className="flex-1 text-preset4 text-white font-bold bg-s-red rounded-lg p-200 hover:bg-opacity-80">
          {props.label}
        </button>
      }
      {props.type == "ellipse" &&
        <div>
          <img src={ellipsisIcon} alt="ellipsis icon" className="cursor-pointer py-100" />
        </div>
      }
    </>
  )
}

export default Button;