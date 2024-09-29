import PageHeading from "../UI/PageHeading";
import RecurringSummary from "../components/RecurringSummary";
import RecurringItemsList from "../components/RecurringItemsList";
import SearchBar from "../UI/SearchBar";
import SectionWrapper from "../UI/SectionWrapper";

import {
  getRecurring,
  getRecurringStatus,
  getBillsWithStats,
  getTotal
} from "../utils/recurringBills";
import { formatterWithCents } from "../utils/currencyFormatter";
import { transactions } from "../data/data.json";

import billsIcon from "../assets/images/icon-recurring-bills.svg";

// Recurring Bills Page
//
// -- Displays quantities and amounts of paid, upcoming, and due soon recurring bills.
// -- Displays a list of all recurring monthly bills, including visual indicators for paid and due soon bills.
// -- Allows the user to search and sort recurring bills.

const RecurringBillsPage = () => {
  const recurringBills = getRecurring(transactions);
  const recurringBillsStatus = getRecurringStatus(transactions, recurringBills);
  const recurringBillsWithStatus = getBillsWithStats(recurringBills, recurringBillsStatus);
  const totalBills = getTotal(recurringBillsWithStatus);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading pageTitle="Recurring Bills" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-6">
          <div className="md:flex-1">
            <SectionWrapper color="black">
              <div className="flex md:flex-col items-center md:items-start gap-5 md:gap-8">
                <img src={billsIcon} alt="Recurring bills icon" />
                <div className="flex flex-col gap-[11px]">
                  <h2 className="text-preset4 text-white">Total bills</h2>
                  <p className="text-preset1 text-white">{formatterWithCents.format(-totalBills)}</p>
                </div>
              </div>
            </SectionWrapper>
          </div>
          <div className="md:flex-1">
            <SectionWrapper color="white">
              <RecurringSummary bills={recurringBillsWithStatus}/>
            </SectionWrapper>
          </div>
        </div>
        <SectionWrapper color="white">
          <div className="flex flex-col gap-6">
            <SearchBar sort={true} />
            <RecurringItemsList bills={recurringBillsWithStatus}/>
          </div>
        </SectionWrapper>
      </div>
    </div>
  )
}

export default RecurringBillsPage;