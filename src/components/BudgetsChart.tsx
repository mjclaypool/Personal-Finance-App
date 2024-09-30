import { useContext } from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

import FinanceContext from "../store/FinanceContext";

// BudgetsChart component
//
// Used in: Budgets.tsx, BudgetSpendingSummary.tsx
// Function:
// -- Displays a doughnut graph of the current month's spending in set budget categories.

const BudgetsChart = () => {
  const finCtx = useContext(FinanceContext);
  const spendingTotal = finCtx.getBudgetSpendingTotal();
  const spendingLimit = finCtx.getBudgetSpendingLimit();
  const chartLabels = finCtx.getCatArray("budgets", "category");

  const chartData = {
    labels: chartLabels,
    datasets: [{
      data: [
        finCtx.getBudgetSpendingByCat(chartLabels[0]),
        finCtx.getBudgetSpendingByCat(chartLabels[1]),
        finCtx.getBudgetSpendingByCat(chartLabels[2]),
        finCtx.getBudgetSpendingByCat(chartLabels[3])
      ],
      backgroundColor: finCtx.getCatArray("budgets", "theme"),
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '60%'
  }

  return (
    <div className="relative flex justify-center md:flex-1">
      <div className="w-[240px] h-[240px]">
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col gap-2 items-center">
          <p className="text-preset1 text-p-grey900">{finCtx.formatWithoutCents(spendingTotal)}</p>
          <p className="text-preset5 text-p-grey500">of {finCtx.formatWithoutCents(spendingLimit)} limit</p>
        </div>
      </div>
    </div>
  )
}

export default BudgetsChart;