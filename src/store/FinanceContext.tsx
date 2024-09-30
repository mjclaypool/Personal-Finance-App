import { createContext, JSX, useState } from "react";

import { balance, transactions, budgets, pots } from "../data/data.json";
import { formatterWithCents, formatterWithoutCents } from "../utils/currencyFormatter";

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
  getColorVar: (value: string) => string,
  getCatArray: (type: string, cat: string) => string[],
  getTransactionsForCurrentMonth: () => transactionType[],
  getBudgetSpending: () => transactionType[],
  getBudgetSpendingByCat: (cat: string) => number,
  getBudgetSpendingTotal: () => number,
  getBudgetSpendingLimit: () => number
}

const FinanceContext = createContext({} as FinContextType);

export function FinanceContextProvider(props: {children: JSX.Element}) {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const [currentBudgets, setCurrentBudgets] = useState(budgets);
  const [currentPots, setCurrentPots] = useState(pots);

  function formatWithCents(value: number) {
    return formatterWithCents.format(value);
  }

  function formatWithoutCents(value: number) {
    return formatterWithoutCents.format(value);
  }

  function formatDate(timeStamp: string) {
    const day = timeStamp.substring(8, 10);
    const month = Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(timeStamp.substring(5, 7)));
    const year = timeStamp.substring(0, 4);
    return (day + " " + month + ", " + year);
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
    let newArray = [];
    if (type == "budgets" && cat == "category") {
      for (let i=0; i<budgets.length; i++) {
        newArray.push(budgets[i].category)
      }
    } else if (type == "budgets" && cat == "theme") {
      for (let i=0; i<budgets.length; i++) {
        newArray.push(budgets[i].theme)
      }
    }
    return newArray;
  }

  function getTransactionsForCurrentMonth() {
    let transactionsThisMonth = [];
    for (let i=0; i<transactions.length; i++) {
      let date = transactions[i].date;
      if (date.charAt(6) == "8") {
        transactionsThisMonth.push(transactions[i])
      } else {
        break;
      }
    }
    return transactionsThisMonth;
  }

  function getBudgetSpending() {
    let transactionsThisMonth = getTransactionsForCurrentMonth();
    let categories = getCatArray("budgets", "category");
    let spending = [];
    for (let i=0; i<transactionsThisMonth.length; i++) {
      for (let j=0; j<categories.length; j++) {
        if (transactionsThisMonth[i].category == categories[j]) {
          spending.push(transactionsThisMonth[i]);
        }
      }
    }
    return spending;
  }

  function getBudgetSpendingByCat(cat: string) {
    let spending = getBudgetSpending();
    let catTotal = 0;
    for (let i=0; i<spending.length; i++) {
      if (spending[i].category == cat) {
        catTotal += -spending[i].amount;
      }
    }
    return catTotal;
  }

  function getBudgetSpendingTotal() {
    let spending = getBudgetSpending();
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

  const FinanceCtx = {
    balance: currentBalance,
    transactions: currentTransactions,
    budgets: currentBudgets,
    pots: currentPots,
    formatWithCents,
    formatWithoutCents,
    formatDate,
    getColorVar,
    getCatArray,
    getTransactionsForCurrentMonth,
    getBudgetSpending,
    getBudgetSpendingByCat,
    getBudgetSpendingTotal,
    getBudgetSpendingLimit
  }

  return <FinanceContext.Provider value={FinanceCtx}>{props.children}</FinanceContext.Provider>
}

export default FinanceContext;