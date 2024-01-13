import { Loader } from "./loader";
import { Reader } from "./reader";

export class Vendor{
    public static loader(){
        return Loader;
    }

    public static reader(formData: FormData){
        return new Reader(formData);
    }
}