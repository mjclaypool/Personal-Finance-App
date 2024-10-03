import { createContext, JSX, useState } from "react";

import { balance, transactions, budgets, pots } from "../data/data.json";
import { formatterWithCents, formatterWithoutCents, formatDayMonthYear, formatDayWithSuffix } from "../utils/formatting";
import { searchTransactions, filterTransactions, sortTransactions } from "../utils/searchTransactions";
import { colorOptions } from "../utils/colors";

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
  addBudget: (budget: budgetType) => void,
  updateBudgets: (budget: budgetType) => void,
  deleteBudget: (cat: string) => void,
  addPot: (pot: potType) => void,
  updatePots: (pot: potType) => void,
  deletePot: (name: string) => void,
  formatWithCents: (value: number) => string,
  formatWithoutCents: (value: number) => string,
  formatDate: (timeStamp: string) => string,
  formatDay: (day: string) => string,
  getColorVar: (value: string) => string,
  getColorOptions: () => {code: string, color: string, name: string}[],
  getCatArray: (type: string, cat: string) => string[],
  getTransactions: () => transactionType[],
  getPot: (name: string) => potType,
  getBudget: (cat: string) => budgetType,
  getBudgetSpending: () => transactionType[],
  getBudgetSpendingByCat: (cat: string, spending: transactionType[]) => number,
  getBudgetSpendingTotal: (spending: transactionType[]) => number,
  getBudgetSpendingLimit: () => number,
  getRecurringBills: () => transactionType[],
  getRecurringBillsTotal: () => number,
  getRecurringBillsByStatus: (status: string) => transactionType[],
  getRecurringBillsByStatusTotal: (bills: transactionType[]) => number,
  updateSortingRule: (rule: string) => void,
  updateFilterRule: (rule: string) => void,
  updateSearchRule: (rule: string) => void
}

const FinanceContext = createContext({} as FinContextType);

export function FinanceContextProvider(props: {children: JSX.Element}) {
  const [currentBudgets, setCurrentBudgets] = useState(budgets);
  const [currentPots, setCurrentPots] = useState(pots);
  const [sortingRule, setSortingRule] = useState("Latest");
  const [filterRule, setFilterRule] = useState("All Transactions");
  const [searchRule, setSearchRule] = useState("");
  const currentBalance = balance;
  const currentTransactions = transactions;

  function addBudget(budget: budgetType) {
    let currentBudgetsArray = currentBudgets;
    currentBudgetsArray.push(budget);
    setCurrentBudgets(currentBudgetsArray);
  }

  function updateBudgets(budget: budgetType) {
    let currentBudgetsArray = currentBudgets;
    const budgetIndex = currentBudgetsArray.findIndex(obj => obj.category == budget.category);
    if (budgetIndex > -1) {
      currentBudgetsArray[budgetIndex] = budget;
    }
    setCurrentBudgets(currentBudgetsArray);
  }

  function deleteBudget(cat: string) {
    let currentBudgetsArray = currentBudgets;
    const budgetIndex = currentBudgetsArray.findIndex(obj => obj.category == cat);
    if (budgetIndex > -1) {
      currentBudgetsArray.splice(budgetIndex, 1);
    }
    setCurrentBudgets(currentBudgetsArray);
  }

  function addPot(pot: potType) {
    let currentPotsArray = currentPots;
    currentPotsArray.push(pot);
    setCurrentPots(currentPotsArray);
  }

  function updatePots(pot: potType) {
    let currentPotsArray = currentPots;
    const potIndex = currentPotsArray.findIndex(obj => obj.name == pot.name);
    if (potIndex > -1) {
      currentPotsArray[potIndex] = pot;
    }
    setCurrentPots(currentPotsArray);
  }

  function deletePot(name: string) {
    let currentPotsArray = currentPots;
    const potIndex = currentPotsArray.findIndex(obj => obj.name == name);
    if (potIndex > -1) {
      currentPotsArray.splice(potIndex, 1);
    }
    setCurrentPots(currentPotsArray);
  }

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

  function getColorOptions() {
    return colorOptions;
  }

  function getColorVar(value: string) {
    const colorsArray = getColorOptions();
    const colorIndex = colorsArray.findIndex(obj => obj.code == value);
    if (colorIndex > -1) {
      return colorsArray[colorIndex].color;
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
      for (let i=0; i<currentTransactions.length; i++) {
        if (!newArray.includes(currentTransactions[i].category)) {
          newArray.push(currentTransactions[i].category);
        }
      }
    }
    return newArray;
  }

  function getTransactions() {
    let transactionsArray = currentTransactions;
    transactionsArray = filterTransactions(transactionsArray, filterRule);
    transactionsArray = sortTransactions(transactionsArray, sortingRule);
    transactionsArray = searchTransactions(transactionsArray, searchRule);
    return transactionsArray;
  }

  function getPot(name: string) {
    const potIndex = pots.findIndex(obj => obj.name == name);
    if (potIndex > -1) {
      return pots[potIndex];
    }
    return pots[0];
  }

  function getBudget(cat: string) {
    const budgetIndex = budgets.findIndex(obj => obj.category == cat);
    if (budgetIndex > -1) {
      return budgets[budgetIndex];
    }
    return budgets[0];
  }

  function getBudgetSpending() {
    let categories = getCatArray("budgets", "category");
    let transactionsThisMonth = [];
    let spending = [];
    for (let i=0; i<currentTransactions.length; i++) {
      let date = currentTransactions[i].date;
      if (date.charAt(6) == "8") {
        transactionsThisMonth.push(currentTransactions[i])
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
    for (let i=currentTransactions.length-1; i>=0; i--) {
      if (currentTransactions[i].recurring == true && currentTransactions[i].date.charAt(6) == "8") {
        recurringThisMonth.push(currentTransactions[i]);
      }
    }
    for (let i=currentTransactions.length-1; i>=0; i--) {
      if (currentTransactions[i].recurring == true && currentTransactions[i].date.substring(8, 10) > "19") {
        recurringThisMonth.push(currentTransactions[i]);
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

  function updateSearchRule(rule: string) {
    setSearchRule(rule);
  }

  const FinanceCtx = {
    balance: currentBalance,
    transactions: currentTransactions,
    budgets: currentBudgets,
    pots: currentPots,
    addBudget,
    updateBudgets,
    deleteBudget,
    addPot,
    updatePots,
    deletePot,
    formatWithCents,
    formatWithoutCents,
    formatDate,
    formatDay,
    getColorVar,
    getColorOptions,
    getCatArray,
    getTransactions,
    getPot,
    getBudget,
    getBudgetSpending,
    getBudgetSpendingByCat,
    getBudgetSpendingTotal,
    getBudgetSpendingLimit,
    getRecurringBills,
    getRecurringBillsTotal,
    getRecurringBillsByStatus,
    getRecurringBillsByStatusTotal,
    updateSortingRule,
    updateFilterRule,
    updateSearchRule
  }

  return <FinanceContext.Provider value={FinanceCtx}>{props.children}</FinanceContext.Provider>
}

export default FinanceContext;