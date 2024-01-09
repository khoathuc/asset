import { notFound } from "next/navigation";
import { getAllAudits, getAuditById } from "../../actions";
import { viewable } from "../audit";
import { getAuditLogs } from "../../logs/actions";
import PageBody from "@/components/layout/PageBody";
import AuditSideBar from "../../@display/AuditSidebar";
import AuditAssetBoard from "./audit_asset_log/@board/AuditAssetBoard";
import DisplaySection from "@/components/layout/DisplaySection";

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
  const audit_asset_logs = audit_logs.filter((audit_log)=>{
    return audit_log.metatype == 'asset';
  })

  return (
    <PageBody compact scroll-y className="bg-base-200">
      <div className="absolute inset-0 flex bg-base-200 px-10 pt-16">
        <div className="audit-display flex flex-1 flex-col items-center gap-10 px-10 pb-32">
        <DisplaySection label="Asset auditing" className="relative px-6 py-4 !w-11/12">
            <AuditAssetBoard audit={audit} audit_asset_logs={audit_asset_logs}/>
          </DisplaySection>
        </div>
        <div className="h-fit w-[30%]">
          <AuditSideBar audit={audit} />
        </div>
      </div>
    </PageBody>
  );
}
