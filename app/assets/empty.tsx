import EmptyImg from "@/public/empty.svg";
import CreateButton from "./@comps/CreateButton";

export default function Empty(){
    return (
        <>
            <EmptyImg className='h-72' />
            <div className="h-8 flex gap-5 items-center">
                <div className="text-md font-bold">No Assets Found</div>
                <CreateButton/>
            </div>
        </>
    )
}