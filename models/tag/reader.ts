export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;

    return this;
  }

  readName() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  }

  private validColor(color: string) {
    // Regular expression to match valid hexadecimal color codes
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    return hexColorRegex.test(color);
  }

  readColor() {
    const color = this.formData?.get("color")?.toString();

    if (!color) {
      throw new Error("Color is required");
    }

    if (!this.validColor(color)) {
      throw new Error("Color is invalid");
    }

    return color;
  }

  readDesc() {
    return this.formData?.get("description")?.toString();
  }

  public async read() {
    const name = this.readName();
    const color = this.readColor();
    const description = this.readDesc();

    return { name, color, description };
  }
}
