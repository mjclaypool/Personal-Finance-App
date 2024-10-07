import { useContext } from "react";

import Button from "./Button";
import FinanceContext from "../store/FinanceContext";
import ModalWrapper from "./ModalWrapper";
import PageHeading from "./PageHeading";
import UserProgressContext from "../store/UserProgressContext";

import closeIcon from "../assets/images/icon-close-modal.svg";

const DeleteModal = (props: {name: string}) => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const page = (userCtx.page).toLowerCase().substring(0, userCtx.page.length - 1);
  const deleteWarning = "Are you sure you want to delete this "+ page +"? This action cannot be reversed, and all the data inside it will be removed forever.";

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleDelete() {
    if (page == "budget") {
      finCtx.deleteBudget(props.name);
    } else if (page == "pot") {
      finCtx.deletePot(props.name);
    }
    handleCloseModal();
  }

  return (
    <ModalWrapper openModal={userCtx.modalType == "Delete"} closeModal={handleCloseModal}>
      <>
        <PageHeading
          pageTitle={"Delete '" + props.name + "'?"}
          button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
        />
        <p className="text-preset4 text-p-grey500">{deleteWarning}</p>
        <div onClick={handleDelete} className="flex">
          <Button type="destroy" label="Yes, Confirm Deletion" />
        </div>
        <button type="button" className="text-preset4 text-p-grey500 text-center cursor-pointer" onClick={handleCloseModal}>No, Go Back</button>
      </>
    </ModalWrapper>
  )
}

export default DeleteModal;