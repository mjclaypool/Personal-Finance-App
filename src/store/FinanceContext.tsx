import { createContext, JSX, useState } from "react";

import { balance, transactions, budgets, pots } from "../data/data.json";
import { formatterWithCents, formatterWithoutCents, formatDayMonthYear, formatDayWithSuffix } from "../utils/formatting";
import { filterTransactions } from "../utils/filterTransactions";
import { sortTransactions } from "../utils/sortTransactions";

type balanceType = {
  current: number,
  income: number,
  expenses: number
}

type transactionType = {
  avatar: string,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean
}

type budgetType = {
  category: string,
  maximum: number,
  theme: string
}

type potType = {
  name: string,
  target: number,
  total: number,
  theme: string
}

interface FinContextType {
  balance: balanceType,
  transactions: transactionType[],
  budgets: budgetType[],
  pots: potType[],
  formatWithCents: (value: number) => string,
  formatWithoutCents: (value: number) => string,
  formatDate: (timeStamp: string) => string,
  formatDay: (day: string) => string,
  getColorVar: (value: string) => string,
  getCatArray: (type: string, cat: string) => string[],
  getTransactions: () => transactionType[],
  getBudgetSpending: () => transactionType[],
  getBudgetSpendingByCat: (cat: string, spending: transactionType[]) => number,
  getBudgetSpendingTotal: (spending: transactionType[]) => number,
  getBudgetSpendingLimit: () => number,
  getRecurringBills: () => transactionType[],
  getRecurringBillsTotal: () => number,
  getRecurringBillsByStatus: (status: string) => transactionType[],
  getRecurringBillsByStatusTotal: (bills: transactionType[]) => number,
  updateSortingRule: (rule: string) => void,
  updateFilterRule: (rule: string) => void
}

const FinanceContext = createContext({} as FinContextType);

export function FinanceContextProvider(props: {children: JSX.Element}) {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const [currentBudgets, setCurrentBudgets] = useState(budgets);
  const [currentPots, setCurrentPots] = useState(pots);
  const [sortingRule, setSortingRule] = useState("Latest");
  const [filterRule, setFilterRule] = useState("All Transactions");

  function formatWithCents(value: number) {
    return formatterWithCents.format(value);
  }

  function formatWithoutCents(value: number) {
    return formatterWithoutCents.format(value);
  }

  function formatDate(timeStamp: string) {
    return formatDayMonthYear(timeStamp);
  }

  function formatDay(day: string) {
    return formatDayWithSuffix(day);
  }

  function getColorVar(value: string) {
    let colors = [
      {code: "#277C78", color:"bg-s-green"},
      {code: "#F2CDAC", color:"bg-s-yellow"},
      {code: "#82C9D7", color:"bg-s-cyan"},
      {code: "#626070", color:"bg-s-navy"},
      {code: "#C94736", color:"bg-s-red"},
      {code: "#826CB0", color:"bg-s-purple"}
    ];
    for (let i=0; i<colors.length; i++) {
      if (value == colors[i].code) {
        return colors[i].color;
      }
    }
    return "bg-p-beige100";
  }

  function getCatArray(type: string, cat: string) {
    let newArray: string[] = [];
    if (type == "budgets" && cat == "category") {
      for (let i=0; i<budgets.length; i++) {
        newArray.push(budgets[i].category)
      }
    } else if (type == "budgets" && cat == "theme") {
      for (let i=0; i<budgets.length; i++) {
        newArray.push(budgets[i].theme)
      }
    } else if (type == "transactions" && cat == "category") {
      for (let i=0; i<transactions.length; i++) {
        if (!newArray.includes(transactions[i].category)) {
          newArray.push(transactions[i].category);
        }
      }
    }
    return newArray;
  }

  function getTransactions() {
    let transactionsArray = transactions;
    transactionsArray = filterTransactions(transactionsArray, filterRule);
    transactionsArray = sortTransactions(transactionsArray, sortingRule);
    return transactionsArray;
  }

  function getBudgetSpending() {
    let categories = getCatArray("budgets", "category");
    let transactionsThisMonth = [];
    let spending = [];
    for (let i=0; i<transactions.length; i++) {
      let date = transactions[i].date;
      if (date.charAt(6) == "8") {
        transactionsThisMonth.push(transactions[i])
      }
    }
    for (let i=0; i<transactionsThisMonth.length; i++) {
      for (let j=0; j<categories.length; j++) {
        if (transactionsThisMonth[i].category == categories[j]) {
          spending.push(transactionsThisMonth[i]);
        }
      }
    }
    return spending;
  }

  function getBudgetSpendingByCat(cat: string, spending: transactionType[]) {
    let catTotal = 0;
    for (let i=0; i<spending.length; i++) {
      if (spending[i].category == cat) {
        catTotal += -spending[i].amount;
      }
    }
    return catTotal;
  }

  function getBudgetSpendingTotal(spending: transactionType[]) {
    let total = 0;
    for (let i=0; i<spending.length; i++) {
      total += -spending[i].amount;
    }
    return total;
  }

  function getBudgetSpendingLimit() {
    let limit = 0;
    for (let i=0; i<budgets.length; i++) {
      limit += budgets[i].maximum;
    }
    return limit;
  }

  function getRecurringBills() {
    let recurringThisMonth = [];
    for (let i=transactions.length-1; i>=0; i--) {
      if (transactions[i].recurring == true && transactions[i].date.charAt(6) == "8") {
        recurringThisMonth.push(transactions[i]);
      }
    }
    for (let i=transactions.length-1; i>=0; i--) {
      if (transactions[i].recurring == true && transactions[i].date.substring(8, 10) > "19") {
        recurringThisMonth.push(transactions[i]);
      }
    }
    recurringThisMonth = sortTransactions(recurringThisMonth, sortingRule);
    return recurringThisMonth;
  }

  function getRecurringBillsTotal() {
    const recurringBills = getRecurringBills();
    let total = 0;
    for (let i=0; i<recurringBills.length; i++) {
      total += -recurringBills[i].amount;
    }
    return total;
  }

  function getRecurringBillsByStatus(status: string) {
    const recurringBills = getRecurringBills();
    const currentMonth = "08";
    const currentDay = "19";
    const daySoon = "26";
    let recurringByStatus = [];
    if (status == "paid") {
      for (let i=0; i<recurringBills.length; i++) {
        if (recurringBills[i].date.substring(5, 7) == currentMonth) {
          recurringByStatus.push(recurringBills[i]);
        }
      }
    } else if (status == "upcoming") {
      for (let i=0; i<recurringBills.length; i++) {
        if (recurringBills[i].date.substring(5, 7) !== currentMonth) {
          recurringByStatus.push(recurringBills[i]);
        }
      }
    } else if (status == "due-soon") {
      for (let i=0; i<recurringBills.length; i++) {
        if ((recurringBills[i].date.substring(5, 7) !== currentMonth) && (recurringBills[i].date.substring(8, 10) > currentDay && recurringBills[i].date.substring(8, 10) < daySoon)) {
          recurringByStatus.push(recurringBills[i]);
        }
      }
    }
    return recurringByStatus;
  }

  function getRecurringBillsByStatusTotal(bills: transactionType[]) {
    let total = 0;
    for (let i=0; i<bills.length; i++) {
      total += -bills[i].amount;
    }
    return total;
  }

  function updateSortingRule(rule: string) {
    setSortingRule(rule);
  }

  function updateFilterRule(rule: string) {
    setFilterRule(rule);
  }

  const FinanceCtx = {
    balance: currentBalance,
    transactions: currentTransactions,
    budgets: currentBudgets,
    pots: currentPots,
    formatWithCents,
    formatWithoutCents,
    formatDate,
    formatDay,
    getColorVar,
    getCatArray,
    getTransactions,
    getBudgetSpending,
    getBudgetSpendingByCat,
    getBudgetSpendingTotal,
    getBudgetSpendingLimit,
    getRecurringBills,
    getRecurringBillsTotal,
    getRecurringBillsByStatus,
    getRecurringBillsByStatusTotal,
    updateSortingRule,
    updateFilterRule
  }

  return <FinanceContext.Provider value={FinanceCtx}>{props.children}</FinanceContext.Provider>
}

export default FinanceContext;