import { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../UI/Button";
import CategorySummary from "./CategorySummary";
import FinanceContext from "../store/FinanceContext";
import PotsTotalSaved from "./PotsTotalSaved";
import SectionHeading from "../UI/SectionHeading";
import SectionTitle from "../UI/SectionTitle";
import SectionWrapper from "../UI/SectionWrapper";
import UserProgressContext from "../store/UserProgressContext";

// Pots component
//
// Used in: Homepage.tsx
// Function:
// -- Displays the user's total savings across all pots.
// -- Displays up to 4 pots and the amount saved in each.
// -- Allows users to view additional pots details via the CTA.

type potData = {
  name: string,
  target: number,
  total: number,
  theme: string
}

const Pots = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const potsForDashboard: potData[] = finCtx.pots.slice(0, 4);
  const totalSaved: string = getTotal(finCtx.pots);

  function getTotal(data: potData[]) {
    let total: number = 0;
    for (let i=0; i<data.length; i++) {
      total += data[i].total;
    }
    return finCtx.formatWithoutCents(total);
  }

  function handleClick() {
    userCtx.updateCurrentPage("Pots");
    window.scrollTo(0, 0);
  }

  return (
    <SectionWrapper color="white">
      <div className="flex flex-col gap-5">
        <SectionHeading
          start={<SectionTitle title="Pots" size="lg" />}
          end={<Link to="/pots" onClick={handleClick}><Button label="See Details" type="tertiary"/></Link>}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <PotsTotalSaved total={totalSaved}/>
          <div className="flex flex-col flex-wrap gap-4 max-h-[102px]">
            {potsForDashboard.map(pot => (
              <div key={pot.name} className="md:w-[170px]">
                <CategorySummary name={pot.name} total={finCtx.formatWithoutCents(pot.total)} theme={pot.theme} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Pots;