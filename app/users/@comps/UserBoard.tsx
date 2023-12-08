import { users } from "@prisma/client";
import UserItem from "./UserItem";

export default function UserBoard({ users }: { users: users[] }) {
  return (
    <div className="w-full bg-base-100">
      <div className="h-full overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox checkbox-xs" />
                </label>
              </th>
              <th>Name</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Job</th>
              <th>Role</th>
              <th>Address</th>
              <th>City</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
