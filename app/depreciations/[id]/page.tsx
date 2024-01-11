import { notFound } from "next/navigation";
import { getAllDepreciations, getDepreciationById, getDepreciationRecords } from "../actions";
import PageBody from "@/components/layout/PageBody";

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

  const depreciation_logs = await getDepreciationRecords(depreciation);

  return (
    <PageBody compact scroll-y className="bg-base-200">
      <div className="absolute inset-0 flex px-10 pt-16 bg-base-200">
        <div className="depreciation-display flex flex-col flex-1 items-center gap-10 px-10 py-5 pb-32">
        </div>
      </div>
    </PageBody>
  );
}
