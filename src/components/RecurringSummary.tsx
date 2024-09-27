import RecurringSummaryItem from "./RecurringSummaryItem";
import { getPaidBills, getUpcomingBills, getDueSoonBills, getTotal } from "../utils/recurringBills";

type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean,
  paid?: boolean
}

const RecurringSummary = (props: {bills: transaction[]}) => {
  const paidBills = getPaidBills(props.bills);
  const upcomingBills = getUpcomingBills(props.bills);
  const dueSoonBills = getDueSoonBills(upcomingBills);

  const paidBillsTotal = getTotal(paidBills);
  const upcomingBillsTotal = getTotal(upcomingBills);
  const dueSoonBillsTotal = getTotal(dueSoonBills);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-preset3 text-p-grey900">Summary</h2>
      <div>
        <RecurringSummaryItem
          title="Paid Bills"
          qty={paidBills.length}
          total={-paidBillsTotal}
          color="default"
        />
        <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
        <RecurringSummaryItem
          title="Total Upcoming"
          qty={upcomingBills.length}
          total={-upcomingBillsTotal}
          color="default"
        />
        <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
        <RecurringSummaryItem
          title="Due Soon"
          qty={dueSoonBills.length}
          total={-dueSoonBillsTotal}
          color="red"
        />
      </div>
    </div>
  )
}

export default RecurringSummary;