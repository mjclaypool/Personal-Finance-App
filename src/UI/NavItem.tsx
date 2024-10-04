type navMenuItem = {
  label: string,
  icon: string,
  activeIcon: string,
  alt: string,
  slug: string
}

const NavItem = (props: {active: boolean, item: navMenuItem, minimize: boolean}) => {

  const activeStyle: {[key: string]: string} = {
    true: "text-p-grey900 bg-p-beige100 rounded-t-xl border-b-4 border-b-s-green xl:rounded-tl-none xl:border-b-0 xl:rounded-r-xl xl:border-l-4 xl:border-l-s-green",
    false: "text-p-grey300 border-b-4 border-b-transparent xl:border-b-0 xl:border-l-4 xl:border-l-transparent cursor-pointer"
  }

  const miniStyle: {[key: string]: string} = {
    true: "justify-center w-[76px] h-[56px]",
    false: "flex-col flex-1 xl:flex-none xl:w-[276px] xl:h-[56px] py-100 xl:py-0 xl:pl-8"
  }

  return (
    <div className={`${activeStyle[props.active.toString()]} flex xl:flex-row xl:gap-4 items-center ${miniStyle[props.minimize.toString()]}`}>
      {!props.active && <img src={props.item.icon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
      {props.active && <img src={props.item.activeIcon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
      {!props.minimize && <p className="hidden md:block text-preset5 xl:text-preset3 font-bold mt-1">{props.item.label}</p>}
    </div>
  )
}

export default NavItem;