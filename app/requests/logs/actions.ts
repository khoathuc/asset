"use server"

import prisma from "@/lib/db/prisma";
import { requests } from "@prisma/client";
import { Request } from "@/models/request/request";

export async function getRequestLogs(request: requests) {
    return await Request.loader().getLog(request.id);
  }