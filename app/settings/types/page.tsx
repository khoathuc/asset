import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from './@buttons/CreateButton'
import TypeBoard from "./@board/Board";

export default function Page() {
  return (
    <div className="flex h-full min-h-full flex-col">
      <PageHeader label="Asset Types" subLabel="Manage Asset Types">
        <Side>
          <SearchInput name="q" placeholder="Search Asset Types"></SearchInput>
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-12">
        <div className="flex w-1/2 bg-base-100 p-3">
          <TypeBoard></TypeBoard>
        </div>
      </div>
    </div>
  );
}
