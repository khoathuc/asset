export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;

    return this;
  }
}
