export default function Side({
    children,
    className,
}:{
    children: React.ReactNode,
    className?:string
}){
    return (
        <div className={`absolute flex flex-row gap-5 right-2 top-6 ${className}`}>
            {children}
        </div>
    )
}