import "@/styles/audit.css";
import PageHeader from "@/components/layout/PageHeader";
import { notFound } from "next/navigation";
import { getAllAudits, getAuditById } from "../actions";

export async function generateStaticParams() {
  const audits = await getAllAudits();

  return audits.map((audit) => ({
    id: audit.id.toString(),
  }));
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const audit = await getAuditById(parseInt(params.id));
  if (!audit) {
    return notFound();
  }

  return (
    <div className="audit-display-page absolute inset-0">
      <PageHeader
        backUrl="/audits"
        label={`View audit ${audit?.name}`}
        compact
        className="audit-display-header text-sm font-medium"
      ></PageHeader>
      {children}
    </div>
  );
}
