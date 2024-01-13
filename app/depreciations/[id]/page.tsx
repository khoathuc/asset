import { notFound } from "next/navigation";
import { getAllDepreciations, getDepreciationById, getDepreciationRecords } from "../actions";
import PageBody from "@/components/layout/PageBody";
import Empty from "./empty";
import { DepreciationRecordBoard } from "./depreciation_records/@board/Board";

export async function generateStaticParams() {
  const depreciations = await getAllDepreciations();

  return depreciations.map((depreciation) => ({
    id: depreciation.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const depreciation = await getDepreciationById(parseInt(params.id));
  if (!depreciation) {
    return notFound();
  }

  const depreciation_records = await getDepreciationRecords(depreciation);
  console.log(depreciation_records)
  var html = <Empty />
  if(depreciation_records && depreciation_records.length > 0){
    html = <DepreciationRecordBoard depreciation_records={depreciation_records}/>
  }

  return (
    <PageBody compact scroll-y className="bg-base-200">
      <div className="absolute inset-0 flex bg-base-200">
        <div className="depreciation-display flex flex-col flex-1 items-center pb-16">
          {html}
        </div>
      </div>
    </PageBody>
  );
}
