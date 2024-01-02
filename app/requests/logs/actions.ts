"use server"

import prisma from "@/lib/db/prisma";

export async function getRequestLogs(id: number) {
    return await prisma.request_logs.findMany({
      orderBy: { id: "desc" },
      where: {
        request_id: {
          equals: id,
        },
      },
    });
  }