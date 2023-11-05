export default function Sidebar() {
  return (
    <div className="flex w-1/3 flex-col gap-2">
      <div className="text-xl">About status labels</div>
      <div className="flex flex-col gap-4 text-xs">
        <div className="border-4 border-t-success bg-base-100 p-2">
          <span>
            <div className="badge badge-success badge-xs mr-1"></div>
            <b>Deployable:&nbsp;</b>
          </span>
          <span>
            These assets can be checked out. Once they are assigned, they will
            assume a meta status of <b>Deployed</b>
          </span>
        </div>
        <div className="border-4 border-t-warning bg-base-100 p-2">
          <span>
            <div className="badge badge-warning badge-xs mr-1"></div>
            <b>Pending:&nbsp;</b>
          </span>
          <span>
            These assets can not yet be assigned to anyone, often used for items
            that are out for repair, but are expected to return to circulation.
          </span>
        </div>
        <div className="border-4 border-t-error bg-base-100 p-2">
          <span>
            <div className="badge badge-error badge-xs mr-1"></div>

            <b>Undeployable:&nbsp;</b>
          </span>
          <span>These assets cannot be assigned to anyone.</span>
        </div>
        <div className="border-4 border-t-error bg-base-100 p-2">
          <span>
            <div className="badge badge-error badge-xs mr-1"></div>

            <b>Archived:&nbsp;</b>
          </span>
          <span>
            These assets cannot be checked out, and will only show up in the
            Archived view. This is useful for retaining information about assets
            for budgeting/historic purposes but keeping them out of the
            day-to-day asset list.
          </span>
        </div>
      </div>
    </div>
  );
}
