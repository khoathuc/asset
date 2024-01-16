import { notFound } from "next/navigation";
import {
  getAllDepreciations,
  getDepreciationById,
  getDepreciationRecords,
} from "../actions";
import PageBody from "@/components/layout/PageBody";
import Empty from "./empty";
import { DepreciationRecordBoard } from "./depreciation_records/@board/Board";

import PageHeader from "@/components/layout/PageHeader";
import Side from "@/components/layout/Side";
import FilterButton from "../@buttons/FilterButton";
import ExportButton from "../@buttons/ExportButton";

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
  var html = <Empty />;
  if (depreciation_records && depreciation_records.length > 0) {
    html = (
      <DepreciationRecordBoard depreciation_records={depreciation_records} />
    );
  }

  return (
    <>
      <PageHeader
        backUrl="/depreciations"
        label={`View depreciation ${depreciation?.name}`}
        compact
        className="depreciation-display-header text-sm font-medium"
      >
        <Side className="!top-2">
          <div className="h-8">
            <FilterButton />
          </div>
          <div className="h-8">
            <ExportButton depreciation_records={depreciation_records} name={`sheet1`}/>
          </div>
        </Side>
      </PageHeader>
      <PageBody compact scroll-y className="bg-base-200">
        <div className="absolute inset-0 flex bg-base-200">
          <div className="depreciation-display flex flex-1 flex-col items-center pb-16">
            {html}
          </div>
        </div>
      </PageBody>
    </>
  );
}
