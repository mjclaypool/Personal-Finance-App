import { useState, useContext } from 'react';

import FinanceContext from '../store/FinanceContext';
import NavItem from './NavItem';

import logo from '../assets/images/logo-large.svg';
import logoSm from '../assets/images/logo-small.svg';
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
  const finCtx = useContext(FinanceContext);
  const [currentPage, setCurrentPage] = useState("Overview");
  const [miniNav, setMiniNav] = useState(false);

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

  function handleClick(menuLabel: string) {
    setCurrentPage(menuLabel);
    finCtx.updateSortingRule("Latest");
    finCtx.updateFilterRule("All Transactions");
    props.onNavSelection(menuLabel);
    window.scrollTo(0, 0);
  }

  function handleMinimize() {
    setMiniNav(true);
  }

  function handleMaximize() {
    setMiniNav(false);
  }

  return (
    <>
      {!miniNav ?
        <div className="sticky bottom-0 xl:relative font-pubSans bg-p-grey900 rounded-t-xl pt-100 xl:min-h-[100vh] xl:w-[300px] xl:rounded-l-none xl:rounded-r-xl">
          <img src={logo} alt="Finance logo" className="hidden xl:block xl:fixed p-400" />
          <div className="flex justify-between items-center xl:fixed xl:top-[125px] xl:flex-col xl:justify-start xl:items-start md:gap-[42px] xl:gap-0 px-200 md:px-500 xl:px-0">
            {navMenu.map((menuItem) => (
              <div key={menuItem.label} className="flex-1 xl:flex-none" onClick={() => handleClick(menuItem.label)}>
                {menuItem.label == currentPage ?
                  <NavItem type="active" icon={menuItem.activeIcon} alt={menuItem.alt} label={menuItem.label} size="default" />
                :
                  <NavItem type="inactive" icon={menuItem.icon} alt={menuItem.alt} label={menuItem.label} size="default" />
                }
              </div>
            ))}
          </div>
          <div className="hidden xl:flex items-center gap-4 fixed bottom-[58px] px-400 cursor-pointer" onClick={handleMinimize}>
            <img src={minMenuIcon} alt="Minimize menu icon" />
            <p className="text-preset3 text-p-grey300">Minimize Menu</p>
          </div>
        </div>
      :
        <div className="hidden xl:flex relative font-pubSans bg-p-grey900 pt-100 min-h-[100vh] w-[88px] rounded-r-xl">
          <img src={logoSm} alt="Finance logo" className="block fixed p-400" />
          <div className="flex flex-col justify-start items-start fixed top-[125px]">
            {navMenu.map((menuItem) => (
              <div key={menuItem.label} onClick={() => handleClick(menuItem.label)}>
                {menuItem.label == currentPage ?
                  <NavItem type="active" icon={menuItem.activeIcon} alt={menuItem.alt} label={menuItem.label} size="mini" />
                :
                  <NavItem type="inactive" icon={menuItem.icon} alt={menuItem.alt} label={menuItem.label} size="mini" />
                }
              </div>
            ))}
          </div>
          <div className="fixed bottom-[58px] px-400 cursor-pointer rotate-180" onClick={handleMaximize}>
            <img src={minMenuIcon} alt="Minimize menu icon" />
          </div>
        </div>
      }
    </>
  )
}

export default NavBar;