import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import FinanceContext from "../store/FinanceContext";
import InputField from "./InputField";
import InputFieldReadOnly from "./InputFieldReadOnly";
import ModalWrapper from "./ModalWrapper";
import PageHeading from "./PageHeading";
import UserProgressContext from "../store/UserProgressContext";

import closeIcon from "../assets/images/icon-close-modal.svg";

type budgetType = {
  category: string,
  maximum: number,
  theme: string
}

type errorType = {
  maximum: boolean
}

const EditBudgetModal = (props: {budget: budgetType}) => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const [updatedBudget, setUpdatedBudget] = useState<budgetType>(props.budget);
  const [errors, setErrors] = useState<errorType>({maximum: false});

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
    userCtx.updateSection("");
  }

  function handleChangeMaximum(value: string) {
    if (value.match(/^[0-9]+$/) && Number(value) > 0) {
      setUpdatedBudget(prevState => ({
        ...prevState,
        maximum: Number(value)
      }))
      setErrors(prevState => ({
        ...prevState,
        maximum: false
      }));
    } else {
      setErrors(prevState => ({
        ...prevState,
        maximum: true
      }));
    }
  }

  function handleChangeTheme(colorCode: string) {
    setUpdatedBudget(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleSubmit() {
    if (errors.maximum || updatedBudget.maximum <= 0) {
      setErrors(prevState => ({
        ...prevState,
        maximum: true
      }));
    }
    if ((errors.maximum == false && updatedBudget.maximum !== 0)) {
      finCtx.updateBudgets(updatedBudget);
      handleCloseModal();
    }
  }

  return (
    <ModalWrapper openModal={userCtx.modalType == "Edit " + userCtx.page} closeModal={handleCloseModal}>
      <>
        <PageHeading
          pageTitle={pageTitle}
          button={<img src={closeIcon} alt="Close modal" className="cursor-pointer" onClick={handleCloseModal} />}
        />
        <p className="text-preset4 text-p-grey500">{editText}</p>
        <InputFieldReadOnly label="Budget Category" value={props.budget.category} />
        <div className="flex flex-col gap-1">
          <h2 className="text-preset5 text-p-grey500 font-bold">Maximum Spend</h2>
          <InputField initialValue={(props.budget.maximum).toString()} didChange={handleChangeMaximum} />
          {errors.maximum && <p className="text-preset5 text-p-grey500 self-end">Must enter a number greater than 0.</p>}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-preset5 text-p-grey500 font-bold">Theme</h2>
          <ColorsDropdown initialName={getColorName()} initialColor={getColor()} didChange={handleChangeTheme} />
        </div>
        <div onClick={handleSubmit} className="flex">
          <Button type="primary" label="Save Changes" />
        </div>
      </>
    </ModalWrapper>
  )
}

export default EditBudgetModal;