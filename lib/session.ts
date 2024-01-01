import { getServerSession } from "next-auth/next"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { User } from "@/models/user/user";

export async function getCurrentUser() {
  const session = await getServerSession(options);
  const user_id = session?.user.id;
  if(!user_id){
    return null;
  }

  const user = await User.loader().getById(parseInt(user_id));
  return user;
}
