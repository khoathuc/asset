import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import ActionBoard from "./@board/Board";
import { getAllActions } from "./action";
import Empty from "./empty";
import CreateButton from "./@buttons/CreateButton";

export default async function Page() {
  const actions = await getAllActions();

  var html = <Empty />;
  if (actions && actions.length > 0) {
    html = (
      <div className="flex w-8/12 bg-base-100 p-3">
        <ActionBoard actions={actions} />
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-full flex-col">
      <PageHeader label="Actions" subLabel="Manage actions">
        <Side>
          <SearchInput name="q" placeholder="Search actions"></SearchInput>
          <div className="h-8">
            <CreateButton />
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-8">
        {html}
      </div>
    </div>
  );
}
