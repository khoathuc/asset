import { z } from "zod";

export const requestTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  default_approvers: z.string(),
  approval_follow: z.string(),
  allow_change_approvers: z.boolean()
});
