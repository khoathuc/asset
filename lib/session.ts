import { getServerSession } from "next-auth/next"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { getUserById } from "@/app/users/actions";

export async function getCurrentUser() {
  const session = await getServerSession(options);
  const user_id = session?.user.id;
  if(!user_id){
    return null;
  }

  const user = await getUserById(parseInt(user_id));
  return user;
}
