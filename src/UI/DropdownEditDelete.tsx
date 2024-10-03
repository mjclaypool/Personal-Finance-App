import { useContext } from "react";

import UserProgressContext from "../store/UserProgressContext";

const DropdownEditDelete = () => {
  const userCtx = useContext(UserProgressContext);

  return (
    <>
      <div className="absolute top-6 right-0 bg-white rounded-lg py-150 px-250 shadow-dropdown">
        <p className="text-preset4 text-p-grey900 cursor-pointer" onClick={() => userCtx.updateModalType("Edit")}>Edit {userCtx.page}</p>
        <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
        <p className="text-preset4 text-s-red cursor-pointer" onClick={() => userCtx.updateModalType("Delete")}>Delete {userCtx.page}</p>
      </div>
    </>
  )
}

export default DropdownEditDelete;