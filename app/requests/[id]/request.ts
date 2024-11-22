'use server'
import { getCurrentUser } from "@/lib/session";
import { User } from "@/models/user/user";
import { requests } from "@prisma/client";


export async function approved(request: requests, user_id: number|null = null){
  if (user_id) {
    var user = await User.loader().getById(user_id);
  }else{
    user = await getCurrentUser();
  }

  if (!user) {
    return false;
  }

  if(request.approvals && Array.isArray(request.approvals)){
    if(request.approvals.includes(user?.id)){
      return true;
    }
  }

  return false;
}

export async function rejected(request: requests, user_id: number|null = null){
  if (user_id) {
    var user = await User.loader().getById(user_id);
  }else{
    user = await getCurrentUser();
  }

  if (!user) {
    return false;
  }

  if(request.rejections && Array.isArray(request.rejections)){
    if(request.rejections.includes(user?.id)){
      return true;
    }
  }

  return false;
}

export async function approvable(request: requests, user_id: number | null = null) {
  if (user_id) {
    var user = await User.loader().getById(user_id);
  }else{
    user = await getCurrentUser();
  }

  if (!user) {
    return false;
  }

  if(await approved(request, user.id) || await rejected(request, user.id)){
    return false;
  }

  if (!request.approvers || !Array.isArray(request.approvers)) {
    return false;
  }

  return request.approvers.includes(user?.id);
}

export async function followable(request: requests, user_id: number | null = null) {
  if (user_id) {
    var user = await User.loader().getById(user_id);
  }else{
    user = await getCurrentUser();
  }

  if (!request.followers || !Array.isArray(request.followers)) {
    return false;
  }
  if (!user) {
    return false;
  }

  return request.followers.includes(user?.id);
}

export async function viewable(request: requests, user_id: number | null = null) {
  var user = await getCurrentUser();

  if (user && user.id == request.user_id) {
    return true;
  }

  const is_followable = await followable(request, user_id);
  const is_approvable = await approvable(request, user_id);
  const is_approved = await approved(request, user_id);
  const is_rejected = await rejected(request, user_id);

  return is_followable || is_approvable || is_approved || is_rejected;
}
