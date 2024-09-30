// RecurringItemsList component
//
// Used in: TransactionsPage.tsx, RecurringItemsList.tsx
// Function:
// -- Displays the column headings for transaction items.

const TransactionHeaderBar = (props: {type: string}) => {
  return (
    <>
      <div className="hidden md:flex justify-between items-center gap-8 text-preset5 text-p-grey500 py-150">
        {props.type == "transactions" &&
          <>
            <h2 className="flex-1">Recipient / Sender</h2>
            <h2 className="w-[80px] xl:w-[120px]">Category</h2>
            <h2 className="w-[88px] xl:w-[120px]">Transaction Date</h2>
            <h2 className="w-[88px] xl:w-[200px] text-end">Amount</h2>
          </>
        }
        {props.type == "recurring" &&
          <>
            <h2 className="flex-1">Bill Title</h2>
            <h2 className="w-[120px]">Due Date</h2>
            <h2 className="w-[100px] text-end">Amount</h2>
          </>
        }
      </div>
      <div className="h-[1px] bg-p-grey500 bg-opacity-15 my-3"/>
    </>
  )
}

export default TransactionHeaderBar;