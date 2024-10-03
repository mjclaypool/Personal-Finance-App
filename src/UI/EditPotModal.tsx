import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import InputField from "./InputField";
import FinanceContext from "../store/FinanceContext";
import PageHeading from "./PageHeading";
import UserProgressContext from "../store/UserProgressContext";

import closeIcon from "../assets/images/icon-close-modal.svg";

type potType = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const EditPotModal = (props: {pot: potType}) => {
  const [updatedPot, setUpdatedPot] = useState<potType>(props.pot);
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
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
    userCtx.updateDropdown("");
  }

  function handleChangeTarget(value: string) {
    setUpdatedPot(prevState => ({
      ...prevState,
      target: Number(value)
    }))
  }

  function handleChangeTheme(colorCode: string) {
    setUpdatedPot(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleSubmit() {
    finCtx.updatePots(updatedPot);
    handleCloseModal();
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeading
        pageTitle={pageTitle}
        button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
      />
      <p className="text-preset4 text-p-grey500">{editText}</p>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Pot Name</h2>
        <div className="flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg">
          <div className="relative flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900">
            <input
              type="text"
              className="text-p-grey900 rounded-lg outline-none px-250 py-[10px]"
              value={props.pot.name}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Target</h2>
        <InputField placeholder={(props.pot.target).toString()} editValue={true} didChange={handleChangeTarget} />
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