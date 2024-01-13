import EmptyImg from "@/public/empty.svg";

export default function Empty(){
    return (
        <div className="flex flex-col">
            <EmptyImg className='h-72' />
            <div className="h-8 flex gap-5 items-center justify-center">
                <div className="text-md font-bold">No Assets Found</div>
            </div>
        </div>
    )
}