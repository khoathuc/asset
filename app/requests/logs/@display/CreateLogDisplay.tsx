import { getUser } from "@/lib/user";
import { request_logs } from "@prisma/client";

export default function CreateLogDisplay({log}:{log: request_logs}){
    const user = getUser(log.user_id);
    return (<div className="request-log-create">
        <div className="flex flex-col bg-base-200 p-4">
            <span className="text-md font-semibold">Create</span> 
            <span className="text-sm font-light">
              Implemented by {user?.username} at{" "}
              {log.since.toLocaleDateString()}
            </span>           
        </div>

        <div className="flex flex-col p-4">
            <span className="text-md font-semibold">Note</span>
            <span>{log.note || 'No description'}</span>
        </div>
    </div>)
}