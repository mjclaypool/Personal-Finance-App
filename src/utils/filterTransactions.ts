type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

export function filterTransactions(transactions: transactionType[], rule: string) {
  if (rule !== "All Transactions") {
    let filteredArray = [];
    for (let i=0; i<transactions.length; i++) {
      if (transactions[i].category == rule) {
        filteredArray.push(transactions[i]);
      }
    }
    return filteredArray;
  }

  return transactions;
}