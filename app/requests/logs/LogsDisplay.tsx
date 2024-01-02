import Empty from "./Empty";
import DisplaySection from "@/components/layout/DisplaySection";
import { request_logs } from "@prisma/client";
import Item from "./Item";

export default function LogsDisplay({ logs }: { logs: request_logs[] }) {
  var html;
  if (logs && logs.length == 0) {
    html = <Empty />;
  } else {
    html = logs.map((log: request_logs) => {
      return <Item log={log} />;
    });
  }

  return (
    <DisplaySection label="Logs" className="px-6 py-4">
      <div className="flex flex-col">{html}</div>
    </DisplaySection>
  );
}
