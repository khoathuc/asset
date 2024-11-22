import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import bcrypt from 'bcryptjs';

export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  private async readFile() {
    const avatar: File | null = this.formData?.get("avatar") as unknown as File;
    var avatar_url;
    if (avatar) {
      avatar_url = await uploadFile(avatar);
    }

    return avatar_url;
  }

  private readFirstName() {
    const first_name = this.formData?.get("first_name")?.toString();
    if (!first_name) {
      throw new Error("First name is required");
    }

    return first_name;
  }
  private readLastName() {
    const last_name = this.formData?.get("last_name")?.toString();
    if (!last_name) {
      throw new Error("Last name is required");
    }

    return last_name;
  }
  private async readEmail() {
    const email = this.formData?.get("email")?.toString();
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new Error("Email is existed");
    }

    return email;
  }

  private readUsername() {
    const username = this.formData?.get("username")?.toString();
    if (!username) {
      throw new Error("Username is required");
    }

    return username;
  }

  private readPassword() {
    const password = this.formData?.get("password")?.toString();
    if (!password) {
      throw new Error("Password is required");
    }

    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async read() {
    const description = this.formData?.get("description")?.toString();
    const phone = this.formData?.get("phone")?.toString();
    const job_title = this.formData?.get("job_title")?.toString();
    const address = this.formData?.get("address")?.toString();
    const city = this.formData?.get("city")?.toString();
    const country = this.formData?.get("country")?.toString();
    const state = this.formData?.get("state")?.toString();

    const avatar_url = await this.readFile();
    const first_name = this.readFirstName();
    const last_name = this.readLastName();

    var email = null;
    if (this.formData?.get("email")) {
      email = await this.readEmail();
    }
    const username = this.readUsername();

    var hashedPassword = null;
    if (this.formData?.get("password")) {
      hashedPassword = await this.readPassword();
    }

    return {
      first_name,
      last_name,
      email,
      hashedPassword,
      country,
      avatar_url,
      phone,
      job_title,
      address,
      username,
      description,
      city,
      state,
    };
  }
}
