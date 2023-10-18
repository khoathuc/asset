"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function uploadFile(file: File) {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const file_path = `/upload/${file.name}`;
    const path = join(process.cwd(), file_path);
    await writeFile(path, buffer);

    return file_path;
  } catch (error) {
    console.log(error);
  }
}
