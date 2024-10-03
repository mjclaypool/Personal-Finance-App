import { useContext } from "react";

import AddPotModal from "../UI/AddPotModal";
import AddToPotModal from "../UI/AddToPotModal";
import Button from "../UI/Button";
import DeleteModal from "../UI/DeleteModal";
import EditPotModal from "../UI/EditPotModal";
import FinanceContext from "../store/FinanceContext";
import Modal from "../UI/Modal";
import PageHeading from "../UI/PageHeading";
import PotsCategorySummary from "../components/PotsCategorySummary";
import UserProgressContext from "../store/UserProgressContext";
import WithdrawFromPotModal from "../UI/WithdrawFromPotModal";

// Pots Page
//
// -- Allows the user to add new pots categories.
// -- Displays each pot's savings details, including the amount saved and the target amount.
// ---- Allows the user to edit/delete individual pot categories.
// ---- Allows the user to add/withdraw money from individual pot categories.

const PotsPage = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);

  return (
    <div className="relative flex flex-col gap-8">
      <PageHeading
        pageTitle="Pots"
        button={<div onClick={() => userCtx.updateModalType("Add New")}><Button label="+ Add New Pot" type="primary"/></div>}
      />
      <div className="flex flex-col gap-6 xl:flex-row xl:flex-wrap">
        {finCtx.pots.map((pot) => (
          <div key={pot.name} className="xl:flex-1 xl:min-w-[430px]">
            <PotsCategorySummary
              name={pot.name}
              target={pot.target}
              total={pot.total}
              theme={pot.theme}
            />
            {(userCtx.section == pot.name && userCtx.modalType == "Edit") && <Modal><EditPotModal pot={finCtx.getPot(pot.name)} /></Modal>}
            {(userCtx.section == pot.name && userCtx.modalType == "Delete") && <Modal><DeleteModal name={pot.name} /></Modal>}
            {(userCtx.section == pot.name && userCtx.modalType == "Add Money") && <Modal><AddToPotModal pot={finCtx.getPot(pot.name)} /></Modal>}
            {(userCtx.section == pot.name && userCtx.modalType == "Withdraw") && <Modal><WithdrawFromPotModal pot={finCtx.getPot(pot.name)} /></Modal>}
          </div>
        ))}
      </div>
      {userCtx.modalType == "Add New" && <Modal><AddPotModal /></Modal>}
    </div>
  )
}

export default PotsPage;