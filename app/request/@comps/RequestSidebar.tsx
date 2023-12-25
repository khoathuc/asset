import "@/styles/request.sidebar.css";
import UserInfo from "@/components/ui/user/UserInfo";
import { requests, users } from "@prisma/client";

function getStatus(request: requests, approver_id: any) {
  var status = { label: "Pending", color: `bg-warning` };
  if (request.approvals && Array.isArray(request.approvals)) {
    if (request.approvals.includes(approver_id)) {
      status = { label: "Approved", color: `bg-success` };
    }
  } else if (request.rejections && Array.isArray(request.rejections)) {
    if (request.rejections.includes(approver_id)) {
      status = { label: "Rejected", color: `bg-error` };
    }
  }

  return status
}
function RequestApprovers({ request }: { request: requests }) {
  if (!request.approvers) {
    return <></>;
  }

  const approvers = request.approvers;
  if (Array.isArray(approvers)) {
    return approvers.map((approver_id: any) => {
      const status = getStatus(request, approver_id);
      return (
        <div className="request-sidebar-user">
          <UserInfo user_id={approver_id} />
          <div
            className="approval-status tooltip absolute flex h-3 w-3"
            data-tip={`${status.label}`}
          >
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75 ${status.color}`}
            ></span>
            <span
              className={`relative inline-flex h-3 w-3 rounded-full bg-warning ${status.color}`}
            ></span>
          </div>
        </div>
      );
    });
  }
}

function RequestFollowers({ request }: { request: requests }) {
  if (!request.followers) {
    return <></>;
  }

  const followers = request.followers;
  if (Array.isArray(followers)) {
    return followers.map((follower_id: any) => {
      return (
        <div className="request-sidebar-user">
          <UserInfo user_id={follower_id} />
        </div>
      );
    });
  }
}

export default function RequestSidebar({ request }: { request: requests }) {
  return (
    <div className="request-sidebar flex flex-col justify-start">
      <div className="flex flex-col border-b-2 px-4 pb-4">
        <span className="uppercase">Approvers</span>
        <RequestApprovers request={request} />
      </div>
      <div className="flex flex-col border-b-2 px-4 py-4">
        <span className="uppercase">Followers</span>
        <RequestFollowers request={request} />
      </div>
    </div>
  );
}
