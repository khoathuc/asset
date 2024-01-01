export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  readName() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  }

  private getPrefix(name: string) {
    const cleanName = name.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
    const prefix = cleanName.substring(0, 2); // You can change the length as per your requirement
    return prefix;
  }

  readPrefix() {
    var prefix = this.formData?.get("prefix")?.toString();
    if (!prefix) {
      const name = this.readName();
      prefix = this.getPrefix(name);
    }

    return prefix;
  }

  private readDesc() {
    return this.formData?.get("description")?.toString();
  }

  async read() {
    const name = this.readName();
    const prefix = this.readPrefix();
    const description = this.readDesc();

    return { name, prefix, description };
  }

  readCForm() {
    const form = this.formData?.get("form")?.toString();
    if (!form) {
      return;
    }
    return JSON.parse(form);
  }
}
