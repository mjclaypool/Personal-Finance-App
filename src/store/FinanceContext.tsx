import { createContext, JSX, useState } from "react";

import { balance, transactions, budgets, pots } from "../data/data.json";
import { formatterWithCents, formatterWithoutCents } from "../utils/currencyFormatter";

interface FinContextType {
  balance: {
    current: number,
    income: number,
    expenses: number
  },
  transactions: {
    avatar: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    recurring: boolean
  }[],
  budgets: {
    category: string,
    maximum: number,
    theme: string
  }[],
  pots: {
    name: string,
    target: number,
    total: number,
    theme: string
  }[],
  formatWithCents: (value: number) => string,
  formatWithoutCents: (value: number) => string,
  getColorVar: (value: string) => string
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

  const FinanceCtx = {
    balance: currentBalance,
    transactions: currentTransactions,
    budgets: currentBudgets,
    pots: currentPots,
    formatWithCents,
    formatWithoutCents,
    getColorVar
  }

  return <FinanceContext.Provider value={FinanceCtx}>{props.children}</FinanceContext.Provider>
}

export default FinanceContext;