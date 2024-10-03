type navMenuItem = {
  label: string,
  icon: string,
  activeIcon: string,
  alt: string,
  slug: string
}

const NavItem = (props: {type: boolean, item: navMenuItem, size: string}) => {

  const typeStyle: {[key: string]: string} = {
    true: "text-p-grey900 bg-p-beige100 rounded-t-xl border-b-4 border-b-s-green xl:rounded-tl-none xl:border-b-0 xl:rounded-r-xl xl:border-l-4 xl:border-l-s-green",
    false: "text-p-grey300 border-b-4 border-b-transparent xl:border-b-0 xl:border-l-4 xl:border-l-transparent cursor-pointer"
  }

  return (
    <>
    {props.size == "default" ?
      <div className={`${typeStyle[(props.type).toString()]} flex flex-col xl:flex-row xl:gap-4 flex-1 xl:flex-none items-center xl:w-[276px] xl:h-[56px] py-100 xl:py-0 xl:pl-8`}>
        {!props.type && <img src={props.item.icon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
        {props.type && <img src={props.item.activeIcon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
        <p className="hidden md:block text-preset5 xl:text-preset3 font-bold mt-1">{props.item.label}</p>
      </div>
    :
      <div className={`${typeStyle[(props.type).toString()]} flex flex-row justify-center gap-4 items-center w-[76px] h-[56px]`}>
        {!props.type && <img src={props.item.icon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
        {props.type && <img src={props.item.activeIcon} alt={props.item.alt} className="h-6 w-6 object-cover p-[3px]" />}
      </div>
    }
    </>
  )
}

export default NavItem;