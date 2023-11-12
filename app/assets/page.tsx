import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from "./@comps/CreateButton";
import AssetBoard from "./@comps/Board";

export default function Page() {
  return (
    <div>
      <PageHeader label="Assets" subLabel="Acquire, operate, maintain, and dispose of assets">
        <Side>
          <SearchInput name="q" placeholder="Search Asset"></SearchInput>
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>
      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-3">
            <AssetBoard/>
      </div>
    </div>
  );
}
