'use server'
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { Audit } from "@/models/audit/audit";
import { revalidatePath } from "next/cache";
import { OPEN_STATUS } from "./statuses";

export async function getAllAudits(query: string | null = null) {
  return await Audit.loader().all(query);
}

export async function addAudit(formData: FormData) {
  const data = await Audit.reader(formData).read();

  const user = await getCurrentUser();

  const audit = await prisma.audits.create({
    data: {
      user_id: user ? user.id : 0,
      name: data.name,
      locations: data.locations,
      auditors: data.auditors,
      followers: data.followers,
      files: data.file_url,
      start_date: data.start_date,
      end_date: data.end_date,
      status: OPEN_STATUS,
      description: data.description,
    },
  });

  revalidatePath("/audits");
}
