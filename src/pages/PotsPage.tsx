import { useContext } from "react";

import AddPotModal from "../UI/AddPotModal";
import Button from "../UI/Button";
import FinanceContext from "../store/FinanceContext";
import Modal from "../UI/Modal";
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
          </div>
        ))}
      </div>
      {userCtx.modalType == "Add New" && <Modal><AddPotModal /></Modal>}
    </div>
  )
}

export default PotsPage;