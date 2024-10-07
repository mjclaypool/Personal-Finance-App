import { useState, useContext } from "react";

import Button from "./Button";
import ColorsDropdown from "./ColorsDropdown";
import DropdownOptions from "./DropdownOptions";
import DropdownWrapper from "./DropdownWrapper";
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

type errorType = {
  maximum: boolean
}

const AddBudgetModal = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const [newBudget, setNewBudget] = useState<budgetType>({category: getCategoryOptions()[0], maximum: 0, theme: "#277C78"});
  const [selectedCategory, setSelectedCategory] = useState(getCategoryOptions()[0])
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [errors, setErrors] = useState<errorType>({maximum: false});

  const pageTitle = userCtx.modalType + " " + userCtx.page.substring(0, userCtx.page.length-1);
  const addText = "Choose a category to set a spending budget. These categories can help you monitor spending.";

  function getCategoryOptions() {
    const categoryOptions = finCtx.getCatArray("transactions", "category");
    const usedOptions = finCtx.getCatArray("budgets", "category");
    let avaliableOptions = categoryOptions;
    for (let i=0; i<usedOptions.length; i++) {
      let indexToRemove = avaliableOptions.indexOf(usedOptions[i]);
      if (indexToRemove > -1) {
        avaliableOptions.splice(indexToRemove, 1);
      }
    }
    return avaliableOptions;
  }

  function handleCloseModal() {
    userCtx.updateModalType("");
    userCtx.updateSection("");
  }

  function handleChangeCategory(option: string) {
    setNewBudget(prevState => ({
      ...prevState,
      category: option
    }))
    setSelectedCategory(option);
    handleToggle();
  }

  function handleChangeMaximum(value: string) {
    if (value.match(/^[0-9]+$/) && Number(value) > 0) {
      setNewBudget(prevState => ({
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
    setNewBudget(prevState => ({
      ...prevState,
      theme: colorCode
    }))
  }

  function handleToggle() {
    if (dropdownIsOpen == false) {
      setDropdownIsOpen(true);
    } else {
      setDropdownIsOpen(false);
    }
  }

  function handleSubmit() {
    if (errors.maximum || newBudget.maximum <= 0) {
      setErrors(prevState => ({
        ...prevState,
        maximum: true
      }));
    }
    if ((errors.maximum == false && newBudget.maximum !== 0)) {
      finCtx.addBudget(newBudget);
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
        <h2 className="text-preset5 text-p-grey500 font-bold">Budget Category</h2>
        <DropdownWrapper selected={selectedCategory} width="w-full" didToggle={handleToggle}>
          <DropdownOptions open={dropdownIsOpen} options={getCategoryOptions()} didSelect={handleChangeCategory} />
        </DropdownWrapper>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Maximum Spend</h2>
        <InputField placeholder="e.g. 2000" didChange={handleChangeMaximum} />
        {errors.maximum && <p className="text-preset5 text-p-grey500 self-end">Must enter a number greater than 0.</p>}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-preset5 text-p-grey500 font-bold">Theme</h2>
        <ColorsDropdown didChange={handleChangeTheme} />
      </div>
      <div onClick={handleSubmit} className="flex">
        <Button type="primary" label="Add Budget" />
      </div>
    </div>
  )
}

export default AddBudgetModal;