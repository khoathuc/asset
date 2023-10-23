import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from "@/components/locations/CreateButton";
import LocationBoard from "./board";

export default function Page() {
  return (
    <div className="flex flex-col h-full min-h-full">
      <PageHeader label="Locations" subLabel="Manage location">
        <Side>
          <SearchInput name="q" placeholder="Search locations"></SearchInput>
          <div className="h-8">
            <CreateButton></CreateButton>
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pt-12 pb-12">
        <div className="flex w-11/12 bg-base-100 p-3">
          <LocationBoard></LocationBoard>
        </div>
      </div>
    </div>
  );
}
