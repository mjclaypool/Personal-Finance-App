import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import FinanceContext from "../store/FinanceContext";
import InputField from "./InputField";
import PageHeading from "./PageHeading";
import UserProgressContext from "../store/UserProgressContext";

import closeIcon from "../assets/images/icon-close-modal.svg";

type potType = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const AddPotModal = () => {
  const [newPot, setNewPot] = useState<potType>({name: "", target: 0, total: 0, theme: ""});
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const pageTitle = userCtx.modalType + " " + userCtx.page.substring(0, userCtx.page.length-1);
  const addText = "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.";

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateDropdown("");
  }

  function handleChangeName(option: string) {
    setNewPot(prevState => ({
      ...prevState,
      name: option
    }))
  }

  function handleChangeTarget(value: string) {
    setNewPot(prevState => ({
      ...prevState,
      target: Number(value)
    }))
  }

  function handleChangeTheme(colorCode: string) {
    setNewPot(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleSubmit() {
    finCtx.addPot(newPot);
    handleCloseModal();
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeading
        pageTitle={pageTitle}
        button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
      />
      <p className="text-preset4 text-p-grey500">{addText}</p>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Pot Name</h2>
        <InputField placeholder="e.g. Rainy Days" plainText={true} didChange={handleChangeName} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Target</h2>
        <InputField placeholder="e.g.2000" didChange={handleChangeTarget} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Theme</h2>
        <ColorsDropdown didChange={handleChangeTheme} />
      </div>
      <div onClick={handleSubmit} className="flex">
        <Button type="primary" label="Add Pot" />
      </div>
    </div>
  )
}

export default AddPotModal;