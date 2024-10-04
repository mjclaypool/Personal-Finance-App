import { JSX } from "react";

const NavBarWrapper = (props: {minimize: boolean, children: JSX.Element}) => {
  const typeStyle: {[key: string]: string} = {
    true: "hidden xl:flex w-[88px]",
    false: "sticky bottom-0 rounded-t-xl xl:w-[300px]"
  }
  return (
    <div className={`${typeStyle[(props.minimize.toString())]} xl:relative font-pubSans bg-p-grey900 pt-100 xl:min-h-[100vh] xl:rounded-l-none xl:rounded-r-xl`}>
      {props.children}
    </div>
  )
}

export default NavBarWrapper;