import PageHeader from "@/components/layout/PageHeader";
import Side from "@/components/layout/Side";
import CreateButton from "./@comps/CreateButton";
import Sidebar from "./@comps/Sidebar";
import StatusBoard from "./@comps/Board";

export default function Page() {
  return (
    <div>
      <PageHeader label="Statuses" subLabel="Manage Asset Status">
        <Side>
          <div className="h-8">
            <CreateButton></CreateButton>
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-12">
        <div className="flex w-11/12 justify-between p-3">
          <div className="bg-base-100">
            <StatusBoard></StatusBoard>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
