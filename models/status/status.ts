import { Loader } from "./loader";
import { Reader } from "./reader";

export class Status {
  public static loader() {
    return Loader;
  }

  /**
   *
   * @param formData
   * @returns Reader
   */
  public static reader(formData: FormData) {
    return new Reader(formData);
  }
}
