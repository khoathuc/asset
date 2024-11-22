import { uploadFile } from "@/app/base/file";

export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  async read() {
    const phone = this.formData?.get("phone")?.toString();
    const contact = this.formData?.get("contact")?.toString();
    const url = this.formData?.get("url")?.toString();
    const address = this.formData?.get("address")?.toString();
    const email = this.formData?.get("email")?.toString();
    const description = this.formData?.get("description")?.toString();

    const file: File | null = this.formData?.get("image") as unknown as File;
    var image_url;
    if (file) {
      image_url = await uploadFile(file);
    }

    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw Error("Name is required");
    }

    return {
      name,
      phone,
      contact,
      url,
      address,
      email,
      description,
      image_url,
    };
  }
}
