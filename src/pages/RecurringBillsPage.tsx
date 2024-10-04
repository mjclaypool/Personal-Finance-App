import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import PageHeading from "../UI/PageHeading";
import RecurringSummary from "../components/RecurringSummary";
import RecurringItemsList from "../components/RecurringItemsList";
import RecurringTotalBills from "../components/RecurringTotalBills";
import SearchBar from "../UI/SearchBar";
import SectionWrapper from "../UI/SectionWrapper";

// Recurring Bills Page
//
// -- Displays quantities and amounts of paid, upcoming, and due soon recurring bills.
// -- Displays a list of all recurring monthly bills, including visual indicators for paid and due soon bills.
// -- Allows the user to search and sort recurring bills.

const RecurringBillsPage = () => {
  const finCtx = useContext(FinanceContext);

  function handleSearchInput(rule: string) {
    finCtx.updateSearchRule(rule);
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Recurring Bills" />
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex flex-col md:flex-row xl:flex-col gap-3 md:gap-6 xl:w-[337px]">
          <div className="md:flex-1 xl:flex-none">
            <SectionWrapper color="black">
              <RecurringTotalBills />
            </SectionWrapper>
          </div>
          <div className="md:flex-1 xl:flex-none">
            <SectionWrapper color="white">
              <RecurringSummary />
            </SectionWrapper>
          </div>
        </div>
        <div className="xl:flex-1">
          <SectionWrapper color="white">
            <div className="flex flex-col gap-6">
              <SearchBar didChange={handleSearchInput} sort={true} />
              <RecurringItemsList />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  )
}

export default RecurringBillsPage;