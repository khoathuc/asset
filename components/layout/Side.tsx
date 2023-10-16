export default function Side({
    children
}:{
    children: React.ReactNode,
}){
    return (
        <div className='absolute flex flex-row gap-5 right-2 top-6'>
            {children}
        </div>
    )
}