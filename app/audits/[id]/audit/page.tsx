import { notFound } from "next/navigation";
import { getAllAudits, getAuditById } from "../../actions";
import { viewable } from "../audit";
import { getAuditLogs } from "../../logs/actions";

export async function generateStaticParams() {
  const audits = await getAllAudits();

  return audits.map((audit) => ({
    id: audit.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const audit = await getAuditById(parseInt(params.id));
    if (!audit) {
      return notFound();
    }
  
    if (!(await viewable(audit))) {
      return notFound();
    }

    const audit_logs = await getAuditLogs(audit);
}
