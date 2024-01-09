import "@/styles/audit.css";
import PageHeader from "@/components/layout/PageHeader";
import { notFound } from "next/navigation";
import { getAllAudits, getAuditById } from "../actions";
import Side from "@/components/layout/Side";
import Link from "next/link";
import { OPEN_STATUS } from "../statuses";

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
      >
        {audit && (
          <Side>
            <div className="absolute right-12 top-[-18px] h-8 flex gap-2">
              <Link
                href={`/audits/${audit.id}/audit`}
                className="btn- btn h-full min-h-full bg-success normal-case text-white"
              >
                Close audit
              </Link>
              <Link
                href={`/audits/${audit.id}/audit`}
                className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
              >
                Audit
              </Link>
            </div>
          </Side>
        )}
      </PageHeader>
      {children}
    </div>
  );
}
