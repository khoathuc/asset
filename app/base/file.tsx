"use server";

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";

export async function uploadFile(file: File) {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const relativeUploadDir = `/uploads/${dateFn.format(
      Date.now(),
      "dd-MM-Y",
    )}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        throw new Error("Error while trying to create directory when uploading a file\n")
      }
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      "",
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

    const path = `${uploadDir}/${filename}`;
    await writeFile(path, buffer);
    return `${relativeUploadDir}/${filename}`;
  } catch (error) {
    console.log(error);
  }
}
