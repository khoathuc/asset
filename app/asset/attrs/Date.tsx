export function Date({date}:{date: Date}){
    return (
        <>
            <div className='-date'>{date.toLocaleDateString()}</div>    
        </>
    )
}