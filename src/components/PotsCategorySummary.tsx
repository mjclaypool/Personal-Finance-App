import { useContext } from "react";

import EditPotModal from "../UI/EditPotModal";
import Button from "../UI/Button";
import DeleteModal from "../UI/DeleteModal";
import DropdownEditDelete from "../UI/DropdownEditDelete";
import FinanceContext from "../store/FinanceContext";
import Modal from "../UI/Modal";
import PotsProgressBar from "../components/PotsProgressBar";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import UserProgressContext from "../store/UserProgressContext";

// PotsCategorySummary component
//
// Used in: PotsPage.tsx
// Function:
// -- Displays a pot's savings details, including the amount saved and the target amount.
// ---- Allows the user to edit/delete the target pot.
// ---- Allows the user to add/withdraw money from the target pot.

const PotsCategorySummary = (props: {name: string, target: number, total: number, theme: string}) => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);

  return (
    <>
      <SectionWrapper color="white">
        <div className="relative flex flex-col gap-8">
          <SectionHeading
            start={<SectionTitle title={props.name} size="lg" theme={props.theme} />}
            end={<div onClick={() => userCtx.updateDropdown(props.name)}><Button type="ellipse"/></div>}
          />
          <PotsProgressBar total={props.total} target={props.target} theme={props.theme} />
          <div className="flex justify-between gap-4 mb-[14px]">
            <Button type="secondary" label="+ Add Money" />
            <Button type="secondary" label="Withdraw" />
          </div>
          {userCtx.dropdown == props.name && <DropdownEditDelete />}
          {(userCtx.dropdown == props.name && userCtx.modalType == "Edit") && <Modal><EditPotModal pot={finCtx.getPot(props.name)} /></Modal>}
          {(userCtx.dropdown == props.name && userCtx.modalType == "Delete") && <Modal><DeleteModal name={props.name} /></Modal>}
        </div>
      </SectionWrapper>
    </>
  )
}

export default PotsCategorySummary;