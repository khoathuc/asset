import PageBody from "@/components/layout/PageBody";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import Empty from "./empty";
import FilterButton from "./@comps/FilterButton";
import { getAllRequests } from "./actions";
import CreateButton from "./@comps/CreateButton";
import RequestBoard from "./@comps/@board/Board";

export default async function Page(){
    const requests = await getAllRequests();

    var html = <Empty />;
    if(requests && requests.length > 0){
        html = <RequestBoard requests={requests}/>;
    }

    return (
        <>
            <PageHeader
                label="Requests"
                subLabel="View Requests"
            >
                <Side>
                    <SearchInput name="q" placeholder="Search Requests"/>
                    <div className="h-8">
                        <FilterButton />
                    </div>
                    <div className="h-8">
                        <CreateButton />
                    </div>
                </Side>
            </PageHeader>

            <PageBody>
                <div className="flex h-full w-full flex-1 justify-center overflow-auto">
                    {html}
                </div>
            </PageBody>
        </>
    )
}