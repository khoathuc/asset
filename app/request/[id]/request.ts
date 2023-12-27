import { getCurrentUser } from "@/lib/session";
import { getUser } from "@/lib/user";
import { requests } from "@prisma/client";

export async function approvable(request: requests, id: number | null = null) {
  var user = await getCurrentUser();
  if (id) {
    user = await getUser(id);
  }

  if (!request.approvers || !Array.isArray(request.approvers)) {
    return false;
  }
  if (!user) {
    return false;
  }

  return request.approvers.includes(user?.id);
}

export async function followable(request: requests, id: number | null = null) {
  var user = await getCurrentUser();
  if (id) {
    user = await getUser(id);
  }

  if (!request.followers || !Array.isArray(request.followers)) {
    return false;
  }
  if (!user) {
    return false;
  }

  return request.followers.includes(user?.id);
}

export async function viewable(request: requests, id: number | null = null) {
  var user = await getCurrentUser();

  if (user && parseInt(user.id) == request.user_id) {
    return true;
  }

  const is_followable = await followable(request, id);
  const is_approvable = await approvable(request, id);

  return is_followable || is_approvable;
}
