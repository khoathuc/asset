export default function PageBody({
    children,
    side,
    className,
    ...props
  }: {
    children?: React.ReactNode;
    side?:React.ReactNode;
    className?: String;
    props:any
  }) {
    
    var addClass='';
    if(props.hasOwnProperty('compact')){
      addClass+=' compact'
    }

    if(side){
      addClass+=' -with-side'
      if(props.hasOwnProperty('side_30')){
        addClass+=' side_30'
      }
      if(props.hasOwnProperty('side_20')){
        addClass+=' side_20'
      }

    }
    
    return (
      <div className={`page-body absolute top-20 bottom-0 right-0 left-56 ${addClass}`}>
        <div className={`page-body-wrapper h-full ${className?className:''}`}>
          <div className='page-body-main overflow-y-auto'>
            {children}
          </div>
          <div className='side-wrapper overflow-y-auto bg-base-100 h-full w-full'>
            {side && side}
          </div>
        </div>
      </div>
    );
  }
  