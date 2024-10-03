import { useState, useContext } from "react";

import Button from "./Button";
import InputField from "./InputField";
import FinanceContext from "../store/FinanceContext";
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

const WithdrawFromPotModal = (props: {pot: potType}) => {
  const [updatedPot, setUpdatedPot] = useState<potType>(props.pot);
  const [withdrawlAmount, setWithdrawlAmount] = useState(0);
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.";

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleWithdrawAmount(value: string) {
    setWithdrawlAmount(Number(value));
    setUpdatedPot(prevState => ({
      ...prevState,
      total: props.pot.total - Number(value)
    }))
  }

  function handleSubmit() {
    finCtx.updatePots(updatedPot);
    handleCloseModal();
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeading
        pageTitle={"Withdraw from '" + props.pot.name + "'"}
        button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
      />
      <p className="text-preset4 text-p-grey500">{lorem}</p>
      <PotsProgressBar
        title="New Amount"
        total={props.pot.total}
        withdraw={withdrawlAmount}
        target={props.pot.target}
        theme='#201F24'
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Amount to Withdraw</h2>
        <InputField placeholder="e.g. 50" didChange={handleWithdrawAmount} />
      </div>
      <div className="flex" onClick={handleSubmit}>
        <Button type="primary" label="Confirm Withdrawal"/>
      </div>
    </div>
  )
}

export default WithdrawFromPotModal;