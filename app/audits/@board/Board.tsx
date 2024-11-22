import { audits } from "@prisma/client";
import { AuditItem } from "./Item";

export default function AuditBoard({ audits }: { audits: audits[] }) {
  return (
    <>
      <div className="w-full bg-base-100">
        <div className="h-full overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Audit</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Assets</th>
                <th>Auditors</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit, index) => {
                return (
                  <AuditItem
                    key={audit.id}
                    index={index}
                    audit={audit}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
