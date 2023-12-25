import { getAllRequests, getRequestById } from "@/app/requests/actions";
import PageBody from "@/components/layout/PageBody";
import { notFound } from "next/navigation";
import RequestDisplay from "../@comps/RequestDisplay";

export async function generateStaticParams(){
    const requests = await getAllRequests();

    return requests.map((request)=>({
        id: request.id.toString()
    }))
}

export default async function Page({params}: {params: {id: string}}){
    const request = await getRequestById(parseInt(params.id));
    if(!request){
        return notFound();
    }


    return (
        <PageBody
            compact
            scroll-y
            className="bg-base-200"
        >
            <div className="request-display flex flex-col items-center justify-center gap-10 px-10 py-5 pb-32">
                <RequestDisplay request={request}/>
            </div>
        </PageBody>
    )
}