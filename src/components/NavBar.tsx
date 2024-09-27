import { useState } from 'react';

import overviewIcon from '../assets/images/icon-nav-overview.svg';
import transactionsIcon from '../assets/images/icon-nav-transactions.svg';
import budgetsIcon from '../assets/images/icon-nav-budgets.svg';
import potsIcon from '../assets/images/icon-nav-pots.svg';
import recurringIcon from '../assets/images/icon-nav-recurring-bills.svg';
import activeOverviewIcon from '../assets/images/icon-nav-overview-active.svg';
import activeTransactionsIcon from '../assets/images/icon-nav-transactions-active.svg';
import activeBudgetsIcon from '../assets/images/icon-nav-budgets-active.svg';
import activePotsIcon from '../assets/images/icon-nav-pots-active.svg';
import activeRecurringIcon from '../assets/images/icon-nav-recurring-bills-active.svg';

type navItem = {
  label: string,
  icon: string,
  activeIcon: string,
  alt: string
}

const NavBar = (props: {onNavSelection: (item: string) => void}) => {
  const [activePage, setActivePage] = useState("Overview");

  const navMenu: navItem[] = [
    {
      label: "Overview",
      icon: overviewIcon,
      activeIcon: activeOverviewIcon,
      alt: "Overview Icon"
    },
    {
      label: "Transactions",
      icon: transactionsIcon,
      activeIcon: activeTransactionsIcon,
      alt: "Transactions Icon"
    },
    {
      label: "Budgets",
      icon: budgetsIcon,
      activeIcon: activeBudgetsIcon,
      alt: "Budgets Icon"
    },
    {
      label: "Pots",
      icon: potsIcon,
      activeIcon: activePotsIcon,
      alt: "Pots Icon"
    },
    {
      label: "Recurring bills",
      icon: recurringIcon,
      activeIcon: activeRecurringIcon,
      alt: "Recurring bills Icon"
    }
  ]

  function handleClick (menuLabel: string) {
    setActivePage(menuLabel);
    props.onNavSelection(menuLabel);
    window.scrollTo(0, 0);
  }

  return (
    <div className="sticky bottom-0 flex justify-between items-center bg-p-grey900 rounded-t-xl font-pubSans px-200 pt-100">
      {navMenu.map((menuItem) => (
        <div key={menuItem.label} className="flex-1">
          {menuItem.label == activePage ?
            <div className="flex flex-col flex-1 items-center bg-p-beige100 rounded-t-xl border-b-4 border-b-s-green py-100">
              <img src={menuItem.activeIcon} alt={menuItem.alt} className="h-6 w-6 object-cover p-[3px]" />
              <p className="hidden md:block text-preset5 text-p-grey900 font-bold mt-1">{menuItem.label}</p>
            </div>
          :
            <div
              className="flex flex-col flex-1 items-center border-b-4 border-b-transparent py-100 cursor-pointer"
              onClick={() => handleClick(menuItem.label)}
            >
              <img src={menuItem.icon} alt={menuItem.alt} className="h-6 w-6 object-cover p-[3px]" />
              <p className="hidden md:block text-preset5 text-p-grey300 font-bold mt-1">{menuItem.label}</p>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export default NavBar;