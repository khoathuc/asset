import { notFound } from "next/navigation";
import { getAllAudits, getAuditById } from "../actions";
import { viewable } from "./audit";
import { getAuditLogs } from "../logs/actions";
import PageBody from "@/components/layout/PageBody";
import AuditDisplay from "../@display/AuditDisplay";
import AuditSideBar from "../@display/AuditSidebar";

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

  return (
    <PageBody compact scroll-y className="bg-base-200">
      <div className="absolute inset-0 flex px-10 bg-base-200">
        <div className="audit-display flex flex-col flex-1 items-center justify-center gap-10 px-10 py-5 pb-32">
          <AuditDisplay audit={audit} />
          {/* <AuditAssetLog audit_logs={audit_logs} /> */}
        </div>
        <div className="w-[30%] pt-16 h-fit">
          <AuditSideBar audit={audit} />
        </div>
      </div>
    </PageBody>
  );
}
