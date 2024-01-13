export default function PageBody({
  children,
  side,
  className,
  ...props
}: {
  children?: React.ReactNode;
  side?: React.ReactNode;
  className?: String;
  props?: any;
}) {
  var addClass = "";
  if (props.hasOwnProperty("compact")) {
    addClass += " compact";
  }

  if (side) {
    addClass += " -with-side";
    if (props.hasOwnProperty("side_30")) {
      addClass += " side_30";
    }
    if (props.hasOwnProperty("side_20")) {
      addClass += " side_20";
    }
  }

  if (props.hasOwnProperty("no-header")) {
    addClass += " top-0";
  }else{
    addClass += " top-20"
  }

  var subClass = "";
  if (props.hasOwnProperty("scroll-y")) {
    subClass += " overflow-y-auto";
  }

  return (
    <div className={`page-body absolute inset-0 ${addClass}`}>
      <div className={`page-body-wrapper h-full ${className ? className : ""}`}>
        <div className={`page-body-main ${subClass}`}>{children}</div>
        {side && (
          <div className="side-wrapper h-full w-full bg-base-100">{side}</div>
        )}
      </div>
    </div>
  );
}
