type transaction = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean,
  paid?: boolean
}

// Loop through an array of transactions. Returns a new array of "last month's" recurring transactions.
export function getRecurring(transactions: transaction[]) {
  let filteredArray = [];
  for (let i=transactions.length-1; i > 0; i--) {
    if (transactions[i].recurring == true) {
      if (filteredArray.length > 0 && transactions[i].name == filteredArray[0].name) {
        break;
      } else {
      filteredArray.push(transactions[i]);
      }
    }
  }
  return filteredArray;
}

// Loop through an array of transactions. Determine whether each recurring transaction has been paid yet "this month". Returns an array of booleans where true is paid and false is unpaid.
export function getRecurringStatus(transactions: transaction[], recurringBills: transaction[]) {
  let billStatuses = []
  for (let i=0; i<transactions.length; i++) {
    if (transactions[i].recurring == true) {
      for (let j=0; j<recurringBills.length; j++) {
        if (recurringBills[j].name == transactions[i].name && recurringBills[j].date !== transactions[i].date) {
          billStatuses.push(true);
        } else if (recurringBills[j].name == transactions[i].name && recurringBills[j].date == transactions[i].date) {
          billStatuses.push(false);
        }
      }
    }
  }
  return billStatuses;
}

// Loop through an array of recurring transactions. Adds a paid (true) or unpaid (false) status to each recurring transaction. Returns an array of recurring transactions with the added key-value pair.
export function getBillsWithStats(recurringBills: transaction[], recurringBillsStatus: boolean[]) {
  let updatedBills: transaction[] = recurringBills;
  for (let i=0; i<recurringBills.length; i++) {
    updatedBills[i].paid = recurringBillsStatus[i];
  }
  return updatedBills;
}

// Loop through an array of recurring transactions. Returns an array of paid recurring transactions.
export function getPaidBills(recurringBillsWithStatus: transaction[]) {
  let paidBills = [];
  for (let i=0; i<recurringBillsWithStatus.length; i++) {
    if (recurringBillsWithStatus[i].paid == true) {
      paidBills.push(recurringBillsWithStatus[i]);
    }
  }
  return paidBills;
}

// Loop through an array of recurring transactions. Returns an array of unpaid recurring transactions.
export function getUpcomingBills(recurringBillsWithStatus: transaction[]) {
  let upcomingBills = [];
  for (let i=0; i<recurringBillsWithStatus.length; i++) {
    if (recurringBillsWithStatus[i].paid == false) {
      upcomingBills.push(recurringBillsWithStatus[i]);
    }
  }
  return upcomingBills;
}

// Loop through an array of recurring transactions. Returns an array of updaid, due soon recurring transactions.
export function getDueSoonBills(upcomingBills: transaction[]) {
  let dueSoonBills = [];
  for (let i=0; i<upcomingBills.length; i++) {
    if (upcomingBills[i].date.substring(8, 10) > "19" && upcomingBills[i].date.substring(8, 10) < "25") {
      dueSoonBills.push(upcomingBills[i]);
    }
  }
  return dueSoonBills;
}

// Loop through an array of recurring transactions. Returns the sum of all transactions.
export function getTotal(bills: transaction[]) {
  let total = 0;
  for (let i=0; i<bills.length; i++) {
    total += bills[i].amount;
  }
  return total;
}