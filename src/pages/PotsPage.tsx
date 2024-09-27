import PageHeading from "../components/PageHeading";
import SectionWrapper from "../components/SectionWrapper";
import SectionHeading from "../components/SectionHeading";
import SectionTitle from "../components/SectionTitle";
import PotsCategorySummary from "../components/PotsCategorySummary";
import Button from "../components/Button";
import { pots } from "../data/data.json";

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