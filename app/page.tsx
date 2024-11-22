import PageHeader from "@/components/layout/PageHeader";
import { getMyAssets } from "./assets/actions";
import Side from "@/components/layout/Side";
import SearchInput from "@/components/layout/SearchInput";
import FilterButton from "./assets/@buttons/FilterButton";
import PageBody from "@/components/layout/PageBody";
import Empty from "./empty";
import AssetBoard from "./assets/@board/Board";

export default async function Home() {
  const assets = await getMyAssets();
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
            <FilterButton />
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
