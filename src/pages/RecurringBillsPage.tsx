import { useContext } from "react";

import FinanceContext from "../store/FinanceContext";
import PageHeading from "../UI/PageHeading";
import RecurringSummary from "../components/RecurringSummary";
import RecurringItemsList from "../components/RecurringItemsList";
import SearchBar from "../UI/SearchBar";
import SectionWrapper from "../UI/SectionWrapper";

import billsIcon from "../assets/images/icon-recurring-bills.svg";

// Recurring Bills Page
//
// -- Displays quantities and amounts of paid, upcoming, and due soon recurring bills.
// -- Displays a list of all recurring monthly bills, including visual indicators for paid and due soon bills.
// -- Allows the user to search and sort recurring bills.

const RecurringBillsPage = () => {
  const finCtx = useContext(FinanceContext);
  const recurringBills = finCtx.getRecurringBills();

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
              <div className="flex md:flex-col items-center md:items-start gap-5 md:gap-8">
                <img src={billsIcon} alt="Recurring bills icon" />
                <div className="flex flex-col gap-[11px]">
                  <h2 className="text-preset4 text-white">Total bills</h2>
                  <p className="text-preset1 text-white">{finCtx.formatWithCents(finCtx.getRecurringBillsTotal())}</p>
                </div>
              </div>
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
              <RecurringItemsList bills={recurringBills} />
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  )
}

export default RecurringBillsPage;