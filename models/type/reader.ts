import { Depreciation } from "../depreciation/depreciation";

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

  private readIsDepreciable() {
    const is_depreciable = this.formData?.get("is_depreciable")?.toString();
    return is_depreciable == "true";
  }

  private readDepreciationMethod(){
    var depreciation_method = this.formData
      ?.get("depreciation_method")
      ?.toString();
    if (!depreciation_method) {
      throw new Error("Empty depreciation method");
    }

    if (
      depreciation_method != Depreciation.REDUCING_BALANCE_METHOD &&
      depreciation_method != Depreciation.STRAIGHT_LINE_METHOD
    ) {
      throw new Error("Invalid depreciation method")
    }

    return depreciation_method;
  }

  private readDefaultUsefulLife(){
    return this.formData?.get("default_useful_life")?.toString();
  }

  private readDepreciationConf() {
    const depreciation_method = this.readDepreciationMethod();

    const default_useful_life = this.readDefaultUsefulLife();

    return {
      depreciation_method,
      default_useful_life
    }
  }

  async read() {
    const name = this.readName();
    const prefix = this.readPrefix();
    const description = this.readDesc();
    const is_depreciable = this.readIsDepreciable();
    var depreciation_conf = null;
    if (is_depreciable) {
      depreciation_conf = this.readDepreciationConf();
    }

    return { name, prefix, description, is_depreciable, depreciation_conf };
  }

  readCForm() {
    const form = this.formData?.get("form")?.toString();
    if (!form) {
      return;
    }
    return JSON.parse(form);
  }
}
