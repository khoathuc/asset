import "@/styles/depreciation.css";
import { notFound } from "next/navigation";
import {getAllDepreciations, getDepreciationById } from "../actions";

export async function generateStaticParams() {
  const depreciations = await getAllDepreciations();

  return depreciations.map((depreciation) => ({
    id: depreciation.id.toString(),
  }));
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const depreciation = await getDepreciationById(parseInt(params.id));
  if (!depreciation) {
    return notFound();
  }

  return (
    <div className="depreciation-display-page absolute inset-0">
      {children}
    </div>
  );
}
