import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from "./@comps/CreateButton";
import AssetBoard from "./@comps/@board/Board";
import { getAllAssets } from "./actions";
import PageBody from "@/components/layout/PageBody";
import Empty from "./empty";
import FilterButton from "./@comps/FilterButton";

export default async function Page() {
  const assets = await getAllAssets();

  var html = <Empty />;
  if (assets && assets.length > 0) {
    html = <AssetBoard assets={assets} />;
  }

  return (
    <>
      <PageHeader
        label="Assets"
        subLabel="Acquire, operate, maintain, and dispose of assets"
      >
        <Side>
          <SearchInput name="q" placeholder="Search Asset"></SearchInput>
          <div className="h-8">
            <FilterButton/>
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
