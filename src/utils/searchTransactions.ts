type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

export function searchTransactions(transactions: transactionType[], rule: string) {
  // Filter transactions array by search input field
  if (rule !== "") {
    let filteredArray = [];
    for (let i=0; i<transactions.length; i++) {
      if (transactions[i].name.substring(0, rule.length) == rule) {
        filteredArray.push(transactions[i]);
      }
    }
    return filteredArray;
  }
  return transactions;
}

export function filterTransactions(transactions: transactionType[], rule: string) {
  // Filter transactions array by selected category
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

export function sortTransactions(transactions: transactionType[], rule: string) {
  // Bubble sort algorithm to sort the array from the latest to oldest transactions
  if (rule == "Latest") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (transactions[j].date < transactions[j+1].date) {
          let earlierDate = transactions[j];
          let laterDate = transactions[j+1];
          sortedArray[j] = laterDate;
          sortedArray[j+1] = earlierDate;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  // Bubble sort algorithm to sort the array from the oldest to latest transactions
  if (rule == "Oldest") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (transactions[j].date > transactions[j+1].date) {
          let laterDate = transactions[j];
          let earlierDate = transactions[j+1];
          sortedArray[j] = earlierDate;
          sortedArray[j+1] = laterDate;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  // Bubble sort algorithm to sort the array from the names Z to A
  if (rule == "A to Z") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (transactions[j].name > transactions[j+1].name) {
          let laterName = transactions[j];
          let earlierName = transactions[j+1];
          sortedArray[j] = earlierName;
          sortedArray[j+1] = laterName;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  // Bubble sort algorithm to sort the array from the names Z to A
  if (rule == "Z to A") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (transactions[j].name < transactions[j+1].name) {
          let laterName = transactions[j+1];
          let earlierName = transactions[j];
          sortedArray[j] = laterName;
          sortedArray[j+1] = earlierName;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  // Bubble sort algorithm to sort the array from the largest to smallest transactions
  if (rule == "Highest") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (Math.abs(transactions[j].amount) < Math.abs(transactions[j+1].amount)) {
          let largerAmount = transactions[j+1];
          let smallerAmount = transactions[j];
          sortedArray[j] = largerAmount;
          sortedArray[j+1] = smallerAmount;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  // Bubble sort algorithm to sort the array from the smallest to largest transactions
  if (rule == "Lowest") {
    let sortedArray = transactions;
    for (let i=0; i<transactions.length-1; i++) {
      let swapped = false;
      for (let j=0; j<transactions.length-i-1; j++) {
        if (Math.abs(transactions[j].amount) > Math.abs(transactions[j+1].amount)) {
          let largerAmount = transactions[j];
          let smallerAmount = transactions[j+1];
          sortedArray[j] = smallerAmount;
          sortedArray[j+1] = largerAmount;
          swapped = true;
        }
      }
      if (swapped == false) {
        break;
      }
    }
    return sortedArray;
  }

  return transactions;
}