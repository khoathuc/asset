import { Loader } from "./loader";
import { Reader } from "./reader";
import { Stat } from "./stat";

export class Vendor{
    public static loader(){
        return Loader;
    }

    public static reader(formData: FormData){
        return new Reader(formData);
    }


    public static stat(){
        return new Stat();
    }
}