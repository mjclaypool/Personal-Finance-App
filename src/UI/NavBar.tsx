import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";

import FinanceContext from '../store/FinanceContext';
import UserProgressContext from '../store/UserProgressContext';
import NavItem from './NavItem';
import NavBarWrapper from './NavBarWrapper';

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
  alt: string,
  slug: string
}

const NavBar = () => {
  const finCtx = useContext(FinanceContext);
  const userCtx = useContext(UserProgressContext);
  const location = useLocation();
  const [miniNav, setMiniNav] = useState(false);

  useEffect(() => {
    const navIndex = navMenu.findIndex(obj => obj.slug == location.pathname);
    userCtx.updateCurrentPage(navMenu[navIndex].label);
  }, [location.pathname])

  const navMenu: navItem[] = [
    {
      label: "Overview",
      icon: overviewIcon,
      activeIcon: activeOverviewIcon,
      alt: "Overview Icon",
      slug: "/"
    },
    {
      label: "Transactions",
      icon: transactionsIcon,
      activeIcon: activeTransactionsIcon,
      alt: "Transactions Icon",
      slug: "/transactions"
    },
    {
      label: "Budgets",
      icon: budgetsIcon,
      activeIcon: activeBudgetsIcon,
      alt: "Budgets Icon",
      slug: "/budgets"
    },
    {
      label: "Pots",
      icon: potsIcon,
      activeIcon: activePotsIcon,
      alt: "Pots Icon",
      slug: "/pots"
    },
    {
      label: "Recurring bills",
      icon: recurringIcon,
      activeIcon: activeRecurringIcon,
      alt: "Recurring bills Icon",
      slug: "/recurring"
    }
  ]

  function handleChangePage() {
    userCtx.updateSection("");
    finCtx.updateSortingRule("Latest");
    finCtx.updateFilterRule("All Transactions");
    finCtx.updateSearchRule("");
    window.scrollTo(0, 0);
  }

  function handleMinimize() {
    if (miniNav == false) {
    setMiniNav(true);
    } else {
      setMiniNav(false);
    }
  }

  return (
    <NavBarWrapper minimize={miniNav}>
      <>
        {!miniNav && <img src={logo} alt="Finance logo" className="hidden xl:block xl:fixed p-400" />}
        {miniNav && <img src={logoSm} alt="Finance logo" className="block fixed p-400" />}
        <div className="flex justify-between items-center xl:fixed xl:top-[125px] xl:flex-col xl:justify-start xl:items-start md:gap-[42px] xl:gap-0 px-200 md:px-500 xl:px-0">
          {navMenu.map((menuItem) => (
            <Link to={menuItem.slug} key={menuItem.label} className="flex-1 xl:flex-none" onClick={handleChangePage}>
              <NavItem active={menuItem.label == userCtx.page} item={menuItem} minimize={miniNav} />
            </Link>
          ))}
        </div>
        <div className="hidden xl:flex items-center gap-4 fixed bottom-[58px] px-400 cursor-pointer" onClick={handleMinimize}>
          {!miniNav && <img src={minMenuIcon} alt="Minimize menu icon" />}
          {miniNav && <img src={minMenuIcon} alt="Minimize menu icon" className="rotate-180" />}
          {!miniNav && <p className="text-preset3 text-p-grey300">Minimize Menu</p>}
        </div>
      </>
    </NavBarWrapper>
  )
}

export default NavBar;