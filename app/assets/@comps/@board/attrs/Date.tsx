export function Date({date}:{date: Date}){
    return (
        <>
            <div>{date.toLocaleDateString()}</div>    
        </>
    )
}