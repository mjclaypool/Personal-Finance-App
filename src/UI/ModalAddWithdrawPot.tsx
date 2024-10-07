import { useState, useContext } from "react";

import Button from "./Button";
import InputField from "./InputField";
import FinanceContext from "../store/FinanceContext";
import ModalWrapper from "./ModalWrapper";
import PageHeading from "./PageHeading";
import PotsProgressBar from "../components/PotsProgressBar";
import UserProgressContext from "../store/UserProgressContext";

import closeIcon from "../assets/images/icon-close-modal.svg";

type potType = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const ModalAddWithdrawPot = (props: {pot: potType}) => {
  const [updatedPot, setUpdatedPot] = useState<potType>(props.pot);
  const [additionalAmount, setAdditionalAmount] = useState(0);
  const [withdrawlAmount, setWithdrawlAmount] = useState(0);
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.";
  let pageTitle = "Add to '" + props.pot.name + "'";
  let subTitle = "Amount to Add";
  let buttonLabel = "Confirm Addition";

  if (userCtx.modalType == "Withdraw") {
    pageTitle = "Withdraw from '" + props.pot.name + "'";
    subTitle = "Amount to Withdraw";
    buttonLabel = "Confirm Withdrawal";
  }

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleAddAmount(value: string) {
    setAdditionalAmount(Number(value));
    setUpdatedPot(prevState => ({
      ...prevState,
      total: props.pot.total + Number(value)
    }))
  }

  function handleWithdrawAmount(value: string) {
    setWithdrawlAmount(Number(value));
    setUpdatedPot(prevState => ({
      ...prevState,
      total: props.pot.total - Number(value)
    }))
  }

  function handleUpdateAmount(value: string) {
    if (userCtx.modalType == "Add Money") {
      handleAddAmount(value);
    } else if (userCtx.modalType == "Withdraw") {
      handleWithdrawAmount(value);
    }
  }

  function handleSubmit() {
    finCtx.updatePots(updatedPot);
    handleCloseModal();
  }

  return (
    <ModalWrapper openModal={userCtx.modalType == "Withdraw" || userCtx.modalType == "Add Money"} closeModal={handleCloseModal}>
      <>
        <PageHeading
          pageTitle={pageTitle}
          button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
        />
        <p className="text-preset4 text-p-grey500">{lorem}</p>
        <PotsProgressBar
          title="New Amount"
          total={props.pot.total}
          add={additionalAmount}
          withdraw={withdrawlAmount}
          target={props.pot.target}
          theme='#201F24'
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-preset5 text-p-grey500 font-bold">{subTitle}</h2>
          <InputField placeholder="e.g. 50" didChange={handleUpdateAmount} />
        </div>
        <div className="flex" onClick={handleSubmit}>
          <Button type="primary" label={buttonLabel}/>
        </div>
      </>
    </ModalWrapper>
  )
}

export default ModalAddWithdrawPot;