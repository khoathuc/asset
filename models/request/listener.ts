import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { asset_logs, assets, requests } from "@prisma/client";

export class Listener {
  private request?: requests;

  constructor(request: requests) {
    this.request = request;
  }

  async create() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid request creator");
    }
    if (!this.request) {
      throw new Error("Invalid request");
    }

    await prisma.request_logs.create({
      data: {
        user_id: user.id,
        request_id: this.request?.id,
        object_export: { id: this.request?.id, name: this.request.name },
        object_id: this.request?.id,
        object_type: "request",
        note: `${user.username} has created this request`,
        metatype: "create",
      },
    });
  }

  async approve() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid request creator");
    }
    if (!this.request) {
      throw new Error("Invalid request");
    }

    await prisma.request_logs.create({
      data: {
        user_id: user.id,
        request_id: this.request?.id,
        object_export: { id: this.request?.id, name: this.request.name },
        object_id: this.request?.id,
        object_type: "request",
        note: `${user.username} has approved this request`,
        metatype: "approve",
      },
    });
  }

  async reject() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid request creator");
    }
    if (!this.request) {
      throw new Error("Invalid request");
    }

    await prisma.request_logs.create({
      data: {
        user_id: user.id,
        request_id: this.request?.id,
        object_export: { id: this.request?.id, name: this.request.name },
        object_id: this.request?.id,
        object_type: "request",
        note: `${user.username} has rejected this request`,
        metatype: "reject",
      },
    });
  }

  async onCreateAsset(asset: assets, ref: asset_logs|null = null) {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid request creator");
    }
    if (!this.request) {
      throw new Error("Invalid request");
    }

    await prisma.request_logs.create({
      data: {
        user_id: user.id,
        request_id: this.request?.id,
        object_export: { id: this.request?.id, name: this.request.name },
        object_id: this.request?.id,
        object_type: "request",
        note: `${user.username} has create new asset ${asset.id}`,
        ref: ref?.id.toString(),
        metatype: "create_asset",
      },
    });
  }
}
