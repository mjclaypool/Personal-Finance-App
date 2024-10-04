import { useContext } from "react";

import Button from "../UI/Button";
import DropdownEditDelete from "../UI/DropdownEditDelete";
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

type potType = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const PotsCategorySummary = (props: {pot: potType}) => {
  const userCtx = useContext(UserProgressContext);

  function handleClick(modal: string) {
    userCtx.updateSection(props.pot.name);
    userCtx.updateModalType(modal);
  }

  return (
    <>
      <SectionWrapper color="white">
        <div className="relative flex flex-col gap-8">
          <SectionHeading
            start={<SectionTitle title={props.pot.name} size="lg" theme={props.pot.theme} />}
            end={
              <div onClick={() => userCtx.updateSection(props.pot.name)}>
                <Button type="ellipse"/>
              </div>
            }
          />
          <PotsProgressBar
            title="Total Saved"
            total={props.pot.total}
            target={props.pot.target}
            theme={props.pot.theme}
          />
          <div className="flex justify-between gap-4 mb-[14px]">
            <div className="flex flex-1" onClick={() => handleClick("Add Money")}>
              <Button type="secondary" label="+ Add Money" />
            </div>
            <div className="flex flex-1" onClick={() => handleClick("Withdraw")}>
              <Button type="secondary" label="Withdraw" />
            </div>
          </div>
          {(userCtx.section == props.pot.name && userCtx.modalType == "") && <DropdownEditDelete />}
        </div>
      </SectionWrapper>
    </>
  )
}

export default PotsCategorySummary;