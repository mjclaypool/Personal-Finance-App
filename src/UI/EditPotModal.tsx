import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import FinanceContext from "../store/FinanceContext";
import InputField from "./InputField";
import InputFieldReadOnly from "./InputFieldReadOnly";
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
  target: boolean
}

const EditPotModal = (props: {pot: potType}) => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const [updatedPot, setUpdatedPot] = useState<potType>(props.pot);
  const [errors, setErrors] = useState<errorType>({target: false});

  const pageTitle = userCtx.modalType + " " + userCtx.page.substring(0, userCtx.page.length-1);
  const editText = "If your saving targets change, feel free to update your pots.";

  function getColorName() {
    const colorsArray = finCtx.getColorOptions();
    const colorIndex = colorsArray.findIndex(obj => obj.code == props.pot.theme);
    if (colorIndex > -1) {
      return colorsArray[colorIndex].name;
    }
    return "Unknown";
  }

  function getColor() {
    return finCtx.getColorVar(props.pot.theme);
  }

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleChangeTarget(value: string) {
    if (value.match(/^[0-9]+$/) && Number(value) > 0) {
      setUpdatedPot(prevState => ({
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
    setUpdatedPot(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleSubmit() {
    if (errors.target || updatedPot.target <= 0) {
      setErrors(prevState => ({
        ...prevState,
        target: true
      }));
    }
    if (errors.target == false && updatedPot.target !== 0) {
      finCtx.updatePots(updatedPot);
      handleCloseModal();
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeading
        pageTitle={pageTitle}
        button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
      />
      <p className="text-preset4 text-p-grey500">{editText}</p>
      <InputFieldReadOnly label="Pot Name" value={props.pot.name} />
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Target</h2>
        <InputField initialValue={(props.pot.target).toString()} didChange={handleChangeTarget} />
        {errors.target && <p className="text-preset5 text-p-grey500 self-end">Must enter a number greater than 0.</p>}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Theme</h2>
        <ColorsDropdown initialName={getColorName()} initialColor={getColor()} didChange={handleChangeTheme} />
      </div>
      <div onClick={handleSubmit} className="flex">
        <Button type="primary" label="Save Changes" />
      </div>
    </div>
  )
}

export default EditPotModal;