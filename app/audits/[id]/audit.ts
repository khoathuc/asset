import { getCurrentUser } from "@/lib/session";
import { audits } from "@prisma/client";

export async function viewable(audit: audits, user_id: number | null = null) {
    var user = await getCurrentUser();
  
    if (user && user.id == audit.user_id) {
      return true;
    }
  
    return true;
  }
  