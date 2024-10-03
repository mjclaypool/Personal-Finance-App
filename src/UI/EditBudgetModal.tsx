import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import FinanceContext from "../store/FinanceContext";
import InputField from "./InputField";
import UserProgressContext from "../store/UserProgressContext";
import PageHeading from "./PageHeading";

import closeIcon from "../assets/images/icon-close-modal.svg";

type budgetType = {
  category: string,
  maximum: number,
  theme: string
}

const EditBudgetModal = (props: {budget: budgetType}) => {
  const [updatedBudget, setUpdatedBudget] = useState<budgetType>(props.budget);
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const pageTitle = userCtx.modalType + " " + userCtx.page.substring(0, userCtx.page.length-1);
  const editText = "As your budgets change, feel free to update your spending limits.";

  function getColorName() {
    const colorsArray = finCtx.getColorOptions();
    const colorIndex = colorsArray.findIndex(obj => obj.code == props.budget.theme);
    if (colorIndex > -1) {
      return colorsArray[colorIndex].name;
    }
    return "Unknown";
  }

  function getColor() {
    return finCtx.getColorVar(props.budget.theme);
  }

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateDropdown("");
  }

  function handleChangeMaximum(value: string) {
    setUpdatedBudget(prevState => ({
      ...prevState,
      maximum: Number(value)
    }))
  }

  function handleChangeTheme(colorCode: string) {
    setUpdatedBudget(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleSubmit() {
    finCtx.updateBudgets(updatedBudget);
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
        <h2 className="text-preset5 text-p-grey500 font-bold">Budget Category</h2>
        <div className="flex items-center h-full bg-white border-[1px] border-p-beige500 rounded-lg">
          <div className="relative flex flex-col flex-1 bg-white rounded-lg text-preset4 text-p-grey900">
            <input
              type="text"
              className="text-p-grey900 rounded-lg outline-none px-250 py-[10px]"
              value={props.budget.category}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Maximum Spend</h2>
        <InputField placeholder={(props.budget.maximum).toString()} editValue={true} didChange={handleChangeMaximum} />
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

export default EditBudgetModal;