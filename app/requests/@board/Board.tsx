import { requests } from "@prisma/client";
import { RequestItem } from "./RequestItem";

export default function RequestBoard({ requests }: { requests: requests[] }) {
  return (
    <>
      <div className="w-full bg-base-100">
        <div className="h-full overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Request</th>
                <th>Creator</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Approvers</th>
                <th>Followers</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {requests.map((request, index)=>{
                    return <RequestItem key={request.id} index={index} request={request} />
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
