import SearchInput from "@/components/layout/SearchInput";
import Empty from "../users/empty";
import PageHeader from "@/components/layout/PageHeader";
import Side from "@/components/layout/Side";
import PageBody from "@/components/layout/PageBody";
import { getAllUsers } from "./actions";
import UserBoard from "./@comps/UserBoard";
import CreateButton from "./@comps/CreateButton";

export default async function Page() {
  const users = await getAllUsers();

  var html = <Empty />;
  if (users && users.length > 0) {
    html = <UserBoard users={users} />;
  }

  return (
    <>
      <PageHeader label="Users" subLabel="Manage users in system">
        <Side>
          <SearchInput name="q" placeholder="Search User" />
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
