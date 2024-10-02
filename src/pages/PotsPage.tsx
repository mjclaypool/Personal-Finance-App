import { useContext } from "react";

import Button from "../UI/Button";
import DropdownEditDelete from "../UI/DropdownEditDelete";
import FinanceContext from "../store/FinanceContext";
import PageHeading from "../UI/PageHeading";
import PotsCategorySummary from "../components/PotsCategorySummary";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

// Pots Page
//
// -- Allows the user to add new pots categories.
// -- Displays each pot's savings details, including the amount saved and the target amount.
// ---- Allows the user to edit/delete individual pot categories.
// ---- Allows the user to add/withdraw money from individual pot categories.

const PotsPage = () => {
  const finCtx = useContext(FinanceContext);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Pots" button={<Button label="+ Add New Pot" type="primary"/>} />
      <div className="flex flex-col gap-6 xl:flex-row xl:flex-wrap">
        {finCtx.pots.map((pot) => (
          <div key={pot.name} className="xl:flex-1 xl:min-w-[430px]">
            <SectionWrapper color="white">
              <div className="relative flex flex-col gap-8">
                <SectionHeading
                  start={<SectionTitle title={pot.name} size="lg" theme={pot.theme} />}
                  end={<div onClick={() => finCtx.updateDropdown(pot.name)}><Button type="ellipse"/></div>}
                />
                {finCtx.dropdown == pot.name && <DropdownEditDelete type="Pot" />}
                <PotsCategorySummary total={pot.total} target={pot.target} theme={pot.theme} />
                <div className="flex justify-between gap-4 mb-[14px]">
                  <Button type="secondary" label="+ Add Money" />
                  <Button type="secondary" label="Withdraw" />
                </div>
              </div>
            </SectionWrapper>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PotsPage;