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

type errorType = {
  name: boolean,
  target: boolean
}

const AddPotModal = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const [newPot, setNewPot] = useState<potType>({name: "", target: 0, total: 0, theme: "#277C78"});
  const [errors, setErrors] = useState<errorType>({name: false, target: false});

  const pageTitle = userCtx.modalType + " " + userCtx.page.substring(0, userCtx.page.length-1);
  const addText = "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.";

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleChangeName(option: string) {
    if (option !== "") {
      setNewPot(prevState => ({
        ...prevState,
        name: option
      }));
      setErrors(prevState => ({
        ...prevState,
        name: false
      }));
    } else {
      setErrors(prevState => ({
        ...prevState,
        name: true
      }));
    }
  }

  function handleChangeTarget(value: string) {
    if (value.match(/^[0-9]+$/) && Number(value) > 0) {
      setNewPot(prevState => ({
        ...prevState,
        target: Number(value)
      }));
      setErrors(prevState => ({
        ...prevState,
        target: false
      }));
    } else {
      setErrors(prevState => ({
        ...prevState,
        target: true
      }));
    }
  }

  function handleChangeTheme(colorCode: string) {
    setNewPot(prevState => ({
      ...prevState,
      theme: colorCode
    }));
  }

  function handleSubmit() {
    if (errors.name || newPot.name == "") {
      setErrors(prevState => ({
        ...prevState,
        name: true
      }));
    }
    if (errors.target || newPot.target <= 0) {
      setErrors(prevState => ({
        ...prevState,
        target: true
      }));
    }
    if ((errors.name == false && errors.target == false) && (newPot.name !== "" && newPot.target !== 0)) {
      finCtx.addPot(newPot);
      handleCloseModal();
    }
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
        {errors.name && <p className="text-preset5 text-p-grey500 self-end">Must enter a name.</p>}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Target</h2>
        <InputField placeholder="e.g. 2000" didChange={handleChangeTarget} />
        {errors.target && <p className="text-preset5 text-p-grey500 self-end">Must enter a number greater than 0.</p>}
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