import { getOption } from "@/app/settings/statuses/type/type";

export default function StatusType({ status }: { status: string }) {
  const statusDetail = getOption(status);
  if (!statusDetail) {
    return;
  }

  switch (statusDetail.code) {
    case "DEPLOYABLE":
      return (
        <div>
          <div className="badge badge-success badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "PENDING":
      return (
        <div>
          <div className="badge badge-warning badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "UNDEPLOYABLE":
      return (
        <div>
          <div className="badge badge-error badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "ARCHIVED":
      return (
        <div>
          <div className="badge badge-error badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    default:
      return;
  }
}
