'use client'
import Filter from '@/public/funnel2.svg'
export default function FilterButton(){
    return (
        <>
            <button
                className="btn- btn h-full min-h-full normal-case"
            >
                <Filter className='h-4 w-4'/>
                Filter
            </button>
        </>
    )
}