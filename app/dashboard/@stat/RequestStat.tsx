import { APPROVED_STATUS, REJECTED_STATUS } from "@/app/requests/statuses";
import { Request } from "@/models/request/request";
import Link from "next/link";
import RequestIcon from "@/public/document_text.svg";

export default async function RequestStat() {
  const request_stat = await Request.stat().all();
  const request_status_stat = await Request.stat().groupByStatus();

  const approved_request_count = request_status_stat.find((st) => {
    return st.status == APPROVED_STATUS;
  });

  const rejected_request_count = request_status_stat.find((st) => {
    return st.status == REJECTED_STATUS;
  });

  return (
    <div className="stat">
      <div className="stat-figure text-neutral">
        <RequestIcon className="h-8 w-8" />
      </div>
      <div className="stat-title">Total Requests</div>
      <div className="stat-value">{request_stat}</div>
      <div className="stat-desc">
        {approved_request_count?._count.status.toString()} approved &
        {rejected_request_count?._count.status.toString()} rejected
      </div>
      <Link
        href={"/requests"}
        className="link-hover stat-desc flex justify-start"
      >
        View all
      </Link>
    </div>
  );
}
