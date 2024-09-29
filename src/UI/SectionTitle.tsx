const SectionTitle = (props: {title: string, size: string, theme?: string}) => {
  const colorVariants: {[key: string]: string} = {
    "#277C78": "bg-s-green",
    "#F2CDAC": "bg-s-yellow",
    "#82C9D7": "bg-s-cyan",
    "#626070": "bg-s-navy",
    "#C94736": "bg-s-red",
    "#826CB0": "bg-s-purple"
  }

  const sizeVariants: {[key: string]: string} = {
    lg: "text-preset2",
    md: "text-preset3"
  }

  return (
    <div className="flex items-center gap-4">
      {props.theme && <div className={`${colorVariants[props.theme]} h-4 w-4 rounded-full`}/>}
      <h2 className={`${sizeVariants[props.size]} text-p-grey900`}>{props.title}</h2>
    </div>
  )
}

export default SectionTitle;