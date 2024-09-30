import { useState } from 'react';

import NavItem from './NavItem';

import logo from '../assets/images/logo-large.svg';
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
import minMenuIcon from '../assets/images/icon-minimize-menu.svg';

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
    <div className="sticky bottom-0 xl:relative font-pubSans bg-p-grey900 rounded-t-xl pt-100 xl:min-h-[100vh] xl:w-[300px] xl:rounded-l-none xl:rounded-r-xl">
      <img src={logo} alt="Finance logo" className="hidden xl:block xl:fixed p-400 pb-[72px]" />
      <div className="flex justify-between items-center xl:fixed xl:top-[125px] xl:flex-col xl:justify-start xl:items-start md:gap-[42px] xl:gap-0 w-full px-200 md:px-500 xl:px-0">
        {navMenu.map((menuItem) => (
          <div key={menuItem.label} className="flex-1 xl:flex-none" onClick={() => handleClick(menuItem.label)}>
            {menuItem.label == activePage ?
              <NavItem type="active" icon={menuItem.activeIcon} alt={menuItem.alt} label={menuItem.label} />
            :
              <NavItem type="inactive" icon={menuItem.icon} alt={menuItem.alt} label={menuItem.label} />
            }
          </div>
        ))}
      </div>
      <div className="hidden xl:flex items-center gap-4 fixed bottom-[58px] px-400 cursor-pointer">
        <img src={minMenuIcon} alt="Minimize menu icon" />
        <p className="text-preset3 text-p-grey300">Minimize Menu</p>
      </div>
    </div>
  )
}

export default NavBar;