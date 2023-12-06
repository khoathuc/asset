import { getServerSession } from "next-auth/next"

import { options } from "@/app/api/auth/[...nextauth]/options"

export async function getCurrentUser() {
  const session = await getServerSession(options);

  return session?.user;
}
