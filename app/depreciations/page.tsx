import PageBody from "@/components/layout/PageBody";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import Empty from "./empty";
import { getAllDepreciations } from "./actions";
import CreateButton from "./@buttons/CreateButton";

export default async function Page() {
  const depreciations = await getAllDepreciations();

  var html = <Empty />;
  if (depreciations && depreciations.length > 0) {
    // html = <DepreciationBoard depreciations={depreciations}/>
  }

  return (
    <>
      <PageHeader label="Depreciations" subLabel="View depreciations">
        <Side>
          <SearchInput name="q" placeholder="Search Depreciations" />
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
