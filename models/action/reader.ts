export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  readChangeFields() {
    const change_fields = this.formData?.get("change_fields")?.toString();
    if (!change_fields) {
      return;
    }

    return JSON.parse(change_fields);
  }

  readConditions() {
    const conditions = this.formData?.get("conditions")?.toString();
    if (!conditions) {
      return;
    }

    return JSON.parse(conditions);
  }

  async read() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    const change_fields = this.readChangeFields();

    const conditions = this.readConditions();

    return { name, change_fields, conditions };
  }
}
