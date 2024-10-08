import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import CreateButton from "./@buttons/CreateButton";
import Side from "@/components/layout/Side";
import VendorBoard from "./@board/Board";

export default function Page() {
  return (
    <div className="flex h-full min-h-full flex-col">
      <PageHeader label="Vendors" subLabel="Manage Vendors">
        <Side>
          <SearchInput name="q" placeholder="Search Vendors"></SearchInput>
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-12">
        <div className="flex w-11/12 bg-base-100 p-3">
          <VendorBoard></VendorBoard>
        </div>
      </div>
    </div>
  );
}
