import Button from "../UI/Button";
import PageHeading from "../UI/PageHeading";
import PotsCategorySummary from "../components/PotsCategorySummary";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";

import { pots } from "../data/data.json";

// Pots Page
//
// -- Allows the user to add new pots categories.
// -- Displays each pot's savings details, including the amount saved and the target amount.
// ---- Allows the user to edit/delete individual pot categories.
// ---- Allows the user to add/withdraw money from individual pot categories.

const PotsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Pots" button={<Button label="+ Add New Pot" type="primary"/>} />
      <div className="flex flex-col gap-6">
        {pots.map((pot) => (
          <div key={pot.name}>
            <SectionWrapper color="white">
              <div className="flex flex-col gap-8">
                <SectionHeading
                  start={<SectionTitle title={pot.name} size="lg" theme={pot.theme} />}
                  end={<Button type="ellipse"/>}
                />
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