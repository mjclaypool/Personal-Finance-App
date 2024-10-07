import { useContext } from "react";

import AddPotModal from "../UI/AddPotModal";
import Button from "../UI/Button";
import DeleteModal from "../UI/DeleteModal";
import EditPotModal from "../UI/EditPotModal";
import FinanceContext from "../store/FinanceContext";
import ModalAddWithdrawPot from "../UI/ModalAddWithdrawPot";
import PageHeading from "../UI/PageHeading";
import PotsCategorySummary from "../components/PotsCategorySummary";
import UserProgressContext from "../store/UserProgressContext";

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
        button={
          <div onClick={() => userCtx.updateModalType("Add New Pot")}>
            <Button label="+ Add New Pot" type="primary"/>
          </div>
        }
      />
      <div className="flex flex-col gap-6 xl:flex-row xl:flex-wrap">
        {finCtx.pots.map((pot) => (
          <div key={pot.name} className="xl:flex-1 xl:min-w-[430px]">
            <PotsCategorySummary pot={pot} />
            {(userCtx.section == pot.name && userCtx.modalType == "Edit " + userCtx.page) && <EditPotModal pot={pot} />}
            {(userCtx.section == pot.name && userCtx.modalType == "Delete") && <DeleteModal name={pot.name} />}
            {(userCtx.section == pot.name && userCtx.modalType == "Add Money") && <ModalAddWithdrawPot pot={pot} />}
            {(userCtx.section == pot.name && userCtx.modalType == "Withdraw") && <ModalAddWithdrawPot pot={pot} />}
          </div>
        ))}
      </div>
      {userCtx.modalType == "Add New Pot" && <AddPotModal />}
    </div>
  )
}

export default PotsPage;