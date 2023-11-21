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
    }
    
    return (
      <div className={`page-body absolute top-20 bottom-0 right-0 left-56 ${addClass}`}>
        <div className={`page-body-wrapper h-full ${className?className:''}`}>
          <div className='page-body-main overflow-y-auto'>
            {children}
          </div>
          <div className='side-wrapper overflow-y-auto'>
            {side && side}
          </div>
        </div>
      </div>
    );
  }
  