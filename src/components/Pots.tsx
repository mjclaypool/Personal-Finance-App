import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import SectionTitle from "./SectionTitle";
import CategorySummary from "./CategorySummary";
import Button from "./Button";
import { pots } from "../data/data.json";

import potIcon from "../assets/images/icon-pot.svg"

type potData = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const Pots = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  const potsForDashboard: potData[] = pots.slice(0, 4);
  const totalSaved: string = getTotal(pots);

  function getTotal(data: potData[]) {
    let total: number = 0;
    for (let i=0; i<data.length; i++) {
      total += data[i].total;
    }
    return formatter.format(total);
  }

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Pots" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex items-center gap-4 bg-p-beige100 rounded-xl px-200 py-250">
          <div className="py-[2px] px-[6px]">
            <img src={potIcon} alt="Icon for money pots" />
          </div>
          <div className="flex flex-col gap-[11px]">
            <h3 className="text-preset4 text-p-grey500">Total Saved</h3>
            <p className="text-preset1 text-p-grey900">{totalSaved}</p>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-4 max-h-[102px]">
          {potsForDashboard.map(pot => (
            <div key={pot.name}>
              <CategorySummary name={pot.name} total={formatter.format(pot.total)} theme={pot.theme} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Pots;