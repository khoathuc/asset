import { Loader } from "./loader";
import { Reader } from "./reader";
import { Stat } from "./stat";

export class User {
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


  public static stat(){
    return new Stat();
}
}
