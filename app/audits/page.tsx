import PageHeader from "@/components/layout/PageHeader";
import Empty from "./empty";
import FilterButton from "./@buttons/FilterButton";
import Side from "@/components/layout/Side";
import SearchInput from "@/components/layout/SearchInput";
import CreateButton from "./@buttons/CreateButton";
import { getAllAudits } from "./actions";
import AuditBoard from "./@board/Board";
import PageBody from "@/components/layout/PageBody";

export default async function Page() {
  const audits = await getAllAudits();

  var html = <Empty />;
  if (audits && audits.length > 0) {
    html = <AuditBoard audits={audits} />;
  }

  return (
    <>
      <PageHeader label="Audits" subLabel="View audits">
        <Side>
          <SearchInput name="q" placeholder="Search Audits" />
          <div>
            <FilterButton></FilterButton>
          </div>
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>

      <PageBody>
        <div className="flex h-full w-full flex-1 justify-center overflow-auto">
          {html}
        </div>
      </PageBody>
    </>
  );
}
