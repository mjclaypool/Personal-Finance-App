import SectionWrapper from "./SectionWrapper";
import SectionHeading from "./SectionHeading";
import SectionTitle from "./SectionTitle";
import BillSummaryItem from "./BillSummaryItem";
import Button from "./Button";
import { transactions } from "../data/data.json";

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

const Recurring = () => {
  const recurringBills = getRecurring(transactions);

  function getRecurring(items: transaction[]) {
    let filteredList = {
      paid: 0,
      upcoming: 0
    };
    for (let i=0; i<items.length; i++) {
      if (items[i].recurring == true && items[i].amount > 0) {
        filteredList.paid += items[i].amount;
      } else if (items[i].recurring == true && items[i].amount < 0) {
        filteredList.upcoming += -items[i].amount;
      }
    }
    return filteredList;
  }

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-8">
        <SectionHeading
          start={<SectionTitle title="Recurring Bills" />}
          end={<Button label="See Details" type="tertiary"/>}
        />
        <div className="flex flex-col gap-3">
          <BillSummaryItem theme="green" category="Paid Bills" balance={recurringBills.paid} />
          <BillSummaryItem theme="yellow" category="Total Upcoming" balance={recurringBills.upcoming} />
          <BillSummaryItem theme="cyan" category="Due Soon" balance={recurringBills.upcoming} />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Recurring;