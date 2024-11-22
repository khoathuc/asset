import { uploadFile } from "@/app/base/file";

export class Reader {
  /**
   * @desc read data from form data
   * @param formData FormData
   * @return location 
   */
  public static async read(formData: FormData) {
    const description = formData.get("description")?.toString();
    const address = formData.get("address")?.toString();

    const file: File | null = formData.get("file") as unknown as File;
    var image_url;
    if (file) {
      image_url = await uploadFile(file);
    }

    const name = formData.get("name")?.toString();
    if (!name) {
      throw Error("Name is required");
    }

    return {name, description, address, image: image_url}
  }
}
