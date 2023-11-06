import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from "./@comps/CreateButton";
import { TagBoard } from "./@comps/Board";

export default function Page() {
  return (
    <div className="flex h-full min-h-full flex-col">
      <PageHeader label="Tags" subLabel="Manage Tags">
        <Side>
          <SearchInput name="q" placeholder="Search Tags" />
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-12">
        <div className="flex w-1/2 bg-base-100 p-3">
          <TagBoard></TagBoard>
        </div>
      </div>
    </div>
  );
}
